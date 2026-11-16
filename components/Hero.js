"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ShieldCheck, Truck } from "lucide-react";
import { PHONE, WA } from "./Extras";

const word = { hidden: { y: 60, opacity: 0 }, show: (i) => ({ y: 0, opacity: 1, transition: { delay: 2 + i * 0.12, duration: 0.7 } }) };

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const pills = [
    { c: "#22d3ee", w: 90, h: 36, t: "8%", l: "12%", r: 30 },
    { c: "#ff5d8f", w: 70, h: 28, t: "78%", l: "8%", r: -40 },
    { c: "#34d399", w: 100, h: 40, t: "15%", l: "72%", r: -20 },
    { c: "#fbbf24", w: 64, h: 26, t: "85%", l: "70%", r: 50 },
  ];
  const l1 = ["Sasti", "aur", "Miyari"], l2 = ["Adwiyat,", "Ek", "Hi", "Jagah."];
  return (
    <section id="home" className="hero">
      <div className="blob" style={{ width: 500, height: 500, background: "#5b4bff", top: -100, left: -150 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "#22d3ee", bottom: -100, right: -100, opacity: 0.3 }} />
      <motion.div className="hero-photo" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, duration: 1.4 }}
        style={{ y: y1 }} />
      <div className="photo-ring" />
      <div className="container hero-grid" style={{ position: "relative", zIndex: 2 }}>
        <div>
          <motion.span className="tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>● Trusted Pharmacy · Lahore</motion.span>
          <h1>
            {l1.map((w, i) => <motion.span key={w} custom={i} variants={word} initial="hidden" animate="show" style={{ display: "inline-block", marginRight: 16 }}>{w}</motion.span>)}
            <br />
            {l2.map((w, i) => <motion.span key={w + i} custom={i + 3} variants={word} initial="hidden" animate="show" className="grad" style={{ display: "inline-block", marginRight: 16 }}>{w}</motion.span>)}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}>
            Naeem Medical &amp; General Store — genuine medicines, quality healthcare products and honest advice at prices every family can afford.
          </motion.p>
          <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}>
            <a className="btn btn-primary" href={`tel:${PHONE}`}><Phone size={18} />{PHONE}</a>
            <a className="btn btn-ghost" href={WA} target="_blank">Order on WhatsApp</a>
          </motion.div>
          <motion.p className="urdu" style={{ marginTop: 28, color: "var(--accent)", fontSize: 22 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.3 }}>
            سستی اور معیاری ادویات — ملک نعیم
          </motion.p>
        </div>

        <motion.div className="orb-wrap" style={{ y: y1 }}>
          {pills.map((p, i) => (
            <motion.div key={i} className="pill" style={{ background: p.c, width: p.w, height: p.h, top: p.t, left: p.l, rotate: p.r }}
              animate={{ y: [0, -24, 0], rotate: [p.r, p.r + 25, p.r] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} />
          ))}
          <motion.div className="glass float-card" style={{ top: "30%", left: -10 }} animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <ShieldCheck color="#34d399" /><div>100% Genuine<small>Verified stock</small></div>
          </motion.div>
          <motion.div className="glass float-card" style={{ bottom: "22%", right: -10 }} animate={{ y: [0, 14, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <Truck color="#22d3ee" /><div>Home Delivery<small>Fast &amp; reliable</small></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
