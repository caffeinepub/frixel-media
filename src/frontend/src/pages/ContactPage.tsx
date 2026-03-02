import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContactMessage } from "../hooks/useQueries";

export default function ContactPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitContact, isPending } = useSubmitContactMessage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitContact(form);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error(
        "Something went wrong. Please try again or contact us via WhatsApp.",
      );
    }
  };

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
              Get In Touch
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Let's Start
              <br />
              <span className="text-gold">a Conversation</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              No pressure. No commitments. Just a simple conversation to
              understand your brand and explore how we can help you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white" ref={formRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <h2 className="font-display font-black text-3xl text-foreground mb-2">
                Send us a message
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                We typically respond within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gold/5 border border-gold/20 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    Message Received!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll review your message and
                    get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-semibold text-foreground"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9XXXXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      className="border-border focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-semibold text-foreground"
                    >
                      Your Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your brand and what you're looking to achieve..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="border-border focus:border-gold focus:ring-gold/20 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-6 bg-gold text-gold-foreground hover:bg-gold-dark font-bold text-base rounded-md shadow-gold transition-all duration-200"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display font-black text-3xl text-foreground mb-6">
                  Contact Details
                </h2>

                <div className="space-y-5">
                  <a
                    href="tel:+919144741759"
                    className="flex items-start gap-4 p-5 bg-muted rounded-xl hover:bg-gold/5 hover:border-gold/20 border border-transparent transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 bg-charcoal rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Phone & WhatsApp
                      </p>
                      <p className="font-bold text-foreground group-hover:text-gold transition-colors">
                        +91 9144741759
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact.frixelmedia@gmail.com"
                    className="flex items-start gap-4 p-5 bg-muted rounded-xl hover:bg-gold/5 hover:border-gold/20 border border-transparent transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 bg-charcoal rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="font-bold text-foreground text-sm group-hover:text-gold transition-colors break-all">
                        contact.frixelmedia@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-5 bg-muted rounded-xl border border-transparent">
                    <div className="w-11 h-11 bg-charcoal rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="font-bold text-foreground text-sm">
                        Panskura, Purba Medinipur
                      </p>
                      <p className="text-muted-foreground text-sm">
                        West Bengal, India
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Serving All of India · Remote Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="bg-charcoal rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/5 blur-[40px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center">
                      <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        WhatsApp Quick Chat
                      </p>
                      <p className="text-white/40 text-xs">
                        Usually replies within 1 hour
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919144741759"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold text-sm rounded-xl hover:bg-[#1fba5a] transition-colors"
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border h-52 bg-charcoal/5 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjNmE0MzciIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptLTQgMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-100" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-10 h-10 text-gold/40 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm font-semibold">
                    Panskura, West Bengal
                  </p>
                  <a
                    href="https://maps.google.com/?q=Panskura,+Purba+Medinipur,+West+Bengal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-xs font-semibold mt-1 hover:text-gold-dark transition-colors inline-flex items-center gap-1"
                  >
                    View on Google Maps
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
