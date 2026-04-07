import React, { useState, useRef, useEffect } from "react";

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
const fmtNum = (n) => Math.round(n || 0).toLocaleString("id-ID");
const pct = (a, t) => (t === 0 ? "0.0" : ((a / t) * 100).toFixed(1));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const todayStr = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
const parseDotNum = (s) => {
  if (typeof s === 'number') return s;
  const cleaned = String(s || "").replace(/\./g, "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
const formatDot = (val) => {
  if (!val && val !== 0) return "";
  const raw = String(val).replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const COLORS = { crypto: "#f59e0b", tunai: "#10b981", bank: "#3b82f6", ewallet: "#ef4444", saham: "#8b5cf6", hutang: "#f43f5e", talangan: "#fb923c" };
const KAT_ICON = { "Makan & Minum": "🍽", Transportasi: "⛽", Perlengkapan: "👕", Sosial: "🤝", Komunikasi: "📶", GoFood: "🍱", GoRide: "🛵", Gaji: "💼", "Lain-lain": "📌", Kesehatan: "💊", Hiburan: "🎮", Tagihan: "🧾", Sedekah: "🕌", Bensin: "⛽" };
const KAT_COLOR = { "Makan & Minum": "#f97316", Transportasi: "#6366f1", Perlengkapan: "#3b82f6", Sosial: "#ec4899", Komunikasi: "#14b8a6", GoFood: "#ef4444", GoRide: "#10b981", Gaji: "#10b981", "Lain-lain": "#94a3b8", Kesehatan: "#f43f5e", Hiburan: "#8b5cf6", Tagihan: "#f59e0b", Sedekah: "#10b981", Bensin: "#6366f1" };

const INIT_ASET = [
  { id: "btc", nama: "Bitcoin (BTC)", kategori: "crypto", nilai: 888838, sub: "0,00076544 BTC · P&L +1,54%", icon: "₿" },
  { id: "kertas", nama: "Uang Kertas", kategori: "tunai", nilai: 694000, sub: "Tunai fisik", icon: "💵" },
  { id: "bca", nama: "BCA Xpresi", kategori: "bank", nilai: 104913, sub: "Rekening bank", icon: "🏦" },
  { id: "bri", nama: "Bank BRI", kategori: "bank", nilai: 64870, sub: "Rekening bank", icon: "🏦" },
  { id: "koin", nama: "Uang Koin", kategori: "tunai", nilai: 24400, sub: "Tunai fisik", icon: "🪙" },
  { id: "gopay", nama: "SG (GoPay)", kategori: "ewallet", nilai: 1700, sub: "E-Wallet", icon: "📱" },
];

const INIT_TRX = [
  { id: "t1", tanggal: "2026-04-03", jam: "14:30", ket: "Belanja Polo, Sarung Tangan, & Buff", kategori: "Perlengkapan", jenis: "keluar", nominal: 100000, metode: "Tunai" },
  { id: "t2", tanggal: "2026-04-03", jam: "16:00", ket: "Bowo / Kondangan", kategori: "Sosial", jenis: "keluar", nominal: 50000, metode: "Tunai" },
  { id: "t4", tanggal: "2026-04-04", jam: "13:45", ket: "Makan Siang (Manis Ae)", kategori: "Makan & Minum", jenis: "keluar", nominal: 240790, metode: "Tunai" },
  { id: "t5", tanggal: "2026-04-05", jam: "14:15", ket: "Makan Siang (Ayam Nelongso)", kategori: "Makan & Minum", jenis: "keluar", nominal: 58000, metode: "Tunai" },
];

const INIT_GOALS = [
  { id: "g1", nama: "Pajak Motor", tipe: "tagihan", target: 200000, terkumpul: 0, deadline: "2026-12-31", rutin: true, frekuensi: "tahunan", catatan: "Bayar STNK tahunan" },
  { id: "g2", nama: "Admin BCA", tipe: "tagihan_rutin", target: 15000, terkumpul: 0, deadline: "", rutin: true, frekuensi: "bulanan", tanggalRutin: 16, rekening: "BCA Xpresi", catatan: "Biaya admin bulanan" },
];

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: "#1a1f2e", borderRadius: 14, padding: "14px 16px", border: "1px solid #252d40", marginBottom: 10, ...style }}>{children}</div>
);

const Pill = ({ label, color = "#64748b" }) => (
  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: color + "22", color, border: `1px solid ${color}44`, whiteSpace: "nowrap" }}>{label}</span>
);

const Btn = ({ children, onClick, color = "#3b82f6", full, small, style = {}, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} style={{ 
    background: color + "1a", 
    color, 
    border: `1px solid ${color}44`, 
    borderRadius: 9, 
    padding: small ? "5px 11px" : "10px 16px", 
    fontSize: small ? 11 : 13, 
    fontWeight: 700, 
    cursor: disabled ? "not-allowed" : "pointer", 
    opacity: disabled ? 0.5 : 1,
    width: full ? "100%" : undefined, 
    ...style 
  }}>{children}</button>
);

const MiniBar = ({ value, max, color }) => (
  <div style={{ flex: 1, height: 5, background: "#252d40", borderRadius: 3, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, max ? (value / max) * 100 : 0)}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s" }} />
  </div>
);

const NumInp = ({ label, value, onChange, placeholder = "0", ...rest }) => {
  const handleChange = (e) => {
    const raw = e.target.value.replace(/\./g, "").replace(/\D/g, "");
    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    onChange(formatted, raw);
  };
  return (
    <div style={{ marginBottom: 9 }}>
      {label && <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3, fontWeight: 600 }}>{label}</div>}
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#64748b" }}>Rp</span>
        <input 
          value={value} 
          onChange={handleChange} 
          placeholder={placeholder} 
          inputMode="numeric"
          style={{ width: "100%", background: "#10131e", border: "1px solid #252d40", borderRadius: 8, padding: "9px 11px 9px 32px", color: "#e2e8f0", fontSize: 14, fontWeight: 600, outline: "none", boxSizing: "border-box", letterSpacing: "0.02em" }} 
          {...rest} 
        />
      </div>
    </div>
  );
};

const Inp = ({ label, ...p }) => (
  <div style={{ marginBottom: 9 }}>
    {label && <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3, fontWeight: 600 }}>{label}</div>}
    <input {...p} style={{ width: "100%", background: "#10131e", border: "1px solid #252d40", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box", ...p.style }} />
  </div>
);

const Sel = ({ label, children, ...p }) => (
  <div style={{ marginBottom: 9 }}>
    {label && <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3, fontWeight: 600 }}>{label}</div>}
    <select {...p} style={{ width: "100%", background: "#10131e", border: "1px solid #252d40", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none" }}>{children}</select>
  </div>
);

// ─── CHARTS ──────────────────────────────────────────────────────────────────
const Donut = ({ data, size = 110 }) => {
  const total = data.reduce((s, d) => s + d.v, 0) || 1;
  let cum = 0;
  const r = 38, cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r + 10} fill="#10131e" />
      {data.map((d, i) => {
        const s = cum;
        const e = (cum += (d.v / total) * 360);
        if (e - s < 0.5) return null;
        const rad = (deg) => ((deg - 90) * Math.PI) / 180;
        const x1 = cx + r * Math.cos(rad(s)), y1 = cy + r * Math.sin(rad(s));
        const x2 = cx + r * Math.cos(rad(e)), y2 = cy + r * Math.sin(rad(e));
        return <path key={i} d={`M${cx},${cy}L${x1},${y1}A${r},${r},0,${e - s > 180 ? 1 : 0},1,${x2},${y2}Z`} fill={d.c} opacity={0.85} />;
      })}
      <circle cx={cx} cy={cy} r={r - 10} fill="#1a1f2e" />
    </svg>
  );
};

const BarChart = ({ data, height = 120, color = "#3b82f6" }) => {
  const max = Math.max(...data.map(d => d.v), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height, padding: "0 2px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", background: color + "cc", borderRadius: "3px 3px 0 0", height: `${(d.v / max) * 100}%`, minHeight: d.v > 0 ? 3 : 0, transition: "height 0.4s" }} />
          </div>
          <span style={{ fontSize: 8, color: "#64748b", textAlign: "center", lineHeight: 1.2 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── FORMS ────────────────────────────────────────────────────────────────────
const GoForm = ({ type, onAdd, onClose }) => {
  const [metode, setMetode] = useState("Gopay");
  const [tagih, setTagih] = useState("");
  const [aktual, setAktual] = useState("");
  const [diambil, setDiambil] = useState(true);
  const [ket, setKet] = useState("");
  const [uangTambahan, setUangTambahan] = useState("");

  const tagihN = parseDotNum(tagih);
  const aktualN = parseDotNum(aktual) || tagihN;
  const tambahanN = parseDotNum(uangTambahan);
  const kembalian = metode === "Tunai" ? aktualN - tagihN : 0;
  const actualBersih = metode === "Gopay"
    ? tagihN + tambahanN
    : diambil ? tagihN + tambahanN : aktualN + tambahanN;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#1a1f2e", borderRadius: "16px 16px 0 0", padding: 20, width: "100%", maxWidth: 430, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" }}>
          <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 16 }}>{type === "GoFood" ? "🍱" : "🛵"} {type}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <Inp label="Keterangan (opsional)" value={ket} onChange={e => setKet(e.target.value)} placeholder={`Contoh: Nasi Goreng Spesial`} />
        <Sel label="Dibayar Pakai" value={metode} onChange={e => setMetode(e.target.value)}>
          <option>Gopay</option><option>Tunai</option>
        </Sel>
        <NumInp label="Total Tagih ke Customer" value={tagih} onChange={(f) => setTagih(f)} />
        {metode === "Tunai" && (
          <>
            <NumInp label="Aktual Dibayar Customer" value={aktual} onChange={f => setAktual(f)} placeholder={tagih || "0"} />
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 600 }}>Kembalian</div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn small color={diambil ? "#ef4444" : "#475569"} onClick={() => setDiambil(true)}>Diambil customer</Btn>
                <Btn small color={!diambil ? "#10b981" : "#475569"} onClick={() => setDiambil(false)}>Jadi tips ✓</Btn>
              </div>
            </div>
          </>
        )}
        <NumInp label="💰 Uang Tambahan / Tip Ekstra (opsional)" value={uangTambahan} onChange={f => setUangTambahan(f)} placeholder="0" />
        <Btn full color="#10b981" onClick={() => {
          if (!tagihN) return;
          onAdd({ 
            id: uid(), 
            tanggal: todayStr(), 
            jam: nowTime(), 
            jenis: "masuk", 
            kategori: type, 
            sumber: "Gojek", 
            ket: ket || `${type} – ${metode}`, 
            nominal: actualBersih, 
            metode, 
            meta: { tagih: tagihN, aktual: aktualN, kembalian, diambil, gopayPotong: metode === "Tunai" ? tagihN : 0, tambahan: tambahanN } 
          });
          onClose();
        }}>✓ Simpan Pendapatan {type}</Btn>
      </div>
    </div>
  );
};

const TrxForm = ({ onAdd, onClose, edit }) => {
  const [jenis, setJenis] = useState(edit?.jenis || "keluar");
  const [ket, setKet] = useState(edit?.ket || "");
  const [nominal, setNominal] = useState(edit ? formatDot(edit.nominal) : "");
  const [metode, setMetode] = useState(edit?.metode || "Tunai");
  const [kat, setKat] = useState(edit?.kategori || "Makan & Minum");
  const [jam, setJam] = useState(edit?.jam || nowTime());
  const [tgl, setTgl] = useState(edit?.tanggal || todayStr());
  const cats = { 
    keluar: ["Makan & Minum", "Transportasi", "Perlengkapan", "Sosial", "Komunikasi", "Kesehatan", "Hiburan", "Tagihan", "Sedekah", "Lain-lain"], 
    masuk: ["Gaji", "Transfer Masuk", "Penjualan", "GoFood", "GoRide", "Lain-lain"], 
    mutasi: ["Tarik Tunai", "Top-up GoPay", "Transfer Antar Rekening", "Lain-lain"] 
  };
  const jColor = { masuk: "#10b981", keluar: "#ef4444", mutasi: "#8b5cf6" };
  
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#1a1f2e", borderRadius: "16px 16px 0 0", padding: 20, width: "100%", maxWidth: 430, maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" }}>
          <h3 style={{ color: "#e2e8f0", margin: 0 }}>{edit ? "✏️ Edit" : "➕ Transaksi Baru"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["keluar", "masuk", "mutasi"].map(j => (
            <Btn key={j} small color={jenis === j ? jColor[j] : "#475569"} style={{ flex: 1, textAlign: "center" }} onClick={() => { setJenis(j); setKat(cats[j][0]); }}>
              {j === "masuk" ? "⬇ Masuk" : j === "keluar" ? "⬆ Keluar" : "↔ Mutasi"}
            </Btn>
          ))}
        </div>
        <NumInp label="Nominal" value={nominal} onChange={(f) => setNominal(f)} />
        <Inp label="Keterangan" value={ket} onChange={e => setKet(e.target.value)} placeholder="Contoh: Makan siang warteg" />
        <Sel label="Kategori" value={kat} onChange={e => setKat(e.target.value)}>
          {cats[jenis].map(c => <option key={c}>{c}</option>)}
        </Sel>
        <Sel label="Metode" value={metode} onChange={e => setMetode(e.target.value)}>
          {["Tunai", "BCA Xpresi", "Bank BRI", "GoPay", "Transfer"].map(m => <option key={m}>{m}</option>)}
        </Sel>
        <Btn full color={jColor[jenis]} onClick={() => { 
          if (!ket.trim() || !parseDotNum(nominal)) return; 
          onAdd({ id: edit?.id || uid(), tanggal: tgl, jam, jenis, ket, nominal: parseDotNum(nominal), metode, kategori: kat }); 
          onClose(); 
        }}>✓ Simpan</Btn>
      </div>
    </div>
  );
};

const AsetForm = ({ onSave, onClose, edit }) => {
  const [nama, setNama] = useState(edit?.nama || "");
  const [kategori, setKategori] = useState(edit?.kategori || "bank");
  const [nilai, setNilai] = useState(edit ? formatDot(edit.nilai) : "");
  const [sub, setSub] = useState(edit?.sub || "");
  const [icon, setIcon] = useState(edit?.icon || "🏦");
  const iconMap = { bank: "🏦", tunai: "💵", ewallet: "📱", crypto: "₿", saham: "📈", hutang: "🔴", talangan: "🟠" };
  
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#1a1f2e", borderRadius: "16px 16px 0 0", padding: 20, width: "100%", maxWidth: 430, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ color: "#e2e8f0", margin: 0 }}>{edit ? "✏️ Edit Aset" : "➕ Tambah Aset"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <Sel label="Kategori Aset" value={kategori} onChange={e => { setKategori(e.target.value); setIcon(iconMap[e.target.value] || "💰"); }}>
          <option value="bank">🏦 Rekening Bank</option>
          <option value="tunai">💵 Uang Tunai</option>
          <option value="ewallet">📱 E-Wallet</option>
          <option value="crypto">₿ Cryptocurrency</option>
          <option value="saham">📈 Saham / Investasi</option>
          <option value="hutang">🔴 Hutang / Pinjaman</option>
          <option value="talangan">🟠 Dana Talangan</option>
        </Sel>
        <Inp label="Nama Aset" value={nama} onChange={e => setNama(e.target.value)} placeholder="Contoh: BNI, Saham BBCA, Pinjol X" />
        <NumInp label={kategori === "hutang" ? "Jumlah Hutang (Rp)" : "Saldo / Nilai (Rp)"} value={nilai} onChange={f => setNilai(f)} />
        <Inp label="Keterangan" value={sub} onChange={e => setSub(e.target.value)} placeholder="Contoh: No. rek 123456" />
        <Btn full color="#3b82f6" onClick={() => {
          if (!nama.trim()) return;
          onSave({ id: edit?.id || uid(), nama, kategori, nilai: parseDotNum(nilai), sub, icon });
          onClose();
        }}>✓ Simpan Aset</Btn>
      </div>
    </div>
  );
};

// ─── AI ASSISTANT (LOCAL LOGIC) ───────────────────────────────────────────────
const AIChat = ({ aset, trx, goals, onClose }) => {
  const [msgs, setMsgs] = useState([{ r: "a", t: "Halo Toni! 💼 Saya asisten keuangan Anda. Saya sudah menganalisis data aset dan pengeluaranmu. Mau tanya apa?" }]);
  const [inp, setInp] = useState("");
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  const totalAset = aset.reduce((s, a) => s + (a.kategori === 'hutang' ? -a.nilai : a.nilai), 0);
  const totalKeluar = trx.filter(t => t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0);
  const totalMasuk = trx.filter(t => t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0);

  const getResponse = (q) => {
    const lowQ = q.toLowerCase();
    if (lowQ.includes("aset")) return `Total aset bersihmu saat ini ${fmt(totalAset)}. Terbesar ada di ${aset[0]?.nama || 'tidak ada aset'}.`;
    if (lowQ.includes("boros") || lowQ.includes("hemat")) return `Pengeluaran bulan ini sudah mencapai ${fmt(totalKeluar)}. Sebaiknya kurangi kategori Makan & Minum jika ingin menabung lebih banyak.`;
    if (lowQ.includes("goal") || lowQ.includes("target")) return `Untuk goal ${goals[0]?.nama || 'terdekat'}, kamu butuh ${fmt(goals[0]?.target || 0)}. Dengan rata-rata pemasukanmu ${fmt(totalMasuk)}, kamu butuh sekitar 2-3 bulan lagi.`;
    if (lowQ.includes("saldo") || lowQ.includes("total")) return `Total aset bersih: ${fmt(totalAset)}. Total pemasukan: ${fmt(totalMasuk)}. Total pengeluaran: ${fmt(totalKeluar)}.`;
    return "Saya mengerti. Ada hal spesifik dari transaksi atau asetmu yang ingin dibahas? Coba tanya tentang aset, saldo, boros, atau goal.";
  };

  const send = () => {
    if (!inp.trim()) return;
    const q = inp;
    setMsgs(m => [...m, { r: "u", t: q }]);
    setInp("");
    setTimeout(() => {
      setMsgs(m => [...m, { r: "a", t: getResponse(q) }]);
    }, 600);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#10131e", zIndex: 300, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1a1f2e", borderBottom: "1px solid #252d40", padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 15 }}>🤖 AI Finance Assistant</div></div>
        <Btn small color="#64748b" onClick={onClose}>✕</Btn>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 13px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 13px", borderRadius: 12, background: m.r === "u" ? "#3b82f6" : "#1e2a3a", color: "#e2e8f0", fontSize: 13, lineHeight: 1.6 }}>{m.t}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "10px", background: "#1a1f2e", borderTop: "1px solid #252d40", display: "flex", gap: 8 }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Tanya sesuatu..." style={{ flex: 1, background: "#10131e", border: "1px solid #252d40", borderRadius: 10, padding: "10px", color: "#e2e8f0", outline: "none" }} />
        <Btn color="#3b82f6" onClick={send}>Kirim</Btn>
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [aset, setAset] = useState(INIT_ASET);
  const [trx, setTrx] = useState(INIT_TRX);
  const [goals] = useState(INIT_GOALS);
  const [modal, setModal] = useState(null);
  const [editTrx, setEditTrx] = useState(null);

  const totalAset = aset.filter(a => a.kategori !== "hutang").reduce((s, a) => s + a.nilai, 0);
  const totalMasuk = trx.filter(t => t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0);
  const totalKeluar = trx.filter(t => t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0);
  const totalGojek = trx.filter(t => t.sumber === "Gojek").reduce((s, t) => s + t.nominal, 0);

  const addTrx = (d) => setTrx(prev => [d, ...prev]);

  return (
    <div style={{ minHeight: "100vh", background: "#10131e", color: "#e2e8f0", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      
      {/* Header */}
      <div style={{ background: "#1a1f2e", padding: "20px 16px", borderBottom: "1px solid #252d40" }}>
        <div style={{ fontSize: 11, color: "#64748b" }}>SALDO BERSIH</div>
        <div style={{ fontSize: 26, fontWeight: 900 }}>{fmt(totalAset)}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Btn small color="#8b5cf6" onClick={() => setModal("ai")}>🤖 AI</Btn>
          <Btn small color="#10b981" onClick={() => setModal("trx")}>+ Catat</Btn>
        </div>
      </div>

      <div style={{ padding: "16px", paddingBottom: 80 }}>
        {tab === "home" && (
          <>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>CEK PENDAPATAN GOJEK</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Btn color="#ef4444" onClick={() => setModal("gofood")}>🍱 GoFood</Btn>
                <Btn color="#10b981" onClick={() => setModal("goride")}>🛵 GoRide</Btn>
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 15 }}>
               <div style={{ background: "#10b98122", padding: 12, borderRadius: 12, border: "1px solid #10b98144" }}>
                  <div style={{ fontSize: 10, color: "#10b981" }}>MASUK</div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{fmt(totalMasuk)}</div>
               </div>
               <div style={{ background: "#ef444422", padding: 12, borderRadius: 12, border: "1px solid #ef444444" }}>
                  <div style={{ fontSize: 10, color: "#ef4444" }}>KELUAR</div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{fmt(totalKeluar)}</div>
               </div>
            </div>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>ASET TERKINI</span>
                <span style={{ fontSize: 12, color: "#3b82f6" }}>Detail</span>
              </div>
              {aset.slice(0, 3).map(a => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "#94a3b8" }}>{a.nama}</span>
                  <span style={{ fontWeight: 700 }}>{fmt(a.nilai)}</span>
                </div>
              ))}
            </Card>

            <h4 style={{ fontSize: 12, color: "#64748b", marginLeft: 4, marginBottom: 8 }}>TRANSAKSI TERBARU</h4>
            {trx.slice(0, 5).map(t => (
              <Card key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.ket}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{t.kategori} · {t.metode}</div>
                </div>
                <div style={{ fontWeight: 800, color: t.jenis === "masuk" ? "#10b981" : "#ef4444" }}>
                  {t.jenis === "masuk" ? "+" : "-"}{fmtNum(t.nominal)}
                </div>
              </Card>
            ))}
          </>
        )}

        {tab === "trx" && (
          <>
            <h4 style={{ fontSize: 12, color: "#64748b", marginLeft: 4, marginBottom: 8 }}>SEMUA TRANSAKSI</h4>
            <Btn full style={{ marginBottom: 15 }} onClick={() => setModal("trx")}>+ Tambah Transaksi</Btn>
            {trx.map(t => (
              <Card key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.ket}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{t.tanggal} · {t.kategori} · {t.metode}</div>
                </div>
                <div style={{ fontWeight: 800, color: t.jenis === "masuk" ? "#10b981" : "#ef4444" }}>
                  {t.jenis === "masuk" ? "+" : "-"}{fmtNum(t.nominal)}
                </div>
              </Card>
            ))}
          </>
        )}

        {tab === "aset" && (
           <>
            <Btn full style={{ marginBottom: 15 }} onClick={() => setModal("editAset")}>+ Tambah Aset</Btn>
            {aset.map(a => (
              <Card key={a.id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700 }}>{a.icon} {a.nama}</span>
                  <span style={{ fontWeight: 900, color: a.kategori === "hutang" ? "#ef4444" : "#3b82f6" }}>{fmt(a.nilai)}</span>
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{a.sub}</div>
              </Card>
            ))}
           </>
        )}

        {tab === "goals" && (
          <>
            <h4 style={{ fontSize: 12, color: "#64748b", marginLeft: 4, marginBottom: 8 }}>GOAL & TAGIHAN</h4>
            {goals.map(g => (
              <Card key={g.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700 }}>{g.nama}</span>
                  <span style={{ fontWeight: 800 }}>{fmt(g.terkumpul)} / {fmt(g.target)}</span>
                </div>
                <MiniBar value={g.terkumpul} max={g.target} color="#f59e0b" />
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>{g.catatan}</div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Nav */}
      <div style={{ position: "fixed", bottom: 0, width: "100%", maxWidth: 430, background: "#1a1f2e", display: "flex", borderTop: "1px solid #252d40", padding: "10px 0" }}>
        {[["home","🏠"],["trx","📋"],["aset","💰"],["goals","🎯"]].map(([id, icon]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", color: tab === id ? "#3b82f6" : "#64748b", fontSize: 20, padding: "8px", cursor: "pointer" }}>{icon}</button>
        ))}
      </div>

      {/* Modals */}
      {modal === "trx" && <TrxForm onAdd={addTrx} onClose={() => setModal(null)} edit={editTrx} />}
      {modal === "gofood" && <GoForm type="GoFood" onAdd={addTrx} onClose={() => setModal(null)} />}
      {modal === "goride" && <GoForm type="GoRide" onAdd={addTrx} onClose={() => setModal(null)} />}
      {modal === "editAset" && <AsetForm onSave={(a) => setAset(p => [...p, a])} onClose={() => setModal(null)} />}
      {modal === "ai" && <AIChat aset={aset} trx={trx} goals={goals} onClose={() => setModal(null)} />}
    </div>
  );
    }
