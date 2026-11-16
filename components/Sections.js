"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Pill, Baby, HeartPulse, Syringe, Thermometer, ShoppingBasket, BadgeCheck, Wallet, Clock, Users, MapPin, Phone, Send, Search, ClipboardCheck, PackageCheck } from "lucide-react";
import { PHONE, WA } from "./Extras";

const fade = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const Reveal = ({ children, delay = 0, style, className }) => (
  <motion.div className={className} style={style} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ delay }}>{children}</motion.div>
);

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const step = (t) => { if (s === null) s = t; const p = Math.min((t - s) / 1800, 1); setV(Math.floor(p * to)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function Tilt({ children, className }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  return (
    <motion.div className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}

export function Marquee() {
  const items = ["Tablets & Capsules", "Syrups", "Injections", "Baby Care", "Diabetes Care", "First Aid", "Vitamins", "Surgical Items", "General Store"];
  const all = [...items, ...items];
  return <div className="marquee"><div className="track">{all.map((t, i) => <span key={i}><b>✚</b>{t}</span>)}</div></div>;
}

export function About() {
  const stats = [[10, "+", "Years of Service"], [5000, "+", "Happy Customers"], [1500, "+", "Products in Stock"], [100, "%", "Genuine Medicines"]];
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <span className="tag">About Us</span>
            <h2 className="title">Healthcare you can <span className="grad">trust</span>, at a price you can afford.</h2>
            <p className="sub" style={{ marginBottom: 16 }}>Naeem Medical &amp; General Store is a neighbourhood pharmacy built on one promise: genuine medicines at fair prices. We stock a wide range of prescription and over-the-counter medicines along with everyday general items.</p>
            <p className="sub">Led by Malik Naeem, our team believes every family deserves quality medicine without the stress of overpricing.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Tilt className="glass owner">
              <div className="avatar">N</div>
              <h3 style={{ fontSize: 26 }}>Malik Naeem</h3>
              <p style={{ color: "var(--accent)" }}>Owner · Naeem Medical &amp; General Store</p>
              <p className="urdu" style={{ marginTop: 14, color: "var(--muted)" }}>سستی اور معیاری ادویات</p>
            </Tilt>
          </Reveal>
        </div>
        <div className="stats">
          {stats.map(([n, s, l], i) => (
            <Reveal key={l} delay={i * 0.1} className="glass stat"><h3 className="grad"><Counter to={n} suffix={s} /></h3><p>{l}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const list = [
    [Pill, "Prescription Medicines", "All doctor-prescribed tablets, capsules, syrups and injections from trusted brands."],
    [Thermometer, "OTC & Everyday Care", "Fever, flu, pain, allergy and stomach remedies available any time."],
    [Baby, "Mother & Baby Care", "Milk, diapers, supplements and gentle care products for little ones."],
    [HeartPulse, "Diabetes & BP Care", "Glucose strips, BP medicines, monitors and chronic-care essentials."],
    [Syringe, "Surgical & First Aid", "Bandages, syringes, gloves, dressings and emergency supplies."],
    [ShoppingBasket, "General Store", "Daily-use household and personal-care items under the same roof."],
  ];
  return (
    <section id="services" style={{ background: "var(--bg2)" }}>
      <div className="container center">
        <Reveal><span className="tag">Our Services</span><h2 className="title">Everything for your <span className="grad">health</span></h2><p className="sub">From prescriptions to daily essentials — one trusted counter.</p></Reveal>
        <div className="grid3" style={{ textAlign: "left" }}>
          {list.map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 0.08}><Tilt className="glass card"><div className="icon"><I color="#22d3ee" /></div><h3>{t}</h3><p>{d}</p></Tilt></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const list = [[BadgeCheck, "Genuine Quality", "Every medicine is sourced from authorised distributors."], [Wallet, "Affordable Prices", "Fair rates — sasti aur miyari adwiyat is our promise."], [Clock, "Quick Service", "No long waits. Get what you need fast."], [Users, "Honest Advice", "Friendly guidance on usage and alternatives."]];
  return (
    <section id="whyus">
      <div className="container center">
        <Reveal><span className="tag">Why Choose Us</span><h2 className="title">Why families <span className="grad">choose</span> Naeem Medical</h2></Reveal>
        <div className="steps" style={{ textAlign: "left" }}>
          {list.map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 0.1}><motion.div className="glass step" whileHover={{ y: -10 }}><I size={34} color="#34d399" style={{ marginBottom: 14 }} /><h3 style={{ marginBottom: 6 }}>{t}</h3><p style={{ color: "var(--muted)", fontSize: 15 }}>{d}</p></motion.div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const list = [[Phone, "Call or Message", "Contact us by phone or WhatsApp."], [Search, "We Check Stock", "We confirm availability & price."], [ClipboardCheck, "Verify Prescription", "Right medicine, right dose."], [PackageCheck, "Pick Up / Delivery", "Collect at store or get it delivered."]];
  return (
    <section id="process" style={{ background: "var(--bg2)" }}>
      <div className="container center">
        <Reveal><span className="tag">How It Works</span><h2 className="title">Simple, <span className="grad">4 easy steps</span></h2></Reveal>
        <div className="steps" style={{ textAlign: "left" }}>
          {list.map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 0.12}><div className="glass step"><span className="n">0{i + 1}</span><div className="icon"><I color="#22d3ee" /></div><h3 style={{ marginBottom: 6 }}>{t}</h3><p style={{ color: "var(--muted)", fontSize: 15 }}>{d}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    window.open(`${WA}?text=${encodeURIComponent(`Name: ${f.get("n")}\nPhone: ${f.get("p")}\n${f.get("m")}`)}`, "_blank");
  };
  return (
    <section id="contact">
      <div className="container center">
        <Reveal><span className="tag">Contact</span><h2 className="title">Visit or <span className="grad">call us today</span></h2><p className="sub">We are always happy to help.</p></Reveal>
        <div className="contact-grid" style={{ textAlign: "left" }}>
          <Reveal>
            <a href={`tel:${PHONE}`} className="glass info"><div className="icon" style={{ margin: 0 }}><Phone color="#22d3ee" /></div><div><small style={{ color: "var(--muted)" }}>Call / WhatsApp</small><h3>{PHONE}</h3></div></a>
            <div className="glass info"><div className="icon" style={{ margin: 0 }}><MapPin color="#22d3ee" /></div><div><small style={{ color: "var(--muted)" }}>Address</small><h3>Sabzi Wala Pull Hair, Bedian Road, Lahore</h3><small className="urdu" style={{ color: "var(--muted)" }}>سبزی والا پل ہیر، بیدیاں روڈ، لاہور</small></div></div>
            <div className="glass info"><div className="icon" style={{ margin: 0 }}><Users color="#22d3ee" /></div><div><small style={{ color: "var(--muted)" }}>Owner</small><h3>Malik Naeem</h3></div></div>
          </Reveal>
          <Reveal delay={0.15}>
            <form className="glass" onSubmit={submit}>
              <input name="n" placeholder="Your name" required />
              <input name="p" placeholder="Phone number" required />
              <textarea name="m" rows={4} placeholder="Medicine / message" required />
              <button className="btn btn-primary" type="submit"><Send size={18} />Send via WhatsApp</button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return <footer><p>© {new Date().getFullYear()} Naeem Medical &amp; General Store · Malik Naeem · {PHONE}</p><p className="urdu">سستی اور معیاری ادویات</p></footer>;
}
