import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { Principal } from "@icp-sdk/core/principal";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  EyeOff,
  Image,
  Loader2,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend.d";
import type {
  ContactMessage,
  ExtendedUserProfile,
  PortfolioItem,
  Testimonial,
} from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddTestimonial,
  useCreatePortfolioItem,
  useDeleteContactMessage,
  useDeletePortfolioItem,
  useGetAllContactMessages,
  useGetAllPortfolioItems,
  useGetAllUserProfiles,
  useGetCallerUserProfile,
  useGetCallerUserRole,
  useGetVisibleTestimonials,
  useModifyTestimonialVisibility,
  useSetUserRole,
} from "../hooks/useQueries";

type Tab = "messages" | "users" | "portfolio" | "testimonials" | "overview";

function roleLabel(role: UserRole | null | undefined): string {
  if (!role) return "Guest";
  if (role === UserRole.admin) return "Admin";
  if (role === UserRole.user) return "Team Member";
  return "Guest";
}

function roleBadgeVariant(role: UserRole | null | undefined) {
  if (role === UserRole.admin) return "default" as const;
  if (role === UserRole.user) return "secondary" as const;
  return "outline" as const;
}

// ======= Contact Messages Panel =======
function MessagesPanel() {
  const { data: messages, isLoading } = useGetAllContactMessages();
  const { mutateAsync: deleteMsg, isPending: deleting } =
    useDeleteContactMessage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMsg(id);
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-16">
        <MessageSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id.toString()}
          className="bg-white border border-border rounded-xl p-5 hover:border-gold/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <p className="font-bold text-foreground">{msg.name}</p>
                <Badge variant="outline" className="text-xs">
                  {msg.email}
                </Badge>
                {msg.phone && (
                  <span className="text-muted-foreground text-xs">
                    {msg.phone}
                  </span>
                )}
              </div>
              <p
                className={`text-foreground/70 text-sm mt-2 ${
                  expandedId === msg.id.toString() ? "" : "line-clamp-2"
                }`}
              >
                {msg.message}
              </p>
              {msg.message.length > 120 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(
                      expandedId === msg.id.toString()
                        ? null
                        : msg.id.toString(),
                    )
                  }
                  className="text-gold text-xs font-semibold mt-1 hover:text-gold-dark"
                >
                  {expandedId === msg.id.toString() ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-muted-foreground/50 text-xs hidden sm:block">
                {new Date(Number(msg.timestamp) / 1_000_000).toLocaleDateString(
                  "en-IN",
                )}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(msg.id)}
                disabled={deleting}
                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ======= Users Panel =======
function UsersPanel() {
  const { data: users, isLoading } = useGetAllUserProfiles();
  const { mutateAsync: setRole } = useSetUserRole();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSetRole = async (user: Principal, newRole: UserRole) => {
    try {
      await setRole({ user, newRole });
      toast.success("Role updated successfully.");
      setEditingId(null);
    } catch {
      toast.error("Failed to update role.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No registered users.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Principal</TableHead>
            <TableHead className="font-bold">Role</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.principal.toString()}>
              <TableCell className="font-semibold">
                {user.displayName || "—"}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs font-mono">
                {user.principal.toString().slice(0, 18)}...
              </TableCell>
              <TableCell>
                <Badge variant={roleBadgeVariant(user.userRole)}>
                  {roleLabel(user.userRole)}
                </Badge>
              </TableCell>
              <TableCell>
                {editingId === user.principal.toString() ? (
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={user.userRole}
                      onValueChange={(val) =>
                        handleSetRole(user.principal, val as UserRole)
                      }
                    >
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.admin}>Admin</SelectItem>
                        <SelectItem value={UserRole.user}>
                          Team Member
                        </SelectItem>
                        <SelectItem value={UserRole.guest}>Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingId(user.principal.toString())}
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-dark font-semibold"
                  >
                    <Edit3 className="w-3 h-3" />
                    Change Role
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ======= Portfolio Panel =======
function PortfolioPanel() {
  const { data: items, isLoading } = useGetAllPortfolioItems();
  const { mutateAsync: createItem, isPending: creating } =
    useCreatePortfolioItem();
  const { mutateAsync: deleteItem, isPending: deleting } =
    useDeletePortfolioItem();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category) {
      toast.error("Title and category are required.");
      return;
    }
    try {
      await createItem(form);
      toast.success("Portfolio item added.");
      setDialogOpen(false);
      setForm({ title: "", description: "", category: "", imageUrl: "" });
    } catch {
      toast.error("Failed to add item.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-gold-foreground hover:bg-gold-dark gap-2 shadow-gold">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="p-title">Title *</Label>
                <Input
                  id="p-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-category">Category *</Label>
                <Input
                  id="p-category"
                  value={form.category}
                  placeholder="e.g. Social Media, Branding"
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-desc">Description</Label>
                <Textarea
                  id="p-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-img">Image URL</Label>
                <Input
                  id="p-img"
                  value={form.imageUrl}
                  placeholder="https://..."
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                disabled={creating}
                className="w-full bg-gold text-gold-foreground hover:bg-gold-dark"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!items || items.length === 0 ? (
        <div className="text-center py-16">
          <Image className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No portfolio items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id.toString()}
              className="bg-white border border-border rounded-xl overflow-hidden group"
            >
              {item.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">
                      {item.title}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.category}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ======= Testimonials Panel =======
function TestimonialsPanel() {
  const { data: testimonials, isLoading } = useGetVisibleTestimonials();
  const { mutateAsync: modifyVisibility, isPending: toggling } =
    useModifyTestimonialVisibility();
  const { mutateAsync: addTestimonial, isPending: adding } =
    useAddTestimonial();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    company: "",
    message: "",
    rating: "5",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.message) {
      toast.error("Name and message are required.");
      return;
    }
    try {
      await addTestimonial({
        clientName: form.clientName,
        company: form.company,
        message: form.message,
        rating: BigInt(form.rating),
        isVisible: true,
      });
      toast.success("Testimonial added.");
      setDialogOpen(false);
      setForm({ clientName: "", company: "", message: "", rating: "5" });
    } catch {
      toast.error("Failed to add testimonial.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-gold-foreground hover:bg-gold-dark gap-2 shadow-gold">
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="t-name">Client Name *</Label>
                <Input
                  id="t-name"
                  value={form.clientName}
                  onChange={(e) =>
                    setForm({ ...form, clientName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-company">Company</Label>
                <Input
                  id="t-company"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-msg">Message *</Label>
                <Textarea
                  id="t-msg"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-rating">Rating</Label>
                <Select
                  value={form.rating}
                  onValueChange={(val) => setForm({ ...form, rating: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <SelectItem key={r} value={String(r)}>
                        {"★".repeat(r)}
                        {"☆".repeat(5 - r)} ({r}/5)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                disabled={adding}
                className="w-full bg-gold text-gold-foreground hover:bg-gold-dark"
              >
                {adding ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Add Testimonial
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!testimonials || testimonials.length === 0 ? (
        <div className="text-center py-16">
          <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No testimonials yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.id.toString()}
              className="bg-white border border-border rounded-xl p-5 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{t.clientName}</p>
                <p className="text-muted-foreground text-xs">{t.company}</p>
                <p className="text-foreground/70 text-sm mt-2">{t.message}</p>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: Number(t.rating) }, (_, i) => i).map(
                    (i) => (
                      <Star
                        key={`star-${t.id.toString()}-${i}`}
                        className="w-3.5 h-3.5 text-gold fill-gold"
                      />
                    ),
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  modifyVisibility({ id: t.id, isVisible: !t.isVisible }).catch(
                    () => toast.error("Failed to update."),
                  )
                }
                disabled={toggling}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                title={t.isVisible ? "Hide testimonial" : "Show testimonial"}
              >
                {t.isVisible ? (
                  <Eye className="w-4 h-4 text-gold" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ======= Overview Panel =======
function OverviewPanel({ role }: { role: UserRole | null | undefined }) {
  const { data: messages } = useGetAllContactMessages();
  const { data: portfolio } = useGetAllPortfolioItems();
  const { data: testimonials } = useGetVisibleTestimonials();

  const stats = [
    {
      icon: MessageSquare,
      label: "Contact Messages",
      value: messages?.length ?? 0,
      visible: role === UserRole.admin,
    },
    {
      icon: Image,
      label: "Portfolio Items",
      value: portfolio?.length ?? 0,
      visible: true,
    },
    {
      icon: Star,
      label: "Testimonials",
      value: testimonials?.length ?? 0,
      visible: true,
    },
  ].filter((s) => s.visible);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {stat.label}
                </p>
                <p className="font-display font-black text-3xl text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!role || role === UserRole.guest) && (
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 text-center">
          <Clock className="w-10 h-10 text-gold/40 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-foreground mb-2">
            Awaiting Role Assignment
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Your account has been created. An admin will assign your role
            shortly to grant access to additional dashboard features.
          </p>
        </div>
      )}
    </div>
  );
}

const TABS: {
  id: Tab;
  label: string;
  icon: typeof MessageSquare;
  roles: UserRole[];
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Settings,
    roles: [UserRole.admin, UserRole.user, UserRole.guest],
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    roles: [UserRole.admin],
  },
  { id: "users", label: "Users", icon: Users, roles: [UserRole.admin] },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: Image,
    roles: [UserRole.admin, UserRole.user],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: Star,
    roles: [UserRole.admin, UserRole.user],
  },
];

export default function DashboardPage() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userRole, isLoading: roleLoading } = useGetCallerUserRole();
  const { data: userProfile } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!isInitializing && !identity) {
      navigate({ to: "/login" });
    }
  }, [isInitializing, identity, navigate]);

  if (isInitializing || roleLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!identity) return null;

  const role = userRole ?? UserRole.guest;
  const visibleTabs = TABS.filter((t) => t.roles.includes(role));

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-secondary/20 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-charcoal rounded-2xl p-7 mb-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
              {role === UserRole.admin ? (
                <ShieldCheck className="w-6 h-6 text-gold" />
              ) : (
                <User className="w-6 h-6 text-gold" />
              )}
            </div>
            <div>
              <p className="text-white font-display font-bold text-lg">
                {userProfile?.displayName || "Dashboard"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge className="text-xs bg-gold/20 text-gold border-0">
                  {roleLabel(role)}
                </Badge>
                <span className="text-white/40 text-xs font-mono">
                  {identity.getPrincipal().toString().slice(0, 16)}...
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              clear();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-7">
          {/* Sidebar */}
          <nav className="lg:w-56 flex-shrink-0">
            <div className="bg-white border border-border rounded-2xl p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-charcoal text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 ${activeTab === tab.id ? "text-gold" : ""}`}
                  />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-border rounded-2xl p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-display font-black text-xl text-foreground mb-6 capitalize">
                    {activeTab}
                  </h2>

                  {activeTab === "overview" && <OverviewPanel role={role} />}
                  {activeTab === "messages" && role === UserRole.admin && (
                    <MessagesPanel />
                  )}
                  {activeTab === "users" && role === UserRole.admin && (
                    <UsersPanel />
                  )}
                  {activeTab === "portfolio" && <PortfolioPanel />}
                  {activeTab === "testimonials" && <TestimonialsPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
