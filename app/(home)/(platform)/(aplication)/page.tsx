import Link from "next/link";
import HeroIllustration from "@/components/hero-illustration";
import WorkspaceIllustration from "@/components/workspace-illustration";

import {
  LayoutDashboard,
  Users,
  CheckSquare,
  CalendarClock,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";


// ─── Feature data ──────────────────────────────────────────────────────────
const features = [
  {
    icon: LayoutDashboard,
    title: "Visual Kanban Boards",
    description:
      "Organise your workflow with intuitive drag-and-drop boards. See every task, every status, at a glance.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite teammates, assign tasks, and collaborate in real-time — regardless of where your team is located.",
  },
  {
    icon: CheckSquare,
    title: "Granular Task Tracking",
    description:
      "Break projects into actionable tasks with priorities, labels, and detailed progress tracking.",
  },
  {
    icon: CalendarClock,
    title: "Deadline Management",
    description:
      "Set due dates, receive reminders, and keep every project on schedule without missing a beat.",
  },
  {
    icon: Building2,
    title: "Organisation Workspaces",
    description:
      "Create dedicated workspaces per organisation or department. Keep everything structured and separated.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with role-based access control, so the right people see the right things.",
  },
];

// ─── How it works data ──────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Create Your Workspace",
    description:
      "Sign up in seconds and set up your organisation workspace. Invite your team with a single link.",
  },
  {
    number: "02",
    icon: Target,
    title: "Build Your Boards",
    description:
      "Create boards for each project, define your workflow stages, and add your first tasks.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Deliver with Clarity",
    description:
      "Track progress in real-time, hit your deadlines, and deliver exceptional work consistently.",
  },
];

// ─── Stats data ─────────────────────────────────────────────────────────────
const stats = [
  { value: "Simple", label: "Set up your first board in minutes, not hours" },
  { value: "Clear", label: "Every task, every owner, every status — visible to the whole team" },
  { value: "Focused", label: "Only the features your team actually needs, nothing more" },
  { value: "∞", label: "Boards, cards, and tasks — always free to grow" },
];

// ════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  return (
    <div className="bg-cream text-charcoal font-sans">

      {/* ── HERO ────────────────────────────────────────────────────────── */}

      <section className="relative overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #C9923E 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text column */}
            <div className="max-w-xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-navy mb-6 animate-fade-up">
                Manage Projects with{" "}
                <span className="text-gold italic">Clarity</span>{" "}
                &amp; Confidence
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-8 max-w-md animate-fade-up" style={{ animationDelay: "150ms" }}>
                PAW brings your tasks, teammates, and tools together in one
                elegant workspace — so your team can focus on doing great work
                instead of chasing updates.
              </p>

              <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "280ms" }}>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 bg-gold text-white font-medium px-6 py-3 rounded hover:bg-gold-light transition-all duration-200 shadow-sm"
                >
                  Get Started Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 text-navy font-medium px-6 py-3 rounded border border-navy/30 hover:border-navy hover:bg-navy/5 transition-all duration-200"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Illustration column */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in">
              <div className="relative w-full animate-float">
                {/* Glow behind illustration */}
                <div className="absolute -inset-4 bg-gold/5 rounded-2xl blur-3xl" />
                <div className="relative border border-border-classic rounded-2xl shadow-xl overflow-hidden bg-cream-dark">
                  <HeroIllustration />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
      <div className="border-t border-border-classic" />

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              What PAW Offers
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
              Everything your team needs, nothing it doesn&apos;t
            </h2>
            <p className="text-muted leading-relaxed">
              A carefully curated set of features designed to remove friction
              from your workflow — so your team can work with intention.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-white border border-border-classic rounded-xl p-6 hover:border-gold/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-pale flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={20} strokeWidth={1.5} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-navy mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-navy relative overflow-hidden"
      >
        {/* Decorative navy texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #E8B96A 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              Getting Started
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-4">
              Up and running in three steps
            </h2>
            <p className="text-cream/60 leading-relaxed">
              PAW is designed to be simple from day one. Your team will be
              collaborating within minutes, not hours.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gold/20" />

            {steps.map(({ number, icon: Icon, title, description }, idx) => (
              <div
                key={number}
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Number + icon bubble */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-navy-light border border-gold/40 flex items-center justify-center mb-2 shadow-lg">
                    <Icon size={24} strokeWidth={1.5} className="text-gold" />
                  </div>
                  <span className="font-serif text-5xl font-bold text-gold/60 leading-none -mt-2 select-none drop-shadow-[0_1px_2px_rgba(201,146,62,0.4)]">
                    {number}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-cream mb-3">
                  {title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── STATS / SOCIAL PROOF ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              Why It Matters
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
              Built for teams that take their work seriously
            </h2>
            <p className="text-muted leading-relaxed">
              PAW is designed around one principle: your time is valuable. Every
              feature exists to help your team move faster, stay aligned, and
              deliver better outcomes.
            </p>
          </div>

          {/* Value proposition cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map(({ value, label }) => (
              <div
                key={value}
                className="bg-white border border-border-classic rounded-xl p-6 flex flex-col gap-3 border-l-4 border-l-gold"
              >
                <div className="font-serif text-2xl font-bold text-gold leading-tight">
                  {value}
                </div>
                <p className="text-sm text-muted leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Descriptive prose block */}
          <div className="grid md:grid-cols-3 gap-8 items-center border border-border-classic rounded-2xl p-8 md:p-10 bg-white overflow-hidden">
            {/* Illustration */}
            <div className="md:col-span-1 flex justify-center animate-float-slow">
              <div className="w-full max-w-xs">
                <WorkspaceIllustration />
              </div>
            </div>

            {/* Prose */}
            <div className="md:col-span-1">
              <h3 className="font-serif text-2xl font-bold text-navy mb-4">
                A workspace that grows with your team
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                Whether you&apos;re a solo operator or a cross-functional team
                of fifty, PAW scales effortlessly. Start with a single board
                and expand into a full organisation workspace with multiple
                projects, departments, and access controls.
              </p>
              <p className="text-muted leading-relaxed">
                No steep learning curve. No bloated features you&apos;ll never
                use. Just a clean, focused tool that respects your team&apos;s
                intelligence.
              </p>
            </div>

            {/* Bullet points */}
            <div className="md:col-span-1 space-y-4">
              {[
                "Unlimited boards and cards on every plan",
                "Role-based access — managers, members, and guests",
                "Real-time updates with no page refresh needed",
                "Works seamlessly across desktop and mobile",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-pale border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                  <p className="text-sm text-charcoal leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA CLOSING ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Decorative ornament */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-border-classic" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-border-classic opacity-30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-border-classic opacity-20" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            Ready to begin?
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">
            Start your free workspace{" "}
            <span className="text-gold italic">today.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join teams that have chosen clarity over chaos. Set up your first
            board in under two minutes — no credit card, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-gold text-white font-medium px-8 py-3.5 rounded hover:bg-gold-light transition-all duration-200 shadow-sm text-base"
            >
              Create Free Account
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-navy font-medium px-8 py-3.5 rounded border border-navy/30 hover:border-navy hover:bg-navy/5 transition-all duration-200 text-base"
            >
              Sign In
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted/60">
            Already used by teams across Indonesia &amp; Southeast Asia
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-navy text-cream/70">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-cream/10">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="font-serif text-xl font-bold text-cream mb-3">
                PAW
              </div>
              <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
                Project Assistant Web — a modern workspace for teams that value
                clarity, structure, and momentum.
              </p>
            </div>

            {/* Product links */}
            <div>
              <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm">
                {["Features", "How It Works", "Pricing", "Changelog"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="hover:text-cream transition-colors duration-150"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-cream transition-colors duration-150"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="hover:text-cream transition-colors duration-150"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-xs text-cream/40">
              &copy; {new Date().getFullYear()} PAW — Project Assistant Web.
              All rights reserved.
            </p>
            <p className="text-xs text-cream/40">
              Crafted with care for productive teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

