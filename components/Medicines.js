"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Wind, Droplets, Sparkles, HeartPulse, ShieldPlus, Baby, Cross, LayoutGrid, Bike, Phone, MessageCircle, BadgeCheck } from "lucide-react";
import { PHONE, WA } from "./Extras";
import Pack from "./Pack";

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
                <div className="med-img" style={{ background: `radial-gradient(circle at 50% 55%, ${m.color}55, transparent 70%), var(--imgbg)` }}>
                  <span className="med-tag" style={{ color: tagColor[m.tag], borderColor: tagColor[m.tag] }}>{m.tag === "Rx" ? "Rx" : m.tag}</span>
                  <motion.div className="pack-wrap" whileHover={{ rotate: -6, scale: 1.12 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Pack form={m.form} color={m.color} name={m.name} />
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
