import {
  AlarmClock,
  Mail,
  MapPin,
  Phone,
  ThumbsUp,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import type { AboutMetric, AboutPageModel, SkillMetric } from "@/models/ecommerce";

type AboutViewModel = AboutPageModel & {
  pageTitle: string;
  cartTotal: string;
};

type Props = {
  viewModel: AboutViewModel;
};

export function AboutPageView({ viewModel }: Props) {
  return (
    <main className="min-h-screen bg-white text-[#252a31]">
      <Breadcrumb pageTitle={viewModel.pageTitle} />
      <IntroSection />
      <MetricsSection metrics={viewModel.metrics} />
      <SkillsSection skills={viewModel.skills} />
      <Newsletter />
      <BrandStrip brands={viewModel.brandMarks} />
      <Footer instagramImages={viewModel.instagramImages} />
    </main>
  );
}

function Breadcrumb({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="border-y border-[#ededed] bg-[#f7f7f7]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-[12px] text-[#7d8389] sm:px-6">
        Home <span className="mx-2">&gt;</span>
        <span className="text-[#a99734]">{pageTitle}</span>
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f1ec]">
        <Image
          alt="Commerce team planning Mugnee storefront experience"
          className="object-cover"
          fill
          loading="eager"
          sizes="(min-width: 1024px) 560px, 100vw"
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80"
        />
      </div>
      <div className="mx-auto max-w-xl text-center lg:text-left">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#aa9737]">Our Story</p>
        <h1 className="mt-3 font-serif text-4xl font-bold uppercase leading-tight text-[#252a31] sm:text-5xl">
          We Create Better Commerce Experiences.
        </h1>
        <p className="mt-6 text-sm leading-8 text-[#68717a]">
          Mugnee Multiple Limited curates beauty, wellness, and lifestyle products with a careful balance of
          trust, taste, and operational clarity. Our storefronts are built to help customers discover products
          quickly, compare confidently, and checkout without friction.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a
            className="inline-flex h-11 items-center justify-center border border-[#aa9737] bg-[#aa9737] px-7 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#8d7b28]"
            href="/shop"
          >
            View Work
          </a>
          <a
            className="inline-flex h-11 items-center justify-center border border-[#cfcfcf] px-7 text-[12px] font-bold uppercase tracking-[0.14em] text-[#252a31] transition hover:border-[#aa9737] hover:text-[#aa9737]"
            href="/blog"
          >
            Read Journal
          </a>
        </div>
      </div>
    </section>
  );
}

function MetricsSection({ metrics }: { metrics: AboutMetric[] }) {
  const icons = {
    customers: Users,
    awards: Trophy,
    hours: AlarmClock,
    projects: ThumbsUp,
  };

  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-[#e9e9e9] bg-[#f5f5f5] sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = icons[metric.icon];
          return (
            <article
              key={metric.label}
              className={`flex min-h-40 items-center justify-center gap-5 px-7 py-8 ${
                index % 2 === 1 ? "bg-[#eeeeee]" : "bg-[#f7f7f7]"
              }`}
            >
              <Icon className="shrink-0 text-[#6a6a6a]" size={42} />
              <div>
                <p className="font-serif text-4xl font-bold text-[#353535]">{metric.value}</p>
                <h2 className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#4d4d4d]">{metric.label}</h2>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SkillsSection({ skills }: { skills: SkillMetric[] }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#aa9737]">What We Do Well</p>
        <h2 className="mt-3 font-serif text-3xl font-bold uppercase text-[#252a31]">We Have Skills To Show</h2>
        <div className="mt-9 space-y-6">
          {skills.map((skill) => (
            <div key={skill.label}>
              <div className="mb-2 flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.12em] text-[#4b5158]">
                <span>{skill.label}</span>
                <span>{skill.percent}%</span>
              </div>
              <div className="h-3 bg-[#f0f0f0]">
                <div className="h-full bg-[#777]" style={{ width: `${skill.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f1ec] grayscale">
        <Image
          alt="Professional using a laptop for commerce operations"
          className="object-cover"
          fill
          loading="eager"
          sizes="(min-width: 1024px) 560px, 100vw"
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1100&q=80"
        />
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-white px-4 py-16 text-center sm:px-6">
      <h2 className="font-serif text-3xl font-bold uppercase text-[#aa9737]">Newsletter Sign Up</h2>
      <p className="mt-2 text-sm text-[#6d747c]">(Get 30% OFF coupon today subscribers)</p>
      <form className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-[#cccccc] bg-white">
        <input
          aria-label="Email address"
          className="min-w-0 flex-1 px-5 text-sm outline-none"
          placeholder="Your email address"
          suppressHydrationWarning
          type="email"
        />
        <button className="cursor-pointer bg-[#aa9737] px-8 text-[12px] font-bold uppercase text-white transition hover:bg-[#8d7b28]" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 border border-[#e5e5e5] bg-white text-center sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span
            key={brand}
            className="border-b border-r border-[#e5e5e5] py-8 font-serif text-xl font-bold uppercase tracking-[0.06em] text-[#6f6f6f] lg:border-b-0"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer({ instagramImages }: { instagramImages: string[] }) {
  return (
    <footer className="bg-white px-4 pb-10 pt-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-[#e8e8e8] pb-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-lg uppercase">Contact Infor</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-[#68717a]">
            <li className="flex gap-3"><MapPin className="mt-1 shrink-0" size={16} /> 123 Main Street, Anytown, CA 12345 - USA.</li>
            <li className="flex gap-3"><Phone className="mt-1 shrink-0" size={16} /> (+1)866-550-3669</li>
            <li className="flex gap-3"><Mail className="mt-1 shrink-0" size={16} /> yourmail@domain.com</li>
            <li>Working time: 9.00 - 21.00</li>
          </ul>
          <div className="mt-6 flex gap-4 text-sm font-bold text-[#444b52]">
            <span>f</span>
            <span>t</span>
            <span>yt</span>
            <span>G+</span>
            <span>ig</span>
          </div>
        </div>
        <FooterLinks title="Products" links={["Prices drop", "New products", "Best sales", "Stores", "Login", "My account"]} />
        <FooterLinks
          title="Our Company"
          links={["Delivery", "Legal Notice", "Terms and conditions of use", "About us", "Secure payment", "Contact us"]}
        />
        <div>
          <h2 className="font-serif text-lg uppercase">Instagram</h2>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {instagramImages.map((image) => (
              <div key={image} className="relative aspect-square bg-[#f4f1ec]">
                <Image alt="" className="object-cover" fill loading="eager" sizes="86px" src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 pt-8 text-xs text-[#68717a] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Mugnee Multiple Limited. Made with care for modern commerce.</p>
        <div className="flex gap-1">
          {["PayPal", "VISA", "MC", "DISC", "2CO"].map((card) => (
            <span key={card} className="bg-[#aaa] px-2 py-1 text-[10px] font-bold text-white">
              {card}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h2 className="font-serif text-lg uppercase">{title}</h2>
      <ul className="mt-6 list-disc space-y-2 pl-4 text-sm text-[#68717a]">
        {links.map((link) => (
          <li key={link}>
            <a className="transition hover:text-[#aa9737]" href="#">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
