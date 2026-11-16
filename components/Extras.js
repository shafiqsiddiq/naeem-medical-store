"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Phone, MessageCircle, Menu, X, Sun, Moon } from "lucide-react";
import Logo from "./Logo";

export const PHONE = "0321-4137823";
export const WA = "https://wa.me/923214137823";

export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1800); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div style={{ textAlign: "center" }}>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1 }}
              style={{ width: 96, margin: "0 auto 20px" }}>
              <Logo size={96} />
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Naeem Medical Store</motion.h2>
            <motion.div initial={{ width: 0 }} animate={{ width: 200 }} transition={{ delay: 0.3, duration: 1.3 }}
              style={{ height: 3, background: "linear-gradient(90deg,#22d3ee,#5b4bff)", margin: "16px auto", borderRadius: 9 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

export function CursorGlow() {
  const [p, setP] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const m = (e) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return <motion.div className="glow" animate={{ left: p.x, top: p.y }} transition={{ type: "spring", damping: 30, stiffness: 120 }} />;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"); }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  return (
    <button className="theme-btn" onClick={toggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Dark mode"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ y: 18, rotate: -90, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -18, rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [s, setS] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = [["About", "about"], ["Services", "services"], ["Medicines", "medicines"],["Why Us", "whyus"], ["Process", "process"], ["Contact", "contact"]];
  return (
    <motion.nav className={`nav ${s ? "scrolled" : ""}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2, duration: 0.7 }}>
      <a href="#home" className="logo"><Logo size={42} /><span className="logo-text"><b>Naeem</b><small>Medical &amp; General Store</small></span></a>
      <div className="links">{links.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
      <div className="nav-right">
        <ThemeToggle />
        <a href={`tel:${PHONE}`} className="btn btn-primary" style={{ padding: "10px 20px" }}><Phone size={16} /><span className="call-txt">Call Now</span></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="glass mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {links.map(([l, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export function WhatsApp() {
  return <a href={WA} target="_blank" className="wa" aria-label="WhatsApp"><MessageCircle color="#fff" size={30} /></a>;
}
