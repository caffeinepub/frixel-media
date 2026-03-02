import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const isLoggedIn = !!identity;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on path change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-charcoal rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/assets/generated/frixel-logo-mark-transparent.png"
                alt="Frixel Media"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <span className="text-foreground font-display font-extrabold text-lg leading-none block">
                Frixel
              </span>
              <span className="text-gold font-body text-xs font-semibold tracking-widest uppercase leading-none">
                Media
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-md group ${
                    isActive
                      ? "text-gold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full"
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA / Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors px-3 py-2"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors px-3 py-2"
              >
                Login
              </Link>
            )}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gold text-gold-foreground text-sm font-bold rounded-md hover:bg-gold-dark transition-all duration-200 shadow-gold hover:shadow-gold-lg"
            >
              Get Started
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-gold bg-gold/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors rounded-md hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={clear}
                      className="px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors rounded-md hover:bg-muted text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors rounded-md hover:bg-muted"
                  >
                    Login
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-1.5 px-5 py-3 bg-gold text-gold-foreground text-sm font-bold rounded-md hover:bg-gold-dark transition-all duration-200 mt-1"
                >
                  Get Free Strategy Call
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gold rounded flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/generated/frixel-logo-mark-transparent.png"
                  alt="Frixel Media"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <span className="text-white font-display font-extrabold text-lg leading-none block">
                  Frixel
                </span>
                <span className="text-gold font-body text-xs font-semibold tracking-widest uppercase leading-none">
                  Media
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Turning Brands Into Experiences. Performance-driven digital
              marketing for brands that want real, measurable results.
            </p>
            <p className="text-white/40 text-xs font-medium mb-5">
              A Unit of Frixel International
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiLinkedin, label: "LinkedIn" },
                { Icon: SiX, label: "X" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://wa.me/919144741759"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded bg-white/5 hover:bg-gold/20 flex items-center justify-center text-white/50 hover:text-gold transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[...NAV_LINKS, { label: "Dashboard", href: "/dashboard" }].map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/50 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gold/40 group-hover:text-gold transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </p>
                <a
                  href="tel:+919144741759"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  +91 9144741759
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href="mailto:contact.frixelmedia@gmail.com"
                  className="text-white/70 hover:text-gold text-sm transition-colors break-all"
                >
                  contact.frixelmedia@gmail.com
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-white/70 text-sm">
                  Panskura, Purba Medinipur,
                  <br />
                  West Bengal, India
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} Frixel Media. All Rights Reserved. A Unit of Frixel
            International.
          </p>
          <p className="text-white/30 text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919144741759"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </motion.a>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
