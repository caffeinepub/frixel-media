import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import type { PortfolioItem } from "../backend.d";
import { useGetAllPortfolioItems } from "../hooks/useQueries";

const PLACEHOLDER_ITEMS: PortfolioItem[] = [
  {
    id: 1n,
    title: "TechVision India Social Campaign",
    description:
      "Complete social media overhaul — content strategy, weekly posting, and community management for a tech startup.",
    category: "Social Media",
    imageUrl: "/assets/generated/portfolio-social.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
  {
    id: 2n,
    title: "StyleHouse Meta Ads Campaign",
    description:
      "Full-funnel Meta Ads campaign for a fashion brand — drove 3.2x ROAS in 60 days with conversion-focused creative.",
    category: "Meta Ads",
    imageUrl: "/assets/generated/portfolio-ads.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
  {
    id: 3n,
    title: "GreenLeaf Organics Brand Identity",
    description:
      "End-to-end brand system — logo, visual identity, brand guidelines, and launch creative suite.",
    category: "Branding",
    imageUrl: "/assets/generated/portfolio-branding.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
  {
    id: 4n,
    title: "FreshMart Promo Reels Series",
    description:
      "12-reel campaign series for a retail brand's seasonal sale, achieving 5x organic reach benchmark.",
    category: "Video & Reels",
    imageUrl: "/assets/generated/portfolio-video.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
  {
    id: 5n,
    title: "MediCare Connect Website",
    description:
      "Performance-optimized healthcare website with lead capture, SEO foundation, and mobile-first design.",
    category: "Website",
    imageUrl: "/assets/generated/portfolio-web.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
  {
    id: 6n,
    title: "AutoDrive Google Ads Campaign",
    description:
      "Google Search + Display campaigns for an auto dealership. 2.1x improvement in lead quality in 45 days.",
    category: "Google Ads",
    imageUrl: "/assets/generated/portfolio-google.dim_600x400.jpg",
    createdAt: BigInt(Date.now()),
  },
];

const CATEGORIES = [
  "All",
  "Social Media",
  "Meta Ads",
  "Google Ads",
  "Branding",
  "Video & Reels",
  "Website",
];

function PortfolioCard({
  item,
  index,
}: { item: PortfolioItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-xl overflow-hidden bg-charcoal cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.2 0 0) 0%, oklch(0.35 0.05 85) 100%)",
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-charcoal/90 flex flex-col justify-end p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <span className="text-gold text-xs font-bold tracking-widest uppercase block mb-2">
                {item.category}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-1.5 text-gold text-sm font-semibold">
                <ExternalLink className="w-4 h-4" />
                View Case Study
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-visible category badge */}
      <div className="absolute top-3 left-3">
        <span className="bg-charcoal/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: portfolioItems } = useGetAllPortfolioItems();
  const items =
    portfolioItems && portfolioItems.length > 0
      ? portfolioItems
      : PLACEHOLDER_ITEMS;

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Get only categories that exist in items
  const existingCategories = CATEGORIES.filter(
    (cat) => cat === "All" || items.some((item) => item.category === cat),
  );

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
              Our Work
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Results We've
              <br />
              <span className="text-gold">Delivered</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              A look at the brands we've grown, campaigns we've run, and
              identities we've built — each with a clear result behind it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-12">
            {existingCategories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-charcoal text-white shadow-card"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id.toString()} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
            Want results like these?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Let's build your next success story together.
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
