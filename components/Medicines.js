"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Thermometer, Wind, Droplets, Sparkles, HeartPulse, ShieldPlus, Baby, Cross, LayoutGrid, Bike, Phone, MessageCircle, BadgeCheck } from "lucide-react";
import { PHONE, WA } from "./Extras";

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "pain", label: "Pain & Fever", icon: Thermometer },
  { id: "cold", label: "Cold & Flu", icon: Wind },
  { id: "stomach", label: "Stomach Care", icon: Droplets },
  { id: "vitamins", label: "Vitamins", icon: Sparkles },
  { id: "chronic", label: "Diabetes & BP", icon: HeartPulse },
  { id: "antibiotic", label: "Antibiotics", icon: ShieldPlus },
  { id: "baby", label: "Baby Care", icon: Baby },
  { id: "firstaid", label: "First Aid", icon: Cross },
];

const medicines = [
  ["pain", "Panadol", "Paracetamol", "OTC"], ["pain", "Brufen", "Ibuprofen", "OTC"], ["pain", "Ponstan", "Mefenamic Acid", "OTC"], ["pain", "Disprin", "Aspirin", "OTC"],
  ["cold", "Panadol CF", "Cold & Flu tablets", "OTC"], ["cold", "Benadryl", "Cough syrup", "OTC"], ["cold", "Strepsils", "Throat lozenges", "OTC"], ["cold", "Telfast", "Allergy relief", "OTC"],
  ["stomach", "ENO", "Fruit salt / acidity", "OTC"], ["stomach", "ORS", "Oral rehydration", "OTC"], ["stomach", "Gaviscon", "Heartburn relief", "OTC"], ["stomach", "Risek", "Omeprazole", "Rx"],
  ["vitamins", "Surbex-Z", "Multivitamin + Zinc", "OTC"], ["vitamins", "Cebion", "Vitamin C", "OTC"], ["vitamins", "Neurobion", "Vitamin B complex", "OTC"], ["vitamins", "Calcium-D", "Calcium + Vitamin D", "OTC"],
  ["chronic", "Glucophage", "Metformin", "Rx"], ["chronic", "Concor", "Bisoprolol", "Rx"], ["chronic", "Norvasc", "Amlodipine", "Rx"], ["chronic", "Glucose Strips", "Sugar testing", "Device"],
  ["antibiotic", "Augmentin", "Amoxicillin + Clavulanate", "Rx"], ["antibiotic", "Amoxil", "Amoxicillin", "Rx"], ["antibiotic", "Zithromax", "Azithromycin", "Rx"], ["antibiotic", "Flagyl", "Metronidazole", "Rx"],
  ["baby", "Cerelac", "Baby cereal", "Baby"], ["baby", "Nan / Lactogen", "Infant milk", "Baby"], ["baby", "Johnson's Baby", "Soap, powder, oil", "Baby"], ["baby", "Pampers", "Diapers", "Baby"],
  ["firstaid", "Dettol", "Antiseptic", "Care"], ["firstaid", "Betadine", "Wound antiseptic", "Care"], ["firstaid", "Bandages & Cotton", "Dressing supplies", "Care"], ["firstaid", "Thermometer / BP Monitor", "Home devices", "Device"],
].map(([cat, name, generic, tag]) => ({ cat, name, generic, tag }));

const tagColor = { OTC: "#34d399", Rx: "#ff5d8f", Device: "#22d3ee", Baby: "#fbbf24", Care: "#a78bfa" };

export function Medicines() {
  const [active, setActive] = useState("all");
  const list = active === "all" ? medicines : medicines.filter((m) => m.cat === active);
  const iconOf = (id) => categories.find((c) => c.id === id)?.icon || Pill;
  return (
    <section id="medicines">
      <div className="container center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="tag">Medicine Categories</span>
          <h2 className="title">Find your <span className="grad">medicine</span></h2>
          <p className="sub">Popular medicines and healthcare products by category. Availability may vary — call us to confirm.</p>
        </motion.div>

        <div className="cat-tabs">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`cat-tab ${active === c.id ? "on" : ""}`}>
              {active === c.id && <motion.span layoutId="cat-pill" className="cat-bg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="cat-in"><c.icon size={16} />{c.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="med-grid">
          <AnimatePresence mode="popLayout">
            {list.map((m) => {
              const I = iconOf(m.cat);
              return (
                <motion.div layout key={m.name} className="glass med-card" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                  <div className="med-top">
                    <div className="icon" style={{ margin: 0 }}><I color="#22d3ee" /></div>
                    <span className="med-tag" style={{ color: tagColor[m.tag], borderColor: tagColor[m.tag] }}>{m.tag === "Rx" ? "Rx · Prescription" : m.tag}</span>
                  </div>
                  <h3>{m.name}</h3>
                  <p>{m.generic}</p>
                  <a href={`${WA}?text=${encodeURIComponent(`Assalam o Alaikum, ${m.name} available hai?`)}`} target="_blank" className="med-ask"><MessageCircle size={15} />Ask availability</a>
                </motion.div>
              );
            })}
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
