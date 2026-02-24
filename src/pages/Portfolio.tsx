import { motion } from "framer-motion";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import Navigation from "@/components/portfolio/Navigation";
import { useProfile, useGitHubStats } from "@/hooks/use-api";
import { useFallbackProfile, useFallbackGitHubStats } from "@/hooks/use-fallback-profile";
import { useGitHubSync } from "@/hooks/use-github-sync";

export default function Portfolio() {
  useGitHubSync();

  const { data: dbProfile } = useProfile();
  const { data: dbGithubStats } = useGitHubStats();

  const profile = useFallbackProfile(dbProfile);
  const githubStats = useFallbackGitHubStats(dbGithubStats);

  const sectionClass = "py-24 lg:py-32";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Fixed subtle noise background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Primary glow — top left */}
        <div
          className="absolute w-[600px] h-[600px] -top-48 -left-48 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.22 255), transparent 70%)" }}
        />
        {/* Secondary glow — bottom right */}
        <div
          className="absolute w-[500px] h-[500px] -bottom-32 -right-32 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.18 200), transparent 70%)" }}
        />
      </div>

      <main>
        {/* Hero — full screen */}
        <section id="hero">
          <Hero profile={profile} githubStats={githubStats} />
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-border/40" />

        {/* About */}
        <motion.section
          id="about"
          className={sectionClass}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.section>

        <div className="h-px w-full bg-border/40" />

        {/* Projects */}
        <motion.section
          id="projects"
          className={sectionClass}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Projects />
        </motion.section>

        <div className="h-px w-full bg-border/40" />

        {/* Skills */}
        <motion.section
          id="skills"
          className={sectionClass}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Skills />
        </motion.section>

        <div className="h-px w-full bg-border/40" />

        {/* Contact */}
        <motion.section
          id="contact"
          className={sectionClass}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Contact profile={profile} />
        </motion.section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
