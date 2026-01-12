import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";
import Navigation from "@/components/portfolio/Navigation";

export default function Portfolio() {
  const profile = useQuery(api.portfolio.getProfile, {});
  const githubStats = useQuery(api.portfolio.getGitHubStats, {});

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <Hero profile={profile} githubStats={githubStats} />
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-20">
          <Skills />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <Contact profile={profile} />
        </section>
      </main>

      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
