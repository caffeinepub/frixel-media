import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Globe,
  Palette,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "../backend.d";
import { useGetVisibleTestimonials } from "../hooks/useQueries";

// ============ HERO SECTION ============
const GEOMETRIC_SHAPES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 40 + Math.random() * 120,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: i * 0.4,
  duration: 8 + Math.random() * 6,
  opacity: 0.04 + Math.random() * 0.06,
}));

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden"
      style={{ background: "oklch(var(--primary))" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x900.jpg')",
        }}
      />

      {/* Geometric shapes */}
      {GEOMETRIC_SHAPES.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-white/10 rounded"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: shape.duration / 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            delay: shape.delay,
          }}
        />
      ))}

      {/* Gold gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[80px]" />

      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse-gold" />
            <span className="text-gold/80 text-sm font-semibold tracking-widest uppercase">
              Performance Marketing Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-[0.95] mb-6"
          >
            Grow Faster.
            <br />
            <span className="text-gold">Scale Smarter.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8"
          >
            Performance-driven digital marketing for brands that want real
            results. Data-backed strategies. Creative execution. Measurable ROI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-gold-foreground font-bold text-base rounded-md hover:bg-gold-dark transition-all duration-200 shadow-gold hover:shadow-gold-lg group"
            >
              Get Free Strategy Call
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-base rounded-md hover:border-gold hover:text-gold transition-all duration-200"
            >
              View Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-white/40 text-sm font-medium tracking-widest uppercase"
          >
            "Turning Brands Into Experiences."
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ============ PERFORMANCE STATEMENT ============
const PERFORMANCE_STATS = [
  {
    icon: TrendingUp,
    title: "Performance Focused",
    desc: "Every campaign is built with clear KPIs, measurable goals, and performance benchmarks.",
    color: "gold",
  },
  {
    icon: BarChart3,
    title: "Data Driven",
    desc: "We rely on real analytics — not gut feelings — to make decisions that drive growth.",
    color: "charcoal",
  },
  {
    icon: Zap,
    title: "ROI Optimized",
    desc: "Maximum return on every rupee spent. We optimize continuously for the best outcomes.",
    color: "gold",
  },
  {
    icon: Target,
    title: "Growth Engine",
    desc: "We build systems that compound — turning early wins into long-term brand dominance.",
    color: "charcoal",
  },
];

function PerformanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
            Why We're Different
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
            Built for results.
            <br />
            Not just reports.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCE_STATS.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group p-7 rounded-xl cursor-default transition-all duration-300 hover:-translate-y-1 ${
                stat.color === "gold"
                  ? "bg-charcoal text-white hover:shadow-gold-lg"
                  : "bg-muted text-foreground hover:shadow-card-hover"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
                  stat.color === "gold" ? "bg-gold/20" : "bg-charcoal/8"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${stat.color === "gold" ? "text-gold" : "text-charcoal"}`}
                />
              </div>
              <h3
                className={`font-display font-bold text-lg mb-2 ${
                  stat.color === "gold" ? "text-white" : "text-foreground"
                }`}
              >
                {stat.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  stat.color === "gold"
                    ? "text-white/60"
                    : "text-muted-foreground"
                }`}
              >
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES PREVIEW ============
const SERVICES = [
  {
    Icon: Share2,
    title: "Social Media Management",
    desc: "Scheduled, on-brand content that builds community, boosts reach, and keeps your audience engaged.",
  },
  {
    Icon: Target,
    title: "Meta Ads",
    desc: "Funnel-based Meta campaigns designed to lower CPL, increase ROAS, and drive real conversions.",
  },
  {
    Icon: Search,
    title: "Google Ads",
    desc: "Search, Display & YouTube campaigns with precision keyword targeting and bid management.",
  },
  {
    Icon: Palette,
    title: "Branding & Creative",
    desc: "Complete brand systems — logo, palette, guidelines, and creatives that make you unforgettable.",
  },
  {
    Icon: Video,
    title: "Video & Reels",
    desc: "Short-form video strategy that drives 3–5x more engagement and viral brand moments.",
  },
  {
    Icon: Globe,
    title: "Website Development",
    desc: "Performance-optimized websites with strong UX, mobile design, and conversion-focused architecture.",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-secondary/40" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
              What We Do
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
              Our Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-dark transition-colors group"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-white border border-border rounded-xl p-7 hover:border-gold hover:shadow-gold transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <service.Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PACKAGES PREVIEW ============
const PACKAGE_PREVIEW = [
  {
    name: "Mini Nova",
    tier: "Starter",
    price: "₹5,500",
    color: "muted",
    features: [
      "8 social posts/month",
      "1 reel/month",
      "GMB management",
      "1 business call",
    ],
  },
  {
    name: "Ascend Pro",
    tier: "Growth",
    price: "₹22,500",
    color: "gold",
    featured: true,
    features: [
      "16 posts/month",
      "5 reels/month",
      "Meta + Google Ads",
      "GMB management",
    ],
  },
  {
    name: "Elite Nexus",
    tier: "Premium",
    price: "₹55,000",
    color: "charcoal",
    features: [
      "20 creatives/month",
      "8 reels + 4 videos",
      "Full ad management",
      "Advanced analytics",
    ],
  },
];

function PackagesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
            Pricing Plans
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
            Plans that grow with you
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-sm mb-12"
        >
          Reel & video packages start from{" "}
          <strong className="text-foreground">₹10,000/month</strong>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKAGE_PREVIEW.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-xl p-7 border ${
                pkg.featured
                  ? "bg-charcoal text-white border-gold shadow-gold-lg scale-[1.03]"
                  : "bg-white text-foreground border-border hover:border-gold hover:shadow-gold transition-all duration-300"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-gold-foreground text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-5">
                <span
                  className={`text-xs font-bold tracking-widest uppercase ${
                    pkg.featured ? "text-gold" : "text-gold"
                  }`}
                >
                  {pkg.tier}
                </span>
                <h3
                  className={`font-display font-black text-2xl mt-1 ${
                    pkg.featured ? "text-white" : "text-foreground"
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span
                    className={`font-display font-black text-3xl ${
                      pkg.featured ? "text-gold" : "text-foreground"
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className={`text-sm ${pkg.featured ? "text-white/50" : "text-muted-foreground"}`}
                  >
                    /month
                  </span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-7">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        pkg.featured ? "text-gold" : "text-gold"
                      }`}
                    />
                    <span
                      className={`text-sm ${pkg.featured ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3 rounded-md font-bold text-sm transition-all duration-200 ${
                  pkg.featured
                    ? "bg-gold text-gold-foreground hover:bg-gold-dark"
                    : "bg-charcoal text-white hover:bg-charcoal/80"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-bold text-base rounded-md hover:bg-charcoal hover:text-white transition-all duration-200 group"
          >
            Get Custom Proposal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============ WHY CHOOSE US ============
const REASONS = [
  {
    num: "01",
    title: "Strategy Before Execution",
    desc: "We invest time understanding your business before touching a campaign. No rushed activations.",
  },
  {
    num: "02",
    title: "Transparent Reporting",
    desc: "Clear, honest reports. No vanity metrics — just the numbers that actually matter to your growth.",
  },
  {
    num: "03",
    title: "ROI-Focused Campaigns",
    desc: "Every campaign is designed around a return. If we can't measure it, we won't run it.",
  },
  {
    num: "04",
    title: "Creative + Analytical Team",
    desc: "We combine creative storytelling with deep data analysis for balanced, high-performing campaigns.",
  },
  {
    num: "05",
    title: "Affordable Scaling Solutions",
    desc: "Packages built for every stage of growth — so you never overpay or get left behind.",
  },
];

function WhyChooseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 bg-charcoal text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
            Our Edge
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Why Frixel Media?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-xl p-7 hover:border-gold/40 hover:bg-white/8 transition-all duration-300"
            >
              <span className="text-gold/30 font-display font-black text-5xl leading-none block mb-4">
                {reason.num}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-gold transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    id: 1n,
    clientName: "Rahul Sharma",
    company: "TechVision India",
    message:
      "Frixel Media transformed our digital presence completely. Our leads increased by 3x within the first two months. Their team is incredibly responsive and data-driven.",
    rating: 5n,
    isVisible: true,
  },
  {
    id: 2n,
    clientName: "Priya Agarwal",
    company: "StyleHouse Kolkata",
    message:
      "We launched our new clothing line with Frixel's help and the campaign performance exceeded all expectations. Creative quality is top-notch and reporting is always transparent.",
    rating: 5n,
    isVisible: true,
  },
  {
    id: 3n,
    clientName: "Anuj Mehta",
    company: "FreshMart Retail",
    message:
      "Their strategy-first approach really stands out. They took time to understand our business before running a single ad. ROI has been excellent and team communication is great.",
    rating: 5n,
    isVisible: true,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: testimonials } = useGetVisibleTestimonials();
  const items =
    testimonials && testimonials.length > 0
      ? testimonials
      : PLACEHOLDER_TESTIMONIALS;

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-3">
            Client Stories
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
            What brands say about us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id.toString()}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white border border-border rounded-xl p-7 hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: Number(t.rating) }, (_, s) => s).map(
                  (s) => (
                    <Star
                      key={`star-${t.id.toString()}-${s}`}
                      className="w-4 h-4 text-gold fill-gold"
                    />
                  ),
                )}
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-5 italic">
                "{t.message}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-display font-bold text-sm text-foreground">
                  {t.clientName}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA BOTTOM ============
function BottomCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 relative overflow-hidden"
      ref={ref}
      style={{ background: "oklch(var(--gold))" }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptLTQgMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-black text-4xl sm:text-5xl text-charcoal leading-tight mb-4">
            Ready to grow your brand?
          </h2>
          <p className="text-charcoal/70 text-lg max-w-xl mx-auto mb-8">
            Let's begin with a simple conversation. No pressure. No commitments.
            Just clarity.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-charcoal text-white font-bold text-base rounded-md hover:bg-charcoal/80 transition-all duration-200 group shadow-lg"
          >
            Let's Begin
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PerformanceSection />
      <ServicesSection />
      <PackagesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <BottomCTA />
    </>
  );
}
