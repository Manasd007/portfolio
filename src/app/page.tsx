import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { AboutSkills } from "@/components/sections/AboutSkills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <SelectedWork />
      <Experience />
      <AboutSkills />
      <Contact />
    </main>
  );
}
