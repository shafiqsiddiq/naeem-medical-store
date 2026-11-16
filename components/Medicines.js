"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Wind, Droplets, Sparkles, HeartPulse, ShieldPlus, Baby, Cross, LayoutGrid, Bike, Phone, MessageCircle, BadgeCheck } from "lucide-react";
import { PHONE, WA } from "./Extras";

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "pain", label: "Pain & Fever", icon: Thermometer },
  { id: "cold", label: "Cold & Flu", icon: Wind },
  { id: "stomach", label: "Stomach", icon: Droplets },
  { id: "vitamins", label: "Vitamins", icon: Sparkles },
  { id: "chronic", label: "Diabetes & BP", icon: HeartPulse },
  { id: "antibiotic", label: "Antibiotics", icon: ShieldPlus },
  { id: "baby", label: "Baby Care", icon: Baby },
  { id: "firstaid", label: "First Aid", icon: Cross },
];

// [category, name, generic, tag, form, color]
const medicines = [
  ["pain", "Panadol", "Paracetamol", "OTC", "strip", "#3b82f6"], ["pain", "Brufen", "Ibuprofen", "OTC", "strip", "#f97316"],
  ["pain", "Ponstan", "Mefenamic Acid", "OTC", "box", "#eab308"], ["pain", "Disprin", "Aspirin", "OTC", "strip", "#ef4444"],
  ["cold", "Panadol CF", "Cold & Flu tablets", "OTC", "strip", "#10b981"], ["cold", "Benadryl", "Cough syrup", "OTC", "syrup", "#ec4899"],
  ["cold", "Strepsils", "Throat lozenges", "OTC", "lozenge", "#f59e0b"], ["cold", "Telfast", "Allergy relief", "OTC", "box", "#6366f1"],
  ["stomach", "ENO", "Fruit salt / acidity", "OTC", "sachet", "#22d3ee"], ["stomach", "ORS", "Oral rehydration", "OTC", "sachet", "#34d399"],
  ["stomach", "Gaviscon", "Heartburn relief", "OTC", "syrup", "#84cc16"], ["stomach", "Risek", "Omeprazole", "Rx", "bottle", "#a855f7"],
  ["vitamins", "Surbex-Z", "Multivitamin + Zinc", "OTC", "bottle", "#f97316"], ["vitamins", "Cebion", "Vitamin C", "OTC", "bottle", "#fbbf24"],
  ["vitamins", "Neurobion", "Vitamin B complex", "OTC", "box", "#ef4444"], ["vitamins", "Calcium-D", "Calcium + Vitamin D", "OTC", "bottle", "#38bdf8"],
  ["chronic", "Glucophage", "Metformin", "Rx", "strip", "#0ea5e9"], ["chronic", "Concor", "Bisoprolol", "Rx", "box", "#22c55e"],
  ["chronic", "Norvasc", "Amlodipine", "Rx", "strip", "#8b5cf6"], ["chronic", "Glucose Strips", "Sugar testing", "Device", "device", "#14b8a6"],
  ["antibiotic", "Augmentin", "Amoxicillin + Clavulanate", "Rx", "box", "#f43f5e"], ["antibiotic", "Amoxil", "Amoxicillin", "Rx", "bottle", "#fb923c"],
  ["antibiotic", "Zithromax", "Azithromycin", "Rx", "box", "#06b6d4"], ["antibiotic", "Flagyl", "Metronidazole", "Rx", "strip", "#a3e635"],
  ["baby", "Cerelac", "Baby cereal", "Baby", "tin", "#f59e0b"], ["baby", "Nan / Lactogen", "Infant milk", "Baby", "tin", "#3b82f6"],
  ["baby", "Johnson's Baby", "Soap, powder, oil", "Baby", "syrup", "#f472b6"], ["baby", "Pampers", "Diapers", "Baby", "diaper", "#38bdf8"],
  ["firstaid", "Dettol", "Antiseptic", "Care", "syrup", "#16a34a"], ["firstaid", "Betadine", "Wound antiseptic", "Care", "syrup", "#b45309"],
  ["firstaid", "Bandages & Cotton", "Dressing supplies", "Care", "bandage", "#e879f9"], ["firstaid", "Thermometer / BP Monitor", "Home devices", "Device", "device", "#6366f1"],
].map(([cat, name, generic, tag, form, color]) => ({ cat, name, generic, tag, form, color }));

const tagColor = { OTC: "#34d399", Rx: "#ff5d8f", Device: "#22d3ee", Baby: "#fbbf24", Care: "#a78bfa" };

function Pack({ form, color }) {
  const label = (x, y, w, h) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#fff" opacity=".95" />
      <rect x={x + w / 2 - 2} y={y + h / 2 - 7} width="4" height="14" rx="1" fill={color} />
      <rect x={x + w / 2 - 7} y={y + h / 2 - 2} width="14" height="4" rx="1" fill={color} />
    </g>
  );
  const shapes = {
    strip: (
      <g>
        <rect x="22" y="30" width="76" height="62" rx="9" fill="#e5e7eb" stroke="#fff" strokeWidth="2" />
        {[0, 1, 2].map((c) => [0, 1].map((r) => (
          <g key={`${c}${r}`}>
            <rect x={28 + c * 23} y={36 + r * 26} width="19" height="22" rx="9.5" fill="#fff" opacity=".7" />
            <ellipse cx={37.5 + c * 23} cy={47 + r * 26} rx="6" ry="8.5" fill={color} />
          </g>
        )))}
      </g>
    ),
    syrup: (
      <g>
        <rect x="50" y="14" width="20" height="14" rx="3" fill="#334155" />
        <rect x="53" y="28" width="14" height="10" fill="#cbd5e1" />
        <rect x="34" y="38" width="52" height="68" rx="12" fill={color} opacity=".9" />
        <rect x="34" y="38" width="52" height="68" rx="12" fill="url(#shine)" />
        {label(40, 54, 40, 34)}
      </g>
    ),
    bottle: (
      <g>
        <rect x="34" y="20" width="52" height="20" rx="6" fill="#334155" />
        <rect x="30" y="38" width="60" height="68" rx="10" fill={color} opacity=".92" />
        <rect x="30" y="38" width="60" height="68" rx="10" fill="url(#shine)" />
        {label(37, 52, 46, 38)}
      </g>
    ),
    box: (
      <g>
        <polygon points="26,38 82,38 94,28 38,28" fill="#fff" opacity=".85" />
        <rect x="26" y="38" width="56" height="62" rx="3" fill={color} />
        <polygon points="82,38 94,28 94,90 82,100" fill={color} opacity=".6" />
        <rect x="26" y="38" width="56" height="62" rx="3" fill="url(#shine)" />
        {label(34, 50, 40, 38)}
      </g>
    ),
    sachet: (
      <g>
        <path d="M30 28 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 V98 H30 Z" fill={color} />
        <path d="M30 28 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 V98 H30 Z" fill="url(#shine)" />
        {label(38, 44, 44, 40)}
      </g>
    ),
    lozenge: (
      <g>
        <rect x="18" y="42" width="84" height="38" rx="19" fill={color} />
        <rect x="18" y="42" width="84" height="38" rx="19" fill="url(#shine)" />
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={36 + i * 16} cy="61" r="8" fill="#fff" opacity=".85" />)}
      </g>
    ),
    tin: (
      <g>
        <ellipse cx="60" cy="96" rx="32" ry="8" fill={color} />
        <rect x="28" y="38" width="64" height="58" fill={color} />
        <ellipse cx="60" cy="38" rx="32" ry="8" fill="#e5e7eb" />
        <rect x="28" y="38" width="64" height="58" fill="url(#shine)" />
        {label(38, 52, 44, 34)}
      </g>
    ),
    diaper: (
      <g>
        <path d="M22 36 h76 v22 c0 22 -14 34 -38 34 s-38 -12 -38 -34 Z" fill={color} />
        <path d="M22 36 h76 v22 c0 22 -14 34 -38 34 s-38 -12 -38 -34 Z" fill="url(#shine)" />
        <rect x="22" y="36" width="76" height="9" fill="#fff" opacity=".8" />
        <circle cx="60" cy="66" r="8" fill="#fff" opacity=".85" />
      </g>
    ),
    device: (
      <g>
        <rect x="46" y="16" width="28" height="82" rx="14" fill="#f1f5f9" />
        <rect x="55" y="26" width="10" height="50" rx="5" fill="#cbd5e1" />
        <rect x="55" y="48" width="10" height="28" rx="5" fill={color} />
        <circle cx="60" cy="88" r="12" fill={color} />
      </g>
    ),
    bandage: (
      <g>
        <rect x="16" y="46" width="88" height="28" rx="14" fill={color} transform="rotate(-18 60 60)" />
        <rect x="42" y="46" width="36" height="28" fill="#fde68a" transform="rotate(-18 60 60)" />
        <circle cx="52" cy="60" r="1.6" fill="#b45309" /><circle cx="60" cy="56" r="1.6" fill="#b45309" /><circle cx="68" cy="64" r="1.6" fill="#b45309" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 120 120" className="pack" aria-hidden="true">
      <defs>
        <linearGradient id="shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="34" ry="5" fill="#000" opacity=".35" />
      {shapes[form] || shapes.box}
    </svg>
  );
}

export function Medicines() {
  const [active, setActive] = useState("all");
  const list = active === "all" ? medicines : medicines.filter((m) => m.cat === active);
  return (
    <section id="medicines">
      <div className="container center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="tag">Medicine Categories</span>
          <h2 className="title">Find your <span className="grad">medicine</span></h2>
          <p className="sub">Popular medicines and healthcare products by category. Availability may vary — call us to confirm.</p>
        </motion.div>

        <div className="cat-wrap">
          <div className="cat-tabs">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`cat-tab ${active === c.id ? "on" : ""}`}>
                {active === c.id && <motion.span layoutId="cat-pill" className="cat-bg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="cat-in"><c.icon size={16} />{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="med-grid">
          <AnimatePresence mode="popLayout">
            {list.map((m) => (
              <motion.div layout key={m.name} className="glass med-card" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                <div className="med-img" style={{ background: `radial-gradient(circle at 50% 55%, ${m.color}55, transparent 70%), rgba(255,255,255,.03)` }}>
                  <span className="med-tag" style={{ color: tagColor[m.tag], borderColor: tagColor[m.tag] }}>{m.tag === "Rx" ? "Rx" : m.tag}</span>
                  <motion.div className="pack-wrap" whileHover={{ rotate: -6, scale: 1.12 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Pack form={m.form} color={m.color} />
                  </motion.div>
                </div>
                <div className="med-body">
                  <h3>{m.name}</h3>
                  <p>{m.generic}</p>
                  <a href={`${WA}?text=${encodeURIComponent(`Assalam o Alaikum, ${m.name} available hai?`)}`} target="_blank" className="med-ask"><MessageCircle size={15} />Ask availability</a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="note">Prescription (Rx) medicines are given only against a valid doctor's prescription.</p>
      </div>
    </section>
  );
}

export function Delivery() {
  return (
    <section id="delivery" style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div className="delivery" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <motion.div className="bike" animate={{ x: [0, 14, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Bike size={64} /></motion.div>
          <div className="del-text">
            <span className="free-badge"><BadgeCheck size={16} />100% FREE</span>
            <h2>Free Home Delivery</h2>
            <p>Medicines ghar baithay mangwayein — delivery bilkul free. Call ya WhatsApp karein, hum aap ke darwaze tak pohancha denge.</p>
            <p className="urdu" style={{ fontSize: 18, opacity: 0.9 }}>ادویات گھر بیٹھے منگوائیں — ڈیلیوری بالکل مفت</p>
          </div>
          <div className="del-cta">
            <a className="btn btn-white" href={`tel:${PHONE}`}><Phone size={18} />{PHONE}</a>
            <a className="btn btn-outline" href={WA} target="_blank"><MessageCircle size={18} />Order on WhatsApp</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
