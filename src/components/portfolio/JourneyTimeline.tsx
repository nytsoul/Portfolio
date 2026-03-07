import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface JourneyItem {
  year: string;
  event: string;
  icon?: React.ReactNode;
}

// central data for the journey timeline – feel free to add icons per entry
const journeyData: JourneyItem[] = [
  {
    year: "2024",
    event: "Enrolled — SSN College of Engineering, Chennai",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    year: "2024",
    event: "Began competitive programming on Codeforces",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    year: "2025",
    event: "Shipped first full‑stack production application",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    year: "2025",
    event: "SIH finalist in December",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    year: "2026",
    event: "Open to internships & collaborative projects",
    icon: <Calendar className="w-5 h-5" />,
  },
];

// animation variants reused by the parent component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

export default function JourneyTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative"
    >
      {/* vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

      <div className="space-y-14">
        {journeyData.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="relative flex items-start pl-12"
          >
            {/* dot with icon */}
            <div className="absolute left-0 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white ring-4 ring-background z-10">
              {item.icon}
            </div>

            {/* content card */}
            <div className="bg-card/80 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:shadow-primary/25 transition-all w-full">
              <span className="text-sm font-semibold text-primary">{item.year}</span>
              <p className="mt-1 text-foreground leading-snug">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
