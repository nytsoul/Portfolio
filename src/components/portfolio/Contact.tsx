import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ContactProps {
  profile: any;
}

export default function Contact({ profile }: ContactProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "neshun7413@gmail.com",
      href: `mailto:${profile?.email || "neshun7413@gmail.com"}`,
      color: "text-chart-1",
    },
    {
      icon: Github,
      label: "GitHub",
      value: profile?.github || "nytsoul",
      href: `https://github.com/${profile?.github || "nytsoul"}`,
      color: "text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: profile?.linkedin || "#",
      color: "text-chart-2",
    },
    {
      icon: ExternalLink,
      label: "Website",
      value: profile?.website || "https://alexchen.dev",
      href: profile?.website || "https://alexchen.dev",
      color: "text-chart-3",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or just
            having a chat about technology. Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur border-border">
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className={`p-3 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors`}
                    >
                      <Icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">
                        {method.label}
                      </div>
                      <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {method.value}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-border text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Let's Build Something Amazing
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Whether you have a project in mind, need technical consultation, or
              just want to connect, I'd love to hear from you.
            </p>
            <Button size="lg" asChild>
              <a href={`mailto:${profile?.email || "neshun7413@gmail.com"}`}>
                <Mail className="w-5 h-5 mr-2" />
                Send Me an Email
              </a>
            </Button>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground"
        >
          <p>
            Built with React, TypeScript, Tailwind CSS, and Convex
          </p>
          <p className="mt-2">
            {profile?.location && (
              <>
                <MapPin className="w-4 h-4 inline mr-1" />
                {profile.location} •{" "}
              </>
            )}
            © {new Date().getFullYear()} {profile?.name || "Neshun R"}. All
            rights reserved.
          </p>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
