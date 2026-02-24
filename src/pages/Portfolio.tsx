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

  const section = "py-24 lg:py-32";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Fixed ambient background — warm editorial glow */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Warm gold top-left radial */}
        <div
          className="absolute w-[700px] h-[700px] -top-56 -left-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.12 75 / 0.055) 0%, transparent 65%)",
          }}
        />
        {/* Cool teal bottom-right */}
        <div
          className="absolute w-[500px] h-[500px] -bottom-32 -right-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.10 200 / 0.035) 0%, transparent 65%)",
          }}
        />
        {/* Faint horizontal rule bands for depth */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.55 0.008 80 / 0.35) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <main>
        {/* Hero */}
        <section id="hero">
          <Hero profile={profile} githubStats={githubStats} />
        </section>

        <div className="h-px w-full bg-border/35" />

        {/* About */}
        <motion.section
          id="about"
          className={section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.section>

        <div className="h-px w-full bg-border/35" />

        {/* Projects */}
        <motion.section
          id="projects"
          className={section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5 }}
        >
          <Projects />
        </motion.section>

        <div className="h-px w-full bg-border/35" />

        {/* Skills */}
        <motion.section
          id="skills"
          className={section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5 }}
        >
          <Skills />
        </motion.section>

        <div className="h-px w-full bg-border/35" />

        {/* Contact */}
        <motion.section
          id="contact"
          className={section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5 }}
        >
          <Contact profile={profile} />
        </motion.section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
