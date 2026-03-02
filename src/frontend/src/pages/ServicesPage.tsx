import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Globe,
  Palette,
  Search,
  Share2,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const SERVICES = [
  {
    Icon: Share2,
    title: "Social Media Management",
    problem: "Inconsistent posting kills brand trust and audience engagement.",
    solution:
      "We build scheduled, on-brand content systems that keep your audience engaged every single day — without you lifting a finger.",
    delivers: [
      "Monthly content calendar",
      "Platform management (Facebook, Instagram, LinkedIn)",
      "Community engagement & comment handling",
      "Story + carousel creative design",
      "Hashtag & reach strategy",
    ],
    results: "Higher reach, consistent follower growth, improved brand trust.",
  },
  {
    Icon: Target,
    title: "Meta Ads",
    problem:
      "Wasted ad spend without a clear funnel strategy burns money and demoralises teams.",
    solution:
      "We design full-funnel Meta campaigns — from awareness to conversion — backed by audience research, creative testing, and ongoing optimization.",
    delivers: [
      "Audience research & targeting strategy",
      "High-converting ad creatives",
      "A/B testing frameworks",
      "Retargeting & lookalike campaigns",
      "Monthly performance reports",
    ],
    results: "Lower CPL, higher ROAS, and consistent qualified leads.",
  },
  {
    Icon: Search,
    title: "Google Ads",
    problem:
      "Low search visibility means your competitors are capturing your potential customers.",
    solution:
      "We deploy Search, Display, and YouTube campaigns with precise keyword targeting, compelling ad copy, and intelligent bid management.",
    delivers: [
      "Keyword research & strategy",
      "Search, Display & YouTube ad setup",
      "Compelling ad copy & extensions",
      "Bid management & budget optimization",
      "Conversion tracking & reporting",
    ],
    results: "Quality leads, improved CTR, lower cost per acquisition.",
  },
  {
    Icon: Palette,
    title: "Branding & Creative",
    problem:
      "No clear visual identity makes your brand forgettable and your marketing inconsistent.",
    solution:
      "We build complete brand systems — from logo to guidelines — ensuring every touchpoint reflects your brand's true value and personality.",
    delivers: [
      "Logo design & variations",
      "Color palette & typography selection",
      "Brand guidelines document",
      "Social media templates",
      "Marketing collateral design",
    ],
    results:
      "Recognizable, consistent brand that builds trust at every touchpoint.",
  },
  {
    Icon: Video,
    title: "Video & Reels",
    problem:
      "Low social media engagement? Video is the most consumed content format — and you're missing it.",
    solution:
      "Our short-form video strategy combines scripted storytelling with creative direction to make content that gets watched, shared, and remembered.",
    delivers: [
      "Scripted reels with hooks & CTAs",
      "Brand story & promo videos",
      "Campaign-specific video content",
      "Editing, captions & sound design",
      "Platform optimization (Reels, Shorts, Stories)",
    ],
    results: "3–5x more engagement, higher reach, stronger brand recall.",
  },
  {
    Icon: Globe,
    title: "Website Development",
    problem:
      "Poor online presence loses potential customers before they even learn about your brand.",
    solution:
      "We build performance-optimized websites that look great, load fast, and are designed from the ground up to convert visitors into customers.",
    delivers: [
      "UI/UX design & wireframing",
      "Responsive development (mobile-first)",
      "SEO foundation & on-page setup",
      "Contact forms & lead capture",
      "Speed & performance optimization",
    ],
    results:
      "Better conversions, improved credibility, more qualified inbound leads.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 border-b border-border last:border-0 ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Visual side */}
      <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
        <div className="bg-charcoal rounded-2xl p-10 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold/8 blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gold/5 blur-[40px]" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
              <service.Icon className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-display font-black text-2xl text-white mb-4">
              {service.title}
            </h3>

            {/* Results badge */}
            <div className="inline-flex items-start gap-2.5 bg-gold/10 border border-gold/20 rounded-xl px-4 py-3">
              <TrendingUp className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-gold/80 text-sm leading-snug">
                {service.results}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className={!isEven ? "lg:order-1" : ""}>
        <div className="mb-5">
          <span className="text-gold font-bold text-xs tracking-widest uppercase">
            Service {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mt-2 mb-3">
            {service.title}
          </h2>
        </div>

        <div className="mb-5">
          <h4 className="font-bold text-sm text-foreground/50 uppercase tracking-wider mb-2">
            The Problem
          </h4>
          <p className="text-foreground/70 text-base leading-relaxed">
            {service.problem}
          </p>
        </div>

        <div className="mb-5">
          <h4 className="font-bold text-sm text-foreground/50 uppercase tracking-wider mb-2">
            Our Solution
          </h4>
          <p className="text-foreground/70 text-base leading-relaxed">
            {service.solution}
          </p>
        </div>

        <div className="mb-7">
          <h4 className="font-bold text-sm text-foreground/50 uppercase tracking-wider mb-3">
            What We Deliver
          </h4>
          <ul className="space-y-2">
            {service.delivers.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-foreground/70 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-gold-foreground font-bold text-sm rounded-md hover:bg-gold-dark transition-all duration-200 shadow-gold group"
        >
          Let's Begin with a simple conversation
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        <div
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-4">
              What We Offer
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Services Built
              <br />
              <span className="text-gold">for Results</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              Performance-focused. Data-backed. Every service we offer is
              designed to solve a real business problem and deliver measurable
              outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            Not sure where to start?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Let's understand your business first, then recommend the right
            service mix.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-bold text-base rounded-md hover:bg-charcoal/80 transition-all duration-200 group"
          >
            Start a conversation
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
