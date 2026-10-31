
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Marquee from "@/components/landing/marquee";
import Workspace from "@/components/landing/workspace";
import Architecture from "@/components/landing/architecture";
import Contact from "@/components/landing/contact";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Workspace />
        <Architecture />
        <Contact />
      </main>
    </div>
  );
}
