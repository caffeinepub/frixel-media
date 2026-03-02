import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Compass,
  Eye,
  MapPin,
  Target,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const APPROACH_STEPS = [
  {
    step: "01",
    title: "Strategy First",
    desc: "Deep business understanding before any creative or campaign work begins.",
  },
  {
    step: "02",
    title: "Creative Execution",
    desc: "On-brand, high-quality content built to engage and convert the right audience.",
  },
  {
    step: "03",
    title: "Data Analysis",
    desc: "Continuous measurement of what works — and what doesn't — to optimize performance.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Systematic growth using proven frameworks, reinvesting wins into expanded reach.",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-60px" });

  const approachRef = useRef(null);
  const approachInView = useInView(approachRef, {
    once: true,
    margin: "-60px",
  });

  const unitRef = useRef(null);
  const unitInView = useInView(unitRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/3 blur-[60px]" />
        <div
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-4">
              Who We Are
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-[0.92] mb-6">
              About
              <br />
              <span className="text-gold">Frixel Media</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
              A performance-driven digital marketing agency helping brands grow
              with clarity, consistency, and data-backed strategy. Based in West
              Bengal, serving all of India.
            </p>
            <div className="inline-flex items-center gap-2 text-white/40 text-sm">
              <MapPin className="w-4 h-4 text-gold/60" />
              Panskura, Purba Medinipur, West Bengal, India · All India (Remote)
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white" ref={missionRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-charcoal rounded-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/8 blur-[50px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <span className="text-gold/60 text-xs font-black tracking-widest uppercase block mb-3">
                  Our Mission
                </span>
                <h2 className="font-display font-black text-3xl text-white mb-4 leading-tight">
                  Why we exist
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  To help brands grow with{" "}
                  <span className="text-white">clarity, consistency,</span> and{" "}
                  <span className="text-white">data-driven strategies</span> —
                  transforming digital presence from a cost into a growth
                  engine.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-gold/5 border border-gold/20 rounded-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-gold/10 blur-[50px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gold/15 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold" />
                </div>
                <span className="text-gold/80 text-xs font-black tracking-widest uppercase block mb-3">
                  Our Vision
                </span>
                <h2 className="font-display font-black text-3xl text-foreground mb-4 leading-tight">
                  Where we're going
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  To be{" "}
                  <span className="text-foreground font-semibold">
                    India's most trusted performance marketing partner
                  </span>{" "}
                  for growing businesses — known for results, reliability, and
                  long-term thinking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-secondary/30" ref={approachRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={approachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Compass className="w-7 h-7 text-gold" />
            </div>
            <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
              How We Work
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
              Our Approach
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {APPROACH_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={approachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-charcoal text-gold font-display font-black text-lg mb-5 mx-auto border-4 border-white shadow-card">
                    {step.step}
                  </div>
                  {i < APPROACH_STEPS.length - 1 && (
                    <div className="lg:hidden absolute top-8 left-[calc(50%+32px)] right-0 h-0.5 bg-gold/20" />
                  )}
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Frixel International */}
      <section
        className="py-24 bg-charcoal relative overflow-hidden"
        ref={unitRef}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={unitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-gold" />
              </div>
              <span className="text-gold/70 text-xs font-black tracking-widest uppercase block mb-3">
                Part of Something Larger
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-6">
                A Unit of
                <br />
                <span className="text-gold">Frixel International</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Frixel Media operates as a specialized unit under{" "}
                <strong className="text-white">Frixel International</strong> — a
                growing organization committed to building businesses through
                innovation, technology, and strategy.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Being part of Frixel International gives our clients access to
                broader expertise, deeper resources, and the confidence of
                working with an organization built for long-term thinking and
                sustained impact.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-px h-10 bg-gold/30" />
                <p className="text-white/40 text-sm italic">
                  "Built to last. Designed to grow."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={unitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-5"
            >
              {[
                {
                  title: "Panskura, West Bengal",
                  desc: "Our home base — where every strategy is crafted with precision and purpose.",
                },
                {
                  title: "All India Service Coverage",
                  desc: "We work with brands across India remotely — delivering the same quality regardless of geography.",
                },
                {
                  title: "Remote-First Operations",
                  desc: "Built for the modern business landscape — efficient, agile, and fully connected.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-gold/30 transition-colors"
                >
                  <h3 className="font-display font-bold text-base text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            Let's build something great together
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Reach out — we'd love to understand your brand and find where we can
            help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-gold-foreground font-bold text-base rounded-md hover:bg-gold-dark transition-all duration-200 shadow-gold group"
          >
            Let's Begin with a simple conversation
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
