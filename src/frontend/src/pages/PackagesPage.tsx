import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Crown,
  Rocket,
  Star,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface PackageData {
  name: string;
  subtitle: string;
  tier: string;
  price: string;
  icon: typeof Crown;
  featured?: boolean;
  enterprise?: boolean;
  scope: {
    section: string;
    items: string[];
  }[];
  complimentary: string[];
  notIncluded?: string[];
  adsBudget: string;
  bestFor?: string[];
  color: "gold" | "charcoal" | "white";
}

const PACKAGES: PackageData[] = [
  {
    name: "Mini Nova",
    subtitle: "by Frixel Media",
    tier: "Starter",
    price: "₹5,500",
    icon: Star,
    color: "white",
    scope: [
      {
        section: "Social Media Content",
        items: [
          "Weekly 2 static posts (Monthly: 7–8)",
          "Platforms: Facebook & Instagram",
          "Caption support with every post",
          "Occasional festival/wish posts",
        ],
      },
      {
        section: "Reels & Visibility",
        items: ["1 reel per month (visibility-focused)"],
      },
      {
        section: "Social Media Marketing",
        items: [
          "Weekly 1 marketing activity",
          "Lead gen or post boost (strategy-based)",
          "Entry-level paid visibility support",
        ],
      },
      {
        section: "Strategy & Support",
        items: ["1 business call per month"],
      },
    ],
    complimentary: ["Google My Business Management (Posting + Optimisation)"],
    notIncluded: [
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Hand-held strategy support",
    ],
    adsBudget:
      "Ad spend up to ₹8,500/month. Exceeding this requires upgrade or additional charges.",
    bestFor: [
      "New startups",
      "Local businesses",
      "Small brands starting digital presence",
    ],
  },
  {
    name: "Catalyst",
    subtitle: "by Frixel Media",
    tier: "Launch Level",
    price: "₹13,500",
    icon: Rocket,
    color: "white",
    scope: [
      {
        section: "Social Media Content",
        items: [
          "Weekly 3 static posts (Monthly: 12)",
          "Platforms: Facebook & Instagram",
          "Caption + hashtag support",
          "Festival/campaign creatives",
        ],
      },
      {
        section: "Reels & Videos",
        items: ["Up to 4 reels/month", "Up to 2 basic promo videos/month"],
      },
      {
        section: "Social Media Marketing",
        items: [
          "Weekly 2 paid marketing activities",
          "Lead generation / boost / awareness",
        ],
      },
      {
        section: "Campaign & Strategy",
        items: [
          "Campaign concepts (offers, festivals, launches)",
          "Basic campaign planning",
          "2 business calls/month",
        ],
      },
    ],
    complimentary: ["Google My Business Management (Posting + Optimisation)"],
    notIncluded: [
      "Brand consistency audit",
      "Advanced analytics",
      "Dedicated account manager",
    ],
    adsBudget:
      "Ad spend up to ₹18,500/month. Exceeding this → upgrade or additional charges.",
  },
  {
    name: "Ascend Pro",
    subtitle: "by Frixel Media",
    tier: "Growth",
    price: "₹22,500",
    icon: TrendingUp,
    color: "gold",
    featured: true,
    scope: [
      {
        section: "Social Media Content",
        items: [
          "Weekly 4 static/carousel posts (Monthly: 16)",
          "Platforms: Facebook, Instagram (LinkedIn optional)",
          "Advanced captioning & brand consistency",
        ],
      },
      {
        section: "Reels",
        items: ["Up to 5 reels/month"],
      },
      {
        section: "Performance Marketing",
        items: [
          "Weekly 3 paid marketing activities",
          "Lead gen + engagement + remarketing support",
        ],
      },
      {
        section: "Growth & Strategy",
        items: [
          "Content calendar + growth planning",
          "Strategy support provided",
          "2–3 strategy calls/month",
        ],
      },
    ],
    complimentary: ["Google My Business Management"],
    notIncluded: [
      "Dedicated account manager",
      "Enterprise-level analytics",
      "Full competitor intelligence",
    ],
    adsBudget:
      "Ad spend up to ₹29,500/month. Higher spend → Elite Nexus or custom pricing.",
  },
  {
    name: "Elite Nexus",
    subtitle: "by Frixel Media",
    tier: "Premium",
    price: "₹55,000",
    icon: Crown,
    color: "charcoal",
    scope: [
      {
        section: "Social Media Content",
        items: [
          "Weekly 5 static/carousel posts (Monthly: 20)",
          "Platforms: Facebook, Instagram & LinkedIn",
          "Advanced captioning, copy & brand storytelling",
        ],
      },
      {
        section: "Reels & Video",
        items: [
          "Up to 8 reels/month",
          "Up to 4 videos/month (promo, brand story, campaign)",
        ],
      },
      {
        section: "Performance Marketing",
        items: [
          "Weekly 4 paid marketing activities",
          "Meta Ads + Google Ads management support",
          "Lead gen, conversion & remarketing",
        ],
      },
      {
        section: "Analytics & Strategy",
        items: [
          "Advanced performance analytics",
          "Monthly growth & performance report",
          "Weekly strategy calls",
          "Priority communication support",
        ],
      },
    ],
    complimentary: [
      "Google My Business Management",
      "Brand audit & positioning review",
    ],
    notIncluded: [
      "Enterprise-level market research",
      "Dedicated full-time account team",
    ],
    adsBudget:
      "Ad spend up to ₹69,700/month. Beyond this → Apex Hub or custom pricing.",
  },
  {
    name: "Apex Hub",
    subtitle: "by Frixel Media",
    tier: "Enterprise",
    price: "₹75,000",
    icon: Crown,
    color: "charcoal",
    enterprise: true,
    scope: [
      {
        section: "Full Digital Brand Management",
        items: [
          "End-to-end brand presence management",
          "Cross-platform content & campaign control",
        ],
      },
      {
        section: "Content & Media",
        items: [
          "Unlimited static creatives (fair-use policy)",
          "Up to 12 reels per month",
          "Up to 6 high-quality videos per month",
        ],
      },
      {
        section: "Performance Marketing",
        items: [
          "Meta + Google Ads (full funnel)",
          "Conversion-focused campaigns",
          "Retargeting & scaling strategy",
        ],
      },
      {
        section: "Strategy, Analytics & Control",
        items: [
          "Deep analytics & insight reports",
          "Funnel & conversion optimisation",
          "Market & competitor analysis",
          "Weekly reviews + roadmap planning",
        ],
      },
      {
        section: "Account Management",
        items: ["Dedicated account manager", "Priority execution & support"],
      },
    ],
    complimentary: [
      "Google My Business Management",
      "Brand growth blueprint",
      "Quarterly strategic roadmap",
    ],
    adsBudget:
      "No upper cap on ad spend. Custom performance & scaling strategy applied.",
    bestFor: [
      "Established brands",
      "High-budget advertisers",
      "Businesses needing full digital command",
    ],
  },
];

function PackageCard({ pkg, index }: { pkg: PackageData; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isGold = pkg.color === "gold";
  const isCharcoal = pkg.color === "charcoal";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-2xl border overflow-hidden ${
        isCharcoal
          ? "bg-charcoal border-gold/30 text-white"
          : isGold
            ? "bg-white border-gold shadow-gold-lg"
            : "bg-white border-border"
      } ${pkg.enterprise ? "ring-2 ring-gold shadow-gold-lg" : ""}`}
    >
      {/* Top badge */}
      {(pkg.featured || pkg.enterprise) && (
        <div className="bg-gold px-5 py-2 text-center">
          <span className="text-gold-foreground text-xs font-black tracking-widest uppercase">
            {pkg.enterprise ? "⭐ Flagship Enterprise Package" : "Most Popular"}
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span
              className={`text-xs font-black tracking-widest uppercase ${
                isCharcoal ? "text-gold" : "text-gold"
              }`}
            >
              {pkg.tier}
            </span>
            <h3
              className={`font-display font-black text-2xl mt-1 ${
                isCharcoal ? "text-white" : "text-foreground"
              }`}
            >
              {pkg.name}
            </h3>
            <p
              className={`text-xs mt-0.5 ${isCharcoal ? "text-white/40" : "text-muted-foreground"}`}
            >
              {pkg.subtitle}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isCharcoal ? "bg-gold/15" : "bg-gold/10"
            }`}
          >
            <pkg.icon
              className={`w-6 h-6 ${isCharcoal ? "text-gold" : "text-gold"}`}
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-7 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display font-black text-4xl ${
                isCharcoal ? "text-gold" : "text-foreground"
              }`}
            >
              {pkg.price}
            </span>
            <span
              className={`text-sm ${isCharcoal ? "text-white/40" : "text-muted-foreground"}`}
            >
              / month
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${isCharcoal ? "text-white/40" : "text-muted-foreground"}`}
          >
            Service Duration: 1 Month
          </p>
        </div>

        {/* Scope */}
        <div className="space-y-5 mb-6">
          {pkg.scope.map((section) => (
            <div key={section.section}>
              <h4
                className={`text-xs font-black uppercase tracking-wider mb-2.5 ${
                  isCharcoal ? "text-gold/70" : "text-gold"
                }`}
              >
                {section.section}
              </h4>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        isCharcoal ? "text-gold" : "text-gold"
                      }`}
                    />
                    <span
                      className={`text-xs leading-snug ${
                        isCharcoal ? "text-white/65" : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Complimentary */}
        <div
          className={`rounded-xl p-4 mb-5 ${
            isCharcoal
              ? "bg-white/5 border border-white/10"
              : "bg-gold/5 border border-gold/15"
          }`}
        >
          <h4
            className={`text-xs font-black uppercase tracking-wider mb-2 ${
              isCharcoal ? "text-gold/70" : "text-gold"
            }`}
          >
            🎁 Complimentary
          </h4>
          <ul className="space-y-1">
            {pkg.complimentary.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <CheckCircle2
                  className={`w-3 h-3 flex-shrink-0 mt-0.5 ${isCharcoal ? "text-gold" : "text-gold"}`}
                />
                <span
                  className={`text-xs ${isCharcoal ? "text-white/60" : "text-muted-foreground"}`}
                >
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        {pkg.notIncluded && pkg.notIncluded.length > 0 && (
          <div className="mb-5">
            <h4
              className={`text-xs font-black uppercase tracking-wider mb-2 ${
                isCharcoal ? "text-white/30" : "text-muted-foreground/60"
              }`}
            >
              ❌ Not Included
            </h4>
            <ul className="space-y-1">
              {pkg.notIncluded.map((n) => (
                <li key={n} className="flex items-start gap-2">
                  <XCircle
                    className={`w-3 h-3 flex-shrink-0 mt-0.5 ${
                      isCharcoal ? "text-white/25" : "text-muted-foreground/40"
                    }`}
                  />
                  <span
                    className={`text-xs ${isCharcoal ? "text-white/30" : "text-muted-foreground/50"}`}
                  >
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ads Budget */}
        <div
          className={`rounded-lg p-3 mb-6 ${
            isCharcoal ? "bg-white/5" : "bg-muted"
          }`}
        >
          <p
            className={`text-xs font-bold mb-0.5 ${isCharcoal ? "text-white/50" : "text-muted-foreground"}`}
          >
            ⚠️ Ads Budget Policy
          </p>
          <p
            className={`text-xs ${isCharcoal ? "text-white/40" : "text-muted-foreground/70"}`}
          >
            {pkg.adsBudget}
          </p>
        </div>

        {/* Best For */}
        {pkg.bestFor && (
          <div className="mb-6">
            <h4
              className={`text-xs font-black uppercase tracking-wider mb-2 ${
                isCharcoal ? "text-gold/70" : "text-gold"
              }`}
            >
              🎯 Best Fit For
            </h4>
            <ul className="flex flex-wrap gap-2">
              {pkg.bestFor.map((b) => (
                <li
                  key={b}
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    isCharcoal
                      ? "bg-gold/10 text-gold/80"
                      : "bg-gold/10 text-gold-dark"
                  }`}
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <Link
          to="/contact"
          className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
            isCharcoal
              ? "bg-gold text-gold-foreground hover:bg-gold-dark"
              : isGold
                ? "bg-charcoal text-white hover:bg-charcoal/80"
                : "bg-charcoal text-white hover:bg-charcoal/80"
          }`}
        >
          Let's Begin with a simple conversation
        </Link>
      </div>
    </motion.div>
  );
}

function ClosingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[80px]" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-bold text-sm tracking-widest uppercase block mb-6">
              A Thought Before You Decide
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-8">
              Every brand grows differently.
            </h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed mb-10 text-left">
              <p>
                Some grow fast, some grow steady — but the ones that last, grow
                with <em className="text-white/80 not-italic">clarity</em>.
              </p>
              <p>
                At Frixel Media, we don't believe in shortcuts. We believe in
                understanding the business first, aligning digital decisions
                with long-term intent, and building systems that evolve with
                time.
              </p>
              <p>
                Digital presence is not just about being visible. It's about
                being relevant, consistent, and prepared for scale.
              </p>
              <p>
                We work best with brands that value direction over noise, and
                decisions over trends.
              </p>
              <p className="text-white/80">
                Let's begin with a simple conversation.{" "}
                <span className="text-white">
                  No pressure. No commitments. Just clarity.
                </span>
              </p>
              <p>When you're ready to think long-term, we're here.</p>
            </div>

            <div className="text-white/40 italic text-sm mb-10">
              With best wishes,
              <br />
              <span className="text-gold font-semibold not-italic">
                — Frixel Media Team
              </span>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gold text-gold-foreground font-black text-base rounded-xl hover:bg-gold-dark transition-all duration-200 shadow-gold-lg group"
            >
              Let's Begin
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function PackagesPage() {
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
              Pricing & Packages
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Plans Built for
              <br />
              <span className="text-gold">Every Stage</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
              From startups finding their footing to enterprises commanding
              their market — we have a plan for where you are and where you're
              going.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ClosingSection />
    </>
  );
}
