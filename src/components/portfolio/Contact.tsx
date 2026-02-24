import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink, MapPin, Instagram, Code, ArrowUpRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ContactProps {
  profile: any;
}

export default function Contact({ profile }: ContactProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "neshun7413@gmail.com",
      href: `mailto:${profile?.email || "neshun7413@gmail.com"}`,
      description: "Best for project inquiries",
    },
    {
      icon: Github,
      label: "GitHub",
      value: `github.com/${profile?.github || "nytsoul"}`,
      href: `https://github.com/${profile?.github || "nytsoul"}`,
      description: "View my open-source work",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect professionally",
      href: profile?.linkedin || "#",
      description: "Professional networking",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@nyt__soul",
      href: profile?.instagram || "https://instagram.com/nyt__soul",
      description: "Personal updates",
    },
    {
      icon: Code,
      label: "Codeforces",
      value: "nytsoul",
      href: `https://codeforces.com/profile/${import.meta.env.VITE_CODEFORCES_USERNAME || "nytsoul"}`,
      description: "Competitive programming",
    },
    {
      icon: ExternalLink,
      label: "Website",
      value: profile?.website || "Portfolio",
      href: profile?.website || "#",
      description: "Personal website",
    },
  ].filter((m) => m.href !== "#");

  return (
    <div className="w-full px-6 lg:px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">Contact</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Let's work
            <br />
            <span className="gradient-text">together</span>
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-lg">
            I'm actively looking for internships and collaborative projects. Whether you have a question,
            a proposal, or just want to connect — don't hesitate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all duration-200"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/60 border border-border/40 shrink-0 group-hover:border-primary/40 transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{method.label}</div>
                    <div className="text-sm font-medium text-foreground truncate">{method.value}</div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">{method.description}</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </motion.a>
              );
            })}
          </div>

          {/* CTA Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <div className="rounded-2xl border border-border/60 bg-card/50 p-7">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ready to build something?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Whether it's a collaboration, internship opportunity, or freelance project — I'm available and
                responsive.
              </p>
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold"
                asChild
              >
                <a href={`mailto:${profile?.email || "neshun7413@gmail.com"}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send a Message
                </a>
              </Button>
              {profile?.location && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
