import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp, Mail, Download, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsExpanded(false);
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  const downloadResume = () => {
    // You can replace this with your actual resume URL
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Update with your resume path
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExpanded(false);
  };

  const actions = [
    {
      icon: ArrowUp,
      label: "Scroll to top",
      onClick: scrollToTop,
      color: "text-primary",
      show: showScrollTop,
    },
    {
      icon: MessageSquare,
      label: "Contact me",
      onClick: scrollToContact,
      color: "text-chart-3",
      show: true,
    },
    {
      icon: Download,
      label: "Download resume",
      onClick: downloadResume,
      color: "text-chart-4",
      show: true,
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-end gap-3">
        <AnimatePresence>
          {isExpanded &&
            actions
              .filter((action) => action.show)
              .map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={action.onClick}
                        className="glass-strong shadow-lg hover:shadow-xl transition-all h-12 w-12"
                      >
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-chart-2 shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all"
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
