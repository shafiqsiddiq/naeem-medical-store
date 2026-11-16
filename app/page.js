import { Preloader, Progress, CursorGlow, Navbar, WhatsApp } from "@/components/Extras";
import Hero from "@/components/Hero";
import { Marquee, About, Services, Why, Process, Contact, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Preloader /><Progress /><CursorGlow /><Navbar />
      <Hero /><Marquee /><About /><Services /><Why /><Process /><Contact /><Footer /><WhatsApp />
    </main>
  );
}
