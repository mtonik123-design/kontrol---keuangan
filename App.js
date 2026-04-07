// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
const fmtNum = (n) => Math.round(n || 0).toLocaleString("id-ID");
const pct = (a, t) => (t === 0 ? "0.0" : ((a / t) * 100).toFixed(1));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const todayStr = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
const parseDotNum = (s) => parseFloat((s || "").replace(/\./g, "").replace(",", ".")) || 0;
const formatDot = (val) => {
  const raw = String(val || "").replace(/\D/g, "");
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

const uid2 = uid;
const INIT_TRX = [
  { id: uid2(), tanggal: "2026-04-03", jam: "14:30", ket: "Belanja Polo, Sarung Tangan, & Buff", kategori: "Perlengkapan", jenis: "keluar", nominal: 100000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-03", jam: "16:00", ket: "Bowo / Kondangan", kategori: "Sosial", jenis: "keluar", nominal: 50000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-03", jam: "19:15", ket: "Pinjaman Kakak", kategori: "Lain-lain", jenis: "keluar", nominal: 41000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-03", jam: "21:55", ket: "Paket Data Internet", kategori: "Komunikasi", jenis: "keluar", nominal: 25000, metode: "BCA Xpresi" },
  { id: uid2(), tanggal: "2026-04-04", jam: "13:45", ket: "Makan Siang (Manis Ae)", kategori: "Makan & Minum", jenis: "keluar", nominal: 240790, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-04", jam: "17:15", ket: "Bensin (Full Tank)", kategori: "Transportasi", jenis: "keluar", nominal: 89000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-04", jam: "17:25", ket: "Sedekah", kategori: "Sosial", jenis: "keluar", nominal: 2000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-04", jam: "17:30", ket: "Minum (Aqua)", kategori: "Makan & Minum", jenis: "keluar", nominal: 8000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-04", jam: "17:45", ket: "Jajan (Seblak)", kategori: "Makan & Minum", jenis: "keluar", nominal: 45000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-05", jam: "14:15", ket: "Makan Siang (Ayam Nelongso)", kategori: "Makan & Minum", jenis: "keluar", nominal: 58000, metode: "Tunai" },
  { id: uid2(), tanggal: "2026-04-05", jam: "15:30", ket: "Parkir Nelongso", kategori: "Transportasi", jenis: "keluar", nominal: 5000, metode: "Tunai" },
];

const INIT_GOALS = [
  { id: uid2(), nama: "Pajak Motor", tipe: "tagihan", target: 200000, terkumpul: 0, deadline: "2026-12-31", rutin: true, frekuensi: "tahunan", catatan: "Bayar STNK tahunan" },
  { id: uid2(), nama: "Admin BCA", tipe: "tagihan_rutin", target: 15000, terkumpul: 0, deadline: "", rutin: true, frekuensi: "bulanan", tanggalRutin: 16, rekening: "BCA Xpresi", catatan: "Biaya admin bulanan" },
];

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: "#1a1f2e", borderRadius: 14, padding: "14px 16px", border: "1px solid #252d40", marginBottom: 10, ...style }}>{children}</div>
);
const Pill = ({ label, color = "#64748b" }) => (
  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: color + "22", color, border: `1px solid ${color}44`, whiteSpace: "nowrap" }}>{label}</span>
);
const Btn = ({ children, onClick, color = "#3b82f6", full, small, style = {} }) => (
  <button onClick={onClick} style={{ background: color + "1a", color, border: `1px solid ${color}44`, borderRadius: 9, padding: small ? "5px 11px" : "10px 16px", fontSize: small ? 11 : 13, fontWeight: 700, cursor: "pointer", width: full ? "100%" : undefined, ...style }}>{children}</button>
);
const MiniBar = ({ value, max, color }) => (
  <div style={{ flex: 1, height: 5, background: "#252d40", borderRadius: 3, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, max ? (value / max) * 100 : 0)}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s" }} />
  </div>
);

// Numeric input with dot separators
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
        <input value={value} onChange={handleChange} placeholder={placeholder} inputMode="numeric"
          style={{ width: "100%", background: "#10131e", border: "1px solid #252d40", borderRadius: 8, padding: "9px 11px 9px 32px", color: "#e2e8f0", fontSize: 14, fontWeight: 600, outline: "none", boxSizing: "border-box", letterSpacing: "0.02em" }} {...rest} />
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

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
const Donut = ({ data, size = 110 }) => {
  const total = data.reduce((s, d) => s + d.v, 0) || 1;
  let cum = 0;
  const r = 38, cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r + 10} fill="#10131e" />
      {data.map((d, i) => {
        const s = cum, e = (cum += (d.v / total) * 360);
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

// ─── SIMPLE BAR CHART ─────────────────────────────────────────────────────────
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

// ─── GOFOOD / GORIDE FORM ─────────────────────────────────────────────────────
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
    <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
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
        {metode === "Tunai" && <>
          <NumInp label="Aktual Dibayar Customer" value={aktual} onChange={f => setAktual(f)} placeholder={tagih || "0"} />
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 600 }}>Kembalian</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn small color={diambil ? "#ef4444" : "#475569"} onClick={() => setDiambil(true)}>Diambil customer</Btn>
              <Btn small color={!diambil ? "#10b981" : "#475569"} onClick={() => setDiambil(false)}>Jadi tips ✓</Btn>
            </div>
          </div>
        </>}
        <NumInp label="💰 Uang Tambahan / Tip Ekstra (opsional)" value={uangTambahan} onChange={f => setUangTambahan(f)} placeholder="0" />

        {tagihN > 0 && (
          <div style={{ background: "#10131e", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12, lineHeight: 1.9 }}>
            <div style={{ fontWeight: 700, color: "#64748b", marginBottom: 4 }}>📊 Ringkasan {type}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Total Tagih</span><span style={{ fontWeight: 600 }}>Rp {fmtNum(tagihN)}</span></div>
            {metode === "Tunai" && <>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Aktual Dibayar</span><span>Rp {fmtNum(aktualN)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Kembalian</span><span style={{ color: "#f59e0b" }}>Rp {fmtNum(kembalian)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>GoPay terpotong</span><span style={{ color: "#ef4444" }}>−Rp {fmtNum(tagihN)}</span></div>
            </>}
            {tambahanN > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Uang Tambahan</span><span style={{ color: "#10b981" }}>+Rp {fmtNum(tambahanN)}</span></div>}
            <div style={{ borderTop: "1px solid #252d40", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
              <span style={{ color: "#10b981" }}>Pendapatan Bersih</span><span style={{ color: "#10b981", fontSize: 14 }}>Rp {fmtNum(actualBersih)}</span>
            </div>
          </div>
        )}
        <Btn full color="#10b981" onClick={() => {
          if (!tagihN) return;
          onAdd({ id: uid(), tanggal: todayStr(), jam: nowTime(), jenis: "masuk", kategori: type, sumber: "Gojek", ket: ket || `${type} – ${metode}`, nominal: actualBersih, metode, meta: { tagih: tagihN, aktual: aktualN, kembalian, diambil, gopayPotong: metode === "Tunai" ? tagihN : 0, tambahan: tambahanN } });
          onClose();
        }}>✓ Simpan Pendapatan {type}</Btn>
      </div>
    </div>
  );
};

// ─── TRX FORM ────────────────────────────────────────────────────────────────
const TrxForm = ({ onAdd, onClose, edit }) => {
  const [jenis, setJenis] = useState(edit?.jenis || "keluar");
  const [ket, setKet] = useState(edit?.ket || "");
  const [nominal, setNominal] = useState(edit ? formatDot(edit.nominal) : "");
  const [metode, setMetode] = useState(edit?.metode || "Tunai");
  const [kat, setKat] = useState(edit?.kategori || "Makan & Minum");
  const [jam, setJam] = useState(edit?.jam || nowTime());
  const [tgl, setTgl] = useState(edit?.tanggal || todayStr());
  const cats = { keluar: ["Makan & Minum", "Transportasi", "Perlengkapan", "Sosial", "Komunikasi", "Kesehatan", "Hiburan", "Tagihan", "Sedekah", "Lain-lain"], masuk: ["Gaji", "Transfer Masuk", "Penjualan", "GoFood", "GoRide", "Lain-lain"], mutasi: ["Tarik Tunai", "Top-up GoPay", "Transfer Antar Rekening", "Lain-lain"] };
  const jColor = { masuk: "#10b981", keluar: "#ef4444", mutasi: "#8b5cf6" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#1a1f2e", borderRadius: "16px 16px 0 0", padding: 20, width: "100%", maxWidth: 430, maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" }}>
          <h3 style={{ color: "#e2e8f0", margin: 0 }}>{edit ? "✏️ Edit" : "➕ Transaksi Baru"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["keluar", "masuk", "mutasi"].map(j => <Btn key={j} small color={jenis === j ? jColor[j] : "#475569"} style={{ flex: 1, textAlign: "center" }} onClick={() => { setJenis(j); setKat(cats[j][0]); }}>{j === "masuk" ? "⬇ Masuk" : j === "keluar" ? "⬆ Keluar" : "↔ Mutasi"}</Btn>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Inp label="Tanggal" type="date" value={tgl} onChange={e => setTgl(e.target.value)} />
          <Inp label="Jam" value={jam} onChange={e => setJam(e.target.value)} placeholder="HH:MM" />
        </div>
        <Inp label="Keterangan" value={ket} onChange={e => setKet(e.target.value)} placeholder="Contoh: Makan siang warteg" />
        <NumInp label="Nominal" value={nominal} onChange={(f) => setNominal(f)} />
        <Sel label="Kategori" value={kat} onChange={e => setKat(e.target.value)}>{cats[jenis].map(c => <option key={c}>{c}</option>)}</Sel>
        <Sel label="Metode" value={metode} onChange={e => setMetode(e.target.value)}>
          {["Tunai", "BCA Xpresi", "Bank BRI", "GoPay", "Transfer"].map(m => <option key={m}>{m}</option>)}
        </Sel>
        <Btn full color={jColor[jenis]} onClick={() => { if (!ket.trim() || !parseDotNum(nominal)) return; onAdd({ id: edit?.id || uid(), tanggal: tgl, jam, jenis, ket, nominal: parseDotNum(nominal), metode, kategori: kat }); onClose(); }}>✓ Simpan</Btn>
      </div>
    </div>
  );
};

// ─── GOAL FORM ───────────────────────────────────────────────────────────────
const GoalForm = ({ onAdd, onClose, edit }) => {
  const [nama, setNama] = useState(edit?.nama || "");
  const [tipe, setTipe] = useState(edit?.tipe || "tabungan");
  const [target, setTarget] = useState(edit ? formatDot(edit.target) : "");
  const [terkumpul, setTerkumpul] = useState(edit ? formatDot(edit.terkumpul) : "");
  const [deadline, setDeadline] = useState(edit?.deadline || "");
  const [frekuensi, setFrekuensi] = useState(edit?.frekuensi || "bulanan");
  const [tanggalRutin, setTanggalRutin] = useState(edit?.tanggalRutin?.toString() || "");
  const [rekening, setRekening] = useState(edit?.rekening || "");
  const [catatan, setCatatan] = useState(edit?.catatan || "");
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#1a1f2e", borderRadius: "16px 16px 0 0", padding: 20, width: "100%", maxWidth: 430, maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ color: "#e2e8f0", margin: 0 }}>{edit ? "✏️ Edit" : "➕"} Goals / Tagihan</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <Sel label="Tipe" value={tipe} onChange={e => setTipe(e.target.value)}>
          <option value="tabungan">🎯 Target Tabungan</option>
          <option value="tagihan">🧾 Tagihan (bayar sekali/tahunan)</option>
          <option value="tagihan_rutin">🔁 Tagihan Rutin Bulanan</option>
          <option value="cicilan">💳 Cicilan</option>
        </Sel>
        <Inp label="Nama" value={nama} onChange={e => setNama(e.target.value)} placeholder="Contoh: Beli Laptop, Pajak Motor" />
        <NumInp label="Nominal Target (Rp)" value={target} onChange={f => setTarget(f)} />
        <NumInp label="Sudah Terkumpul (Rp)" value={terkumpul} onChange={f => setTerkumpul(f)} />
        {tipe === "tagihan_rutin" && <>
          <Inp label="Tanggal Jatuh Tempo Setiap Bulan" type="number" value={tanggalRutin} onChange={e => setTanggalRutin(e.target.value)} placeholder="Contoh: 16" style={{ maxWidth: 100 }} />
          <Inp label="Rekening yang Terpotong" value={rekening} onChange={e => setRekening(e.target.value)} placeholder="Contoh: BCA Xpresi" />
        </>}
        {(tipe === "tabungan" || tipe === "tagihan" || tipe === "cicilan") && <>
          <Inp label="Deadline / Target Tanggal" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
          <Sel label="Frekuensi Sisih" value={frekuensi} onChange={e => setFrekuensi(e.target.value)}>
            <option value="harian">Harian</option><option value="mingguan">Mingguan</option><option value="bulanan">Bulanan</option><option value="tahunan">Tahunan</option>
          </Sel>
        </>}
        <Inp label="Catatan (opsional)" value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Info tambahan..." />
        <Btn full color="#8b5cf6" onClick={() => {
          if (!nama.trim() || !parseDotNum(target)) return;
          onAdd({ id: edit?.id || uid(), nama, tipe, target: parseDotNum(target), terkumpul: parseDotNum(terkumpul), deadline, frekuensi, tanggalRutin: parseInt(tanggalRutin) || 0, rekening, catatan });
          onClose();
        }}>✓ Simpan Goal</Btn>
      </div>
    </div>
  );
};

// ─── ASET FORM ───────────────────────────────────────────────────────────────
const AsetForm = ({ onSave, onClose, edit }) => {
  const [nama, setNama] = useState(edit?.nama || "");
  const [kategori, setKategori] = useState(edit?.kategori || "bank");
  const [nilai, setNilai] = useState(edit ? formatDot(edit.nilai) : "");
  const [sub, setSub] = useState(edit?.sub || "");
  const [icon, setIcon] = useState(edit?.icon || "🏦");
  const iconMap = { bank: "🏦", tunai: "💵", ewallet: "📱", crypto: "₿", saham: "📈", hutang: "🔴", talangan: "🟠" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
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
        <Inp label="Keterangan" value={sub} onChange={e => setSub(e.target.value)} placeholder="Contoh: No. rek 123456, saham 100 lot" />
        <Inp label="Icon (emoji)" value={icon} onChange={e => setIcon(e.target.value)} style={{ width: 80, fontSize: 22, textAlign: "center" }} />
        <Btn full color="#3b82f6" onClick={() => {
          if (!nama.trim()) return;
          onSave({ id: edit?.id || uid(), nama, kategori, nilai: parseDotNum(nilai), sub, icon });
          onClose();
        }}>✓ Simpan Aset</Btn>
      </div>
    </div>
  );
};

// ─── AI CHAT ─────────────────────────────────────────────────────────────────
const AIChat = ({ aset, trx, goals, onClose }) => {
  const [msgs, setMsgs] = useState([{ r: "a", t: "Halo Toni! 💼 Saya asisten keuangan pribadimu.\n\nTanya apa saja — analisis pengeluaran, kapan bisa beli laptop, saran hemat, atau kondisi aset." }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);
  const totalAset = aset.reduce((s, a) => s + a.nilai, 0);
  const totalKeluar = trx.filter(t => t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0);
  const totalMasuk = trx.filter(t => t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0);
  const hariData = trx.reduce((acc, t) => { if (!acc[t.tanggal]) acc[t.tanggal] = { masuk: 0, keluar: 0 }; acc[t.tanggal][t.jenis] = (acc[t.tanggal][t.jenis] || 0) + t.nominal; return acc; }, {});
  const hariCount = Object.keys(hariData).length || 1;
  const rataKeluar = totalKeluar / hariCount;
  const rataMasuk = totalMasuk / hariCount;
  const send = async () => {
    if (!inp.trim() || loading) return;
    const q = inp.trim(); setInp(""); setLoading(true);
    setMsgs(m => [...m, { r: "u", t: q }]);
    const sys = `Kamu adalah konsultan keuangan pribadi profesional untuk Toni. Jawab singkat, padat, praktis dalam Bahasa Indonesia. Gunakan emoji. Data lengkap:\n- Total Aset: ${fmt(totalAset)}\n- Aset: ${aset.map(a => `${a.nama}: ${fmt(a.nilai)}`).join(", ")}\n- Total Keluar April: ${fmt(totalKeluar)}\n- Total Masuk: ${fmt(totalMasuk)}\n- Rata pengeluaran/hari: ${fmt(rataKeluar)}\n- Rata pemasukan/hari: ${fmt(rataMasuk)}\n- Jumlah hari data: ${hariCount}\n- Goals: ${goals.map(g => `${g.nama} target ${fmt(g.target)} terkumpul ${fmt(g.terkumpul)} deadline ${g.deadline}`).join("; ")}\nJika ditanya kapan bisa beli sesuatu, hitung berdasarkan selisih masuk-keluar harian dan sisa yang dibutuhkan.`;
    try {
      const histMsgs = msgs.slice(-8).map(m => ({ role: m.r === "u" ? "user" : "assistant", content: m.t }));
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: [...histMsgs, { role: "user", content: q }] }) });
      const data = await res.json();
      setMsgs(m => [...m, { r: "a", t: data.content?.map(c => c.text || "").join("") || "Maaf, coba lagi." }]);
    } catch { setMsgs(m => [...m, { r: "a", t: "Koneksi bermasalah. Coba lagi." }]); }
    setLoading(false);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#10131e", zIndex: 300, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1a1f2e", borderBottom: "1px solid #252d40", padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 15 }}>🤖 AI Asisten Keuangan</div><div style={{ color: "#64748b", fontSize: 11 }}>Powered by Claude AI</div></div>
        <Btn small color="#64748b" onClick={onClose}>✕ Tutup</Btn>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 13px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 13px", borderRadius: m.r === "u" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.r === "u" ? "#2563eb" : "#1e2a3a", color: "#e2e8f0", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{m.t}</div>
          </div>
        ))}
        {loading && <div style={{ display: "flex" }}><div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#1e2a3a", color: "#64748b", fontSize: 13 }}>⏳ Menganalisis...</div></div>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "10px 12px", background: "#1a1f2e", borderTop: "1px solid #252d40", display: "flex", gap: 8 }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Tanya keuanganmu..." style={{ flex: 1, background: "#10131e", border: "1px solid #252d40", borderRadius: 10, padding: "10px 13px", color: "#e2e8f0", fontSize: 13, outline: "none" }} />
        <Btn color="#3b82f6" onClick={send} style={{ padding: "10px 16px" }}>Kirim</Btn>
      </div>
    </div>
  );
};

// ─── REKAP HARIAN ────────────────────────────────────────────────────────────
const RekapHarian = ({ trx, onClose }) => {
  const grouped = {};
  trx.forEach(t => { if (!grouped[t.tanggal]) grouped[t.tanggal] = []; grouped[t.tanggal].push(t); });
  const days = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const jColor = { masuk: "#10b981", keluar: "#ef4444", mutasi: "#8b5cf6" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#10131e", zIndex: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1a1f2e", borderBottom: "1px solid #252d40", padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 15 }}>📅 Rekap Harian</div>
        <Btn small color="#64748b" onClick={onClose}>✕ Tutup</Btn>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 13px" }}>
        {days.map(tgl => {
          const list = grouped[tgl];
          const masuk = list.filter(t => t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0);
          const keluar = list.filter(t => t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0);
          const net = masuk - keluar;
          const d = new Date(tgl + "T00:00:00");
          const tglLabel = d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
          return (
            <Card key={tgl} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 800, color: "#e2e8f0", marginBottom: 4, fontSize: 13 }}>{tglLabel}</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <div style={{ flex: 1, background: "#10b98118", border: "1px solid #10b98130", borderRadius: 8, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: "#10b981" }}>MASUK</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#10b981" }}>{fmt(masuk)}</div>
                </div>
                <div style={{ flex: 1, background: "#ef444418", border: "1px solid #ef444430", borderRadius: 8, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: "#ef4444" }}>KELUAR</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#ef4444" }}>{fmt(keluar)}</div>
                </div>
                <div style={{ flex: 1, background: (net >= 0 ? "#10b981" : "#ef4444") + "18", border: `1px solid ${net >= 0 ? "#10b981" : "#ef4444"}30`, borderRadius: 8, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: net >= 0 ? "#10b981" : "#ef4444" }}>NET</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: net >= 0 ? "#10b981" : "#ef4444" }}>{net >= 0 ? "+" : ""}{fmt(net)}</div>
                </div>
              </div>
              {list.sort((a, b) => a.jam.localeCompare(b.jam)).map(t => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #252d40" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#e2e8f0" }}>{t.ket}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{t.jam} · {t.metode} · {t.kategori}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: jColor[t.jenis] }}>
                    {t.jenis === "masuk" ? "+" : t.jenis === "keluar" ? "−" : "↔"}{fmt(t.nominal)}
                  </div>
                </div>
              ))}
            </Card>
          );
        })}
        {days.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>Belum ada data transaksi</div>}
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [aset, setAset] = useState(INIT_ASET);
  const [trx, setTrx] = useState(INIT_TRX);
  const [goals, setGoals] = useState(INIT_GOALS);
  const [modal, setModal] = useState(null);
  const [editTrx, setEditTrx] = useState(null);
  const [editAsetItem, setEditAsetItem] = useState(null);
  const [editGoalItem, setEditGoalItem] = useState(null);
  const [filterJ, setFilterJ] = useState("semua");
  const [filterSumber, setFilterSumber] = useState("semua");

  const totalAset = aset.filter(a => a.kategori !== "hutang").reduce((s, a) => s + a.nilai, 0);
  const totalHutang = aset.filter(a => a.kategori === "hutang").reduce((s, a) => s + a.nilai, 0);
  const totalLiquid = aset.filter(a => ["bank", "tunai", "ewallet"].includes(a.kategori)).reduce((s, a) => s + a.nilai, 0);
  const totalKeluar = trx.filter(t => t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0);
  const totalMasuk = trx.filter(t => t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0);
  const totalGojek = trx.filter(t => t.sumber === "Gojek").reduce((s, t) => s + t.nominal, 0);
  const net = totalMasuk - totalKeluar;

  const katBreak = {};
  trx.filter(t => t.jenis === "keluar").forEach(t => { katBreak[t.kategori] = (katBreak[t.kategori] || 0) + t.nominal; });

  const sortedTrx = [...trx].sort((a, b) => (b.tanggal + b.jam).localeCompare(a.tanggal + a.jam));
  const filteredTrx = sortedTrx
    .filter(t => filterJ === "semua" || t.jenis === filterJ)
    .filter(t => filterSumber === "semua" || (filterSumber === "gojek" ? t.sumber === "Gojek" : t.sumber !== "Gojek"));

  const addTrx = (d) => setTrx(prev => { const e = prev.find(t => t.id === d.id); return e ? prev.map(t => t.id === d.id ? d : t) : [d, ...prev]; });
  const delTrx = (id) => setTrx(prev => prev.filter(t => t.id !== id));
  const addGoal = (d) => setGoals(prev => { const e = prev.find(g => g.id === d.id); return e ? prev.map(g => g.id === d.id ? d : g) : [d, ...prev]; });
  const delGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));

  const hariCount = [...new Set(trx.map(t => t.tanggal))].length || 1;
  const rataKeluar = totalKeluar / hariCount;
  const rataMasuk = totalMasuk / hariCount;

  // Goal progress calculation
  const calcGoal = (g) => {
    if (!g.deadline) return null;
    const today = new Date();
    const deadline = new Date(g.deadline);
    const hariSisa = Math.max(0, Math.floor((deadline - today) / 86400000));
    const kurang = Math.max(0, g.target - g.terkumpul);
    const sisihPerHari = hariSisa > 0 ? kurang / hariSisa : kurang;
    const netHarian = rataMasuk - rataKeluar;
    const hariCapai = netHarian > 0 ? Math.ceil(kurang / netHarian) : null;
    return { hariSisa, kurang, sisihPerHari, hariCapai };
  };

  // 7-day chart
  const days7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return {
      label: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      masuk: trx.filter(t => t.tanggal === key && t.jenis === "masuk").reduce((s, t) => s + t.nominal, 0),
      keluar: trx.filter(t => t.tanggal === key && t.jenis === "keluar").reduce((s, t) => s + t.nominal, 0),
    };
  });
  const maxDay = Math.max(...days7.map(d => Math.max(d.masuk, d.keluar)), 1);

  // Upcoming tagihan rutin
  const today = new Date();
  const rutinAlerts = goals.filter(g => g.tipe === "tagihan_rutin" && g.tanggalRutin).map(g => {
    const tglHariIni = today.getDate();
    const selisih = g.tanggalRutin >= tglHariIni ? g.tanggalRutin - tglHariIni : 30 - tglHariIni + g.tanggalRutin;
    return { ...g, selisih };
  }).sort((a, b) => a.selisih - b.selisih);

  const jColor = { masuk: "#10b981", keluar: "#ef4444", mutasi: "#8b5cf6" };

  return (
    <div style={{ minHeight: "100vh", background: "#10131e", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", maxWidth: 430, margin: "0 auto", position: "relative", fontSize: 14 }}>

      {/* Sticky Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 90, background: "#1a1f2e", borderBottom: "1px solid #252d40", padding: "12px 16px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 1 }}>TOTAL ASET BERSIH</div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", color: "#f1f5f9" }}>{fmt(totalAset)}</div>
            {totalHutang > 0 && <div style={{ fontSize: 10, color: "#f43f5e" }}>Hutang: {fmt(totalHutang)}</div>}
          </div>
          <div style={{ display: "flex", gap: 6, paddingTop: 4 }}>
            <Btn small color="#8b5cf6" onClick={() => setModal("ai")}>🤖 AI</Btn>
            <Btn small color="#f59e0b" onClick={() => setModal("rekap")}>📅 Rekap</Btn>
            <Btn small color="#10b981" onClick={() => { setEditTrx(null); setModal("trx"); }}>+ Catat</Btn>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["⬇", fmt(totalMasuk), "#10b981", "MASUK"], ["⬆", fmt(totalKeluar), "#ef4444", "KELUAR"], ["≈", (net >= 0 ? "+" : "") + fmt(net), net >= 0 ? "#10b981" : "#ef4444", "NET"]].map(([icon, val, c, label], i) => (
            <div key={i} style={{ flex: 1, background: c + "15", border: `1px solid ${c}30`, borderRadius: 8, padding: "5px 8px" }}>
              <div style={{ fontSize: 9, color: c, fontWeight: 700 }}>{icon} {label}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: c }}>{val}</div>
            </div>
          ))}
          <div style={{ flex: 1, background: "#f59e0b15", border: "1px solid #f59e0b30", borderRadius: 8, padding: "5px 8px" }}>
            <div style={{ fontSize: 9, color: "#f59e0b", fontWeight: 700 }}>🛵 GOJEK</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#f59e0b" }}>{fmt(totalGojek)}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 14px 80px" }}>

        {/* ── HOME ── */}
        {tab === "home" && <>
          {/* Rutian Alert */}
          {rutinAlerts.slice(0, 2).map(g => (
            <div key={g.id} style={{ background: g.selisih <= 3 ? "#f43f5e18" : "#f59e0b18", border: `1px solid ${g.selisih <= 3 ? "#f43f5e" : "#f59e0b"}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: g.selisih <= 3 ? "#f43f5e" : "#f59e0b" }}>
                  {g.selisih === 0 ? "🔴 HARI INI" : g.selisih <= 3 ? "⚠️ " + g.selisih + " hari lagi" : "🔔 " + g.selisih + " hari lagi"} — {g.nama}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Tgl {g.tanggalRutin} · {g.rekening || "–"} · {fmt(g.target)}</div>
              </div>
              <Pill label="Sinkronisasi!" color={g.selisih <= 3 ? "#f43f5e" : "#f59e0b"} />
            </div>
          ))}

          {/* Quick Actions */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 10, letterSpacing: "0.06em" }}>PENDAPATAN GOJEK</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              {[["🍱", "GoFood", "#ef4444", "gofood"], ["🛵", "GoRide", "#10b981", "goride"]].map(([icon, label, c, m]) => (
                <button key={m} onClick={() => setModal(m)} style={{ background: c + "18", border: `1px solid ${c}44`, borderRadius: 10, padding: "14px 6px", cursor: "pointer", color: c, fontWeight: 700, fontSize: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>{label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", background: "#10131e", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
              <span style={{ color: "#94a3b8" }}>Total Pendapatan Gojek</span>
              <span style={{ fontWeight: 800, color: "#f59e0b" }}>{fmt(totalGojek)}</span>
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 10 }}>TRANSAKSI LAINNYA</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button onClick={() => { setEditTrx(null); setModal("trx"); }} style={{ background: "#ef444418", border: "1px solid #ef444444", borderRadius: 10, padding: "12px 6px", cursor: "pointer", color: "#ef4444", fontWeight: 700, fontSize: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 20 }}>⬆</span>Catat Keluar
              </button>
              <button onClick={() => { setEditTrx({ jenis: "masuk" }); setModal("trx"); }} style={{ background: "#10b98118", border: "1px solid #10b98144", borderRadius: 10, padding: "12px 6px", cursor: "pointer", color: "#10b981", fontWeight: 700, fontSize: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 20 }}>⬇</span>Catat Masuk
              </button>
            </div>
          </Card>

          {/* Aset Overview */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>DISTRIBUSI ASET</div>
              <Btn small color="#3b82f6" onClick={() => setTab("aset")}>Detail →</Btn>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <Donut size={96} data={aset.filter(a => a.kategori !== "hutang").map(a => ({ v: a.nilai, c: COLORS[a.kategori] || "#64748b" }))} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#64748b" }}>Likuid</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#10b981" }}>{fmt(totalLiquid)}</div>
                <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{pct(totalLiquid, totalAset)}%</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>Non-Liquid (BTC)</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b" }}>{fmt(aset.find(a=>a.id==="btc")?.nilai||0)}</div>
              </div>
            </div>
            {aset.slice(0, 4).map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS[a.kategori] || "#64748b", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#94a3b8", width: 100, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.nama}</span>
                <MiniBar value={a.nilai} max={totalAset} color={COLORS[a.kategori] || "#64748b"} />
                <span style={{ fontSize: 10, color: "#e2e8f0", fontWeight: 700, width: 80, textAlign: "right", flexShrink: 0 }}>{fmt(a.nilai)}</span>
              </div>
            ))}
          </Card>

          {/* Recent Trx */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>TRANSAKSI TERBARU</div>
              <Btn small color="#3b82f6" onClick={() => setTab("trx")}>Semua →</Btn>
            </div>
            {sortedTrx.slice(0, 5).map(t => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #252d40" }}>
                <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: (KAT_COLOR[t.kategori] || "#64748b") + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{KAT_ICON[t.kategori] || "📌"}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{t.ket}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{t.tanggal} · {t.jam}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: jColor[t.jenis] }}>{t.jenis === "masuk" ? "+" : t.jenis === "keluar" ? "−" : "↔"}{fmt(t.nominal)}</div>
              </div>
            ))}
          </Card>
        </>}

        {/* ── TRANSAKSI ── */}
        {tab === "trx" && <>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {["semua", "masuk", "keluar", "mutasi"].map(j => <Btn key={j} small color={filterJ === j ? (j === "masuk" ? "#10b981" : j === "keluar" ? "#ef4444" : j === "mutasi" ? "#8b5cf6" : "#3b82f6") : "#475569"} onClick={() => setFilterJ(j)}>{j === "semua" ? "Semua" : j === "masuk" ? "⬇ Masuk" : j === "keluar" ? "⬆ Keluar" : "↔ Mutasi"}</Btn>)}
            <Btn small color={filterSumber === "gojek" ? "#f59e0b" : "#475569"} onClick={() => setFilterSumber(s => s === "gojek" ? "semua" : "gojek")}>🛵 Gojek</Btn>
          </div>
          {filteredTrx.map(t => (
            <Card key={t.id} style={{ padding: "11px 13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 9, flex: 1 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: (KAT_COLOR[t.kategori] || "#64748b") + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{KAT_ICON[t.kategori] || "📌"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 3, flexWrap: "wrap" }}>
                      <Pill label={t.kategori} color={KAT_COLOR[t.kategori] || "#64748b"} />
                      <Pill label={t.metode} color="#475569" />
                      {t.sumber === "Gojek" && <Pill label="Gojek" color="#f59e0b" />}
                    </div>
                    <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{t.ket}</div>
                    <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{t.tanggal} · {t.jam}</div>
                    {t.meta && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                      Tagih Rp {fmtNum(t.meta.tagih)} · Kembalian Rp {fmtNum(t.meta.kembalian)} {t.meta.diambil ? "(diambil)" : "(tips)"}{t.meta.tambahan ? ` · +Rp ${fmtNum(t.meta.tambahan)} tambahan` : ""}
                    </div>}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: jColor[t.jenis], marginBottom: 5 }}>{t.jenis === "masuk" ? "+" : t.jenis === "keluar" ? "−" : "↔"}Rp {fmtNum(t.nominal)}</div>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn small color="#f59e0b" onClick={() => { setEditTrx(t); setModal("trx"); }}>✏️</Btn>
                    <Btn small color="#ef4444" onClick={() => delTrx(t.id)}>🗑</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredTrx.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>Belum ada transaksi</div>}
        </>}

        {/* ── ASET ── */}
        {tab === "aset" && <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[{ label: "Total Aset", val: totalAset, c: "#3b82f6" }, { label: "Total Likuid", val: totalLiquid, c: "#10b981" }, { label: "Non-Liquid", val: aset.filter(a => !["bank","tunai","ewallet"].includes(a.kategori) && a.kategori !== "hutang").reduce((s,a)=>s+a.nilai,0), c: "#f59e0b" }, { label: "Total Hutang", val: totalHutang, c: "#f43f5e" }].map((m, i) => (
              <div key={i} style={{ background: m.c + "15", border: `1px solid ${m.c}30`, borderRadius: 11, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: m.c }}>{fmt(m.val)}</div>
              </div>
            ))}
          </div>
          <Btn full color="#3b82f6" style={{ marginBottom: 10 }} onClick={() => { setEditAsetItem(null); setModal("editAset"); }}>➕ Tambah Aset / Rekening / Saham / Hutang</Btn>
          {["bank", "tunai", "ewallet", "crypto", "saham", "talangan", "hutang"].map(kat => {
            const items = aset.filter(a => a.kategori === kat);
            if (!items.length) return null;
            const labels = { bank: "🏦 Bank", tunai: "💵 Tunai", ewallet: "📱 E-Wallet", crypto: "₿ Crypto", saham: "📈 Saham/Investasi", talangan: "🟠 Dana Talangan", hutang: "🔴 Hutang" };
            return (
              <div key={kat}>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, marginTop: 4, letterSpacing: "0.06em" }}>{labels[kat]}</div>
                {items.map(a => (
                  <Card key={a.id} style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: (COLORS[a.kategori] || "#64748b") + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{a.icon || "💰"}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{a.nama}</div>
                          <div style={{ fontSize: 11, color: "#64748b" }}>{a.sub}</div>
                          <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                            <Pill label={a.kategori === "hutang" ? "Hutang" : ["bank","tunai","ewallet"].includes(a.kategori) ? "Liquid" : "Non-Liquid"} color={a.kategori === "hutang" ? "#f43f5e" : ["bank","tunai","ewallet"].includes(a.kategori) ? "#10b981" : "#f59e0b"} />
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: a.kategori === "hutang" ? "#f43f5e" : COLORS[a.kategori] || "#64748b" }}>{fmt(a.nilai)}</div>
                        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{pct(a.nilai, totalAset)}%</div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <Btn small color="#f59e0b" onClick={() => { setEditAsetItem(a); setModal("editAset"); }}>✏️</Btn>
                          <Btn small color="#ef4444" onClick={() => setAset(prev => prev.filter(x => x.id !== a.id))}>🗑</Btn>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8 }}><MiniBar value={a.nilai} max={totalAset} color={COLORS[a.kategori] || "#64748b"} /></div>
                    {a.id === "btc" && <div style={{ marginTop: 8, background: "#10131e", borderRadius: 7, padding: 9, fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Harga Pasar</span><span style={{ color: "#f59e0b" }}>±Rp 1,13 M/BTC</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>P&L</span><span style={{ color: "#10b981" }}>+Rp 13.499 (+1,54%)</span></div>
                    </div>}
                  </Card>
                ))}
              </div>
            );
          })}
        </>}

        {/* ── GRAFIK ── */}
        {tab === "grafik" && <>
          {/* Masuk vs Keluar 7 hari */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 12 }}>MASUK vs KELUAR — 7 HARI</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 140, marginBottom: 8 }}>
              {days7.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%" }}>
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <div style={{ flex: 1, background: "#10b981cc", borderRadius: "2px 2px 0 0", height: `${(d.masuk / maxDay) * 100}%`, minHeight: d.masuk > 0 ? 2 : 0 }} />
                    <div style={{ flex: 1, background: "#ef4444cc", borderRadius: "2px 2px 0 0", height: `${(d.keluar / maxDay) * 100}%`, minHeight: d.keluar > 0 ? 2 : 0 }} />
                  </div>
                  <span style={{ fontSize: 8, color: "#64748b", textAlign: "center" }}>{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
              <span style={{ color: "#10b981" }}>■ Masuk</span>
              <span style={{ color: "#ef4444" }}>■ Keluar</span>
            </div>
          </Card>

          {/* Grafik Pemasukan */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 12 }}>PEMASUKAN — 7 HARI</div>
            <BarChart data={days7.map(d => ({ label: d.label, v: d.masuk }))} height={110} color="#10b981" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
              <span style={{ color: "#64748b" }}>Total</span><span style={{ color: "#10b981", fontWeight: 700 }}>{fmt(totalMasuk)}</span>
            </div>
          </Card>

          {/* Grafik Pengeluaran */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 12 }}>PENGELUARAN — 7 HARI</div>
            <BarChart data={days7.map(d => ({ label: d.label, v: d.keluar }))} height={110} color="#ef4444" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
              <span style={{ color: "#64748b" }}>Total</span><span style={{ color: "#ef4444", fontWeight: 700 }}>{fmt(totalKeluar)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: "#64748b" }}>Rata/hari</span><span style={{ color: "#ef4444", fontWeight: 700 }}>{fmt(rataKeluar)}</span>
            </div>
          </Card>

          {/* Kategori */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 12 }}>KATEGORI PENGELUARAN</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <Donut size={96} data={Object.entries(katBreak).map(([k, v]) => ({ v, c: KAT_COLOR[k] || "#64748b" }))} />
              <div style={{ flex: 1 }}>
                {Object.entries(katBreak).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                    <span style={{ color: KAT_COLOR[k] || "#94a3b8" }}>{KAT_ICON[k] || "📌"} {k}</span>
                    <span style={{ fontWeight: 700 }}>{pct(v, totalKeluar)}%</span>
                  </div>
                ))}
              </div>
            </div>
            {Object.entries(katBreak).sort((a,b)=>b[1]-a[1]).map(([k,v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                <span style={{ fontSize: 13 }}>{KAT_ICON[k] || "📌"}</span>
                <span style={{ fontSize: 11, color: "#94a3b8", width: 95, flexShrink: 0 }}>{k}</span>
                <MiniBar value={v} max={totalKeluar} color={KAT_COLOR[k] || "#64748b"} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#e2e8f0", width: 80, textAlign: "right", flexShrink: 0 }}>Rp {fmtNum(v)}</span>
              </div>
            ))}
          </Card>

          {/* Pendapatan Gojek */}
          <Card>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 10 }}>PENDAPATAN GOJEK</div>
            {[["GoFood", "#ef4444"], ["GoRide", "#10b981"]].map(([label, c]) => {
              const val = trx.filter(t => t.kategori === label).reduce((s, t) => s + t.nominal, 0);
              return (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{label === "GoFood" ? "🍱" : "🛵"}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", width: 70 }}>{label}</span>
                  <MiniBar value={val} max={totalGojek || 1} color={c} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0", width: 88, textAlign: "right" }}>Rp {fmtNum(val)}</span>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, borderTop: "1px solid #252d40", paddingTop: 8 }}>
              <span style={{ color: "#64748b" }}>Total Gojek</span>
              <span style={{ fontWeight: 800, color: "#f59e0b" }}>{fmt(totalGojek)}</span>
            </div>
          </Card>
        </>}

        {/* ── GOALS ── */}
        {tab === "goals" && <>
          <Btn full color="#8b5cf6" style={{ marginBottom: 10 }} onClick={() => { setEditGoalItem(null); setModal("goal"); }}>➕ Tambah Goal / Tagihan / Target</Btn>
          {goals.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>Belum ada goals. Tambahkan target atau tagihan rutin!</div>}
          {goals.map(g => {
            const calc = calcGoal(g);
            const prog = g.target > 0 ? Math.min(100, (g.terkumpul / g.target) * 100) : 0;
            const tipeColor = { tabungan: "#3b82f6", tagihan: "#f59e0b", tagihan_rutin: "#ef4444", cicilan: "#8b5cf6" };
            const tipeLabel = { tabungan: "🎯 Target", tagihan: "🧾 Tagihan", tagihan_rutin: "🔁 Rutin", cicilan: "💳 Cicilan" };
            return (
              <Card key={g.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                      <Pill label={tipeLabel[g.tipe] || g.tipe} color={tipeColor[g.tipe] || "#64748b"} />
                      {g.tipe === "tagihan_rutin" && <Pill label={`Tgl ${g.tanggalRutin}`} color="#f59e0b" />}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#e2e8f0" }}>{g.nama}</div>
                    {g.catatan && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{g.catatan}</div>}
                    {g.rekening && <div style={{ fontSize: 11, color: "#64748b" }}>📌 {g.rekening}</div>}
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn small color="#f59e0b" onClick={() => { setEditGoalItem(g); setModal("goal"); }}>✏️</Btn>
                    <Btn small color="#ef4444" onClick={() => delGoal(g.id)}>🗑</Btn>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                  <span style={{ color: "#64748b" }}>Terkumpul</span>
                  <span style={{ fontWeight: 700 }}>Rp {fmtNum(g.terkumpul)} / Rp {fmtNum(g.target)}</span>
                </div>
                <div style={{ height: 8, background: "#252d40", borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: `${prog}%`, height: "100%", background: tipeColor[g.tipe] || "#3b82f6", borderRadius: 4, transition: "width 0.4s" }} />
                </div>
                <div style={{ fontSize: 10, color: "#64748b", marginBottom: 8 }}>{prog.toFixed(1)}% tercapai</div>

                {calc && (
                  <div style={{ background: "#10131e", borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Sisa dibutuhkan</span><span style={{ fontWeight: 700, color: "#ef4444" }}>Rp {fmtNum(calc.kurang)}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Hari tersisa</span><span style={{ fontWeight: 700 }}>{calc.hariSisa} hari</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Sisihkan/hari</span><span style={{ fontWeight: 700, color: "#f59e0b" }}>Rp {fmtNum(calc.sisihPerHari)}</span></div>
                    {calc.hariCapai !== null ? (
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Estimasi tercapai</span><span style={{ fontWeight: 700, color: "#10b981" }}>~{calc.hariCapai} hari lagi</span></div>
                    ) : (
                      <div style={{ color: "#f43f5e", fontSize: 11, marginTop: 2 }}>⚠️ Net harian negatif — sulit tercapai dengan pola saat ini</div>
                    )}
                    {hariCount < 7 && <div style={{ color: "#f59e0b", fontSize: 10, marginTop: 4 }}>* Data masih {hariCount} hari. Estimasi akan lebih akurat setelah 7+ hari data.</div>}
                  </div>
                )}
                {g.tipe === "tagihan_rutin" && (
                  <div style={{ background: "#f59e0b18", border: "1px solid #f59e0b44", borderRadius: 8, padding: 10, marginTop: 8, fontSize: 11 }}>
                    <div style={{ color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>🔔 Pengingat Sinkronisasi</div>
                    <div style={{ color: "#94a3b8" }}>Setiap tanggal <b style={{ color: "#e2e8f0" }}>{g.tanggalRutin}</b>, cek dan sinkronisasi saldo <b style={{ color: "#e2e8f0" }}>{g.rekening || "rekeningmu"}</b> karena ada potongan <b style={{ color: "#e2e8f0" }}>Rp {fmtNum(g.target)}</b>.</div>
                  </div>
                )}
              </Card>
            );
          })}
        </>}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#1a1f2e", borderTop: "1px solid #252d40", display: "flex", zIndex: 90, paddingBottom: 8 }}>
        {[["home","🏠","Home"],["trx","📋","Transaksi"],["aset","💰","Aset"],["grafik","📊","Grafik"],["goals","🎯","Goals"]].map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "9px 0 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: tab === id ? 20 : 18 }}>{icon}</span>
            <span style={{ fontSize: 9, fontWeight: tab === id ? 800 : 400, color: tab === id ? "#3b82f6" : "#64748b" }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      {modal === "trx" && <TrxForm onAdd={addTrx} onClose={() => { setModal(null); setEditTrx(null); }} edit={editTrx} />}
      {modal === "gofood" && <GoForm type="GoFood" onAdd={addTrx} onClose={() => setModal(null)} />}
      {modal === "goride" && <GoForm type="GoRide" onAdd={addTrx} onClose={() => setModal(null)} />}
      {modal === "editAset" && <AsetForm onSave={(a) => setAset(prev => { const e = prev.find(x => x.id === a.id); return e ? prev.map(x => x.id === a.id ? a : x) : [...prev, a]; })} onClose={() => { setModal(null); setEditAsetItem(null); }} edit={editAsetItem} />}
      {modal === "goal" && <GoalForm onAdd={addGoal} onClose={() => { setModal(null); setEditGoalItem(null); }} edit={editGoalItem} />}
      {modal === "ai" && <AIChat aset={aset} trx={trx} goals={goals} onClose={() => setModal(null)} />}
      {modal === "rekap" && <RekapHarian trx={trx} onClose={() => setModal(null)} />}
    </div>
  );
}
