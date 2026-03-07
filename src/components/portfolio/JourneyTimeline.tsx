import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Calendar } from "lucide-react";
// useInView removed since timeline is always visible


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

// itemVariants now accepts a `custom` payload which indicates the starting x-offset
const itemVariants = {
  hidden: (offset: number) => ({ opacity: 0, x: offset }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

export default function JourneyTimeline() {
  // animation trigger always visible (no intersection observer)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex justify-center"
    >
      {/* constrain total width, center everything */}
      <div className="relative w-full max-w-3xl">
        {/* vertical timeline line (moves to center on medium+ screens) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

        <div className="space-y-14">
          {journeyData.map((item, idx) => {
            const offset = idx % 2 === 0 ? -40 : 40;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                custom={offset}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative flex items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
              >
                {/* Dot / icon sits on the central line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white ring-4 ring-background z-10">
                  {item.icon}
                </div>

                {/* entry card */}
                <div
                  className={`w-full md:w-4/12 ml-12 md:ml-0 ${
                    idx % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-background border border-border/60 p-4 rounded-xl shadow-md hover:shadow-primary/20 transition-all">
                    <span className="text-sm font-semibold text-primary">
                      {item.year}
                    </span>
                    <p className="mt-1 text-foreground leading-snug text-sm">
                      {item.event}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
