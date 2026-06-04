"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import type { ContactDetail, ContactPageModel } from "@/models/ecommerce";

type ContactViewModel = ContactPageModel & {
  pageTitle: string;
  cartTotal: string;
};

type Props = {
  viewModel: ContactViewModel;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactPageView({ viewModel }: Props) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<string | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus(null);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missingField = Object.values(form).some((value) => value.trim().length === 0);

    if (missingField) {
      setStatus("Please complete all fields before sending your message.");
      return;
    }

    setStatus("Thanks. Your message is ready for the Mugnee support team.");
    setForm(initialForm);
  }

  return (
    <main className="min-h-screen bg-white text-[#252a31]">
      <Breadcrumb pageTitle={viewModel.pageTitle} />
      <ContactIntro />
      <ContactSection
        details={viewModel.details}
        form={form}
        onSubmit={submitForm}
        onUpdate={updateField}
        status={status}
        workingHours={viewModel.workingHours}
      />
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

function ContactIntro() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-10 pt-16 text-center sm:px-6 lg:pb-14 lg:pt-24">
      <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#aa9737]">We are here to help</p>
      <h1 className="mt-3 font-serif text-4xl font-bold uppercase leading-tight text-[#252a31] sm:text-5xl">
        Tell Us About Your Project
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#68717a]">
        Reach out for product support, wholesale questions, partnerships, or anything that helps make your
        Mugnee experience smoother.
      </p>
    </section>
  );
}

function ContactSection({
  details,
  form,
  onSubmit,
  onUpdate,
  status,
  workingHours,
}: {
  details: ContactDetail[];
  form: FormState;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onUpdate: (field: keyof FormState, value: string) => void;
  status: string | null;
  workingHours: string;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:pb-24">
      <form className="border border-[#eeeeee] bg-white p-5 sm:p-8" onSubmit={onSubmit}>
        <h2 className="font-serif text-2xl font-bold uppercase text-[#252a31]">Send A Message</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <TextField
            label="First name"
            onChange={(value) => onUpdate("firstName", value)}
            placeholder="First name*"
            value={form.firstName}
          />
          <TextField
            label="Last name"
            onChange={(value) => onUpdate("lastName", value)}
            placeholder="Last name*"
            value={form.lastName}
          />
          <TextField
            label="Email"
            onChange={(value) => onUpdate("email", value)}
            placeholder="Email*"
            type="email"
            value={form.email}
          />
          <TextField
            label="Subject"
            onChange={(value) => onUpdate("subject", value)}
            placeholder="Subject*"
            value={form.subject}
          />
        </div>
        <label className="sr-only" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          className="mt-4 min-h-40 w-full resize-y bg-[#f5f5f5] px-4 py-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#aa9737]"
          onChange={(event) => onUpdate("message", event.target.value)}
          placeholder="Message *"
          required
          suppressHydrationWarning
          value={form.message}
        />
        {status ? (
          <p className="mt-4 border-l-4 border-[#aa9737] bg-[#f8f6ee] px-4 py-3 text-sm text-[#4b5158]">{status}</p>
        ) : null}
        <button
          className="mt-6 inline-flex h-11 items-center gap-2 bg-[#666] px-7 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#aa9737]"
          type="submit"
        >
          <Send size={15} /> Send Email
        </button>
      </form>
      <aside className="bg-[#f4f4f4] p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-bold uppercase text-[#252a31]">Contact Us</h2>
        <p className="mt-5 text-sm leading-8 text-[#4f5962]">
          Our care team responds to product inquiries, order questions, and collaboration requests with practical,
          helpful guidance.
        </p>
        <div className="mt-7 divide-y divide-[#dddddd]">
          {details.map((detail) => (
            <ContactRow key={detail.label} detail={detail} />
          ))}
        </div>
        <div className="mt-8">
          <h3 className="font-serif text-xl font-bold text-[#252a31]">Working hours</h3>
          <p className="mt-2 text-sm font-semibold text-[#4f5962]">{workingHours}</p>
        </div>
      </aside>
    </section>
  );
}

function TextField({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  const id = `contact-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <>
      <label className="sr-only" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="h-12 w-full bg-[#f5f5f5] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#aa9737]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        suppressHydrationWarning
        type={type}
        value={value}
      />
    </>
  );
}

function ContactRow({ detail }: { detail: ContactDetail }) {
  const icons = {
    address: MapPin,
    email: Mail,
    phone: Phone,
  };
  const Icon = icons[detail.icon];

  return (
    <div className="flex gap-4 py-5 text-sm text-[#68717a]">
      <Icon className="mt-0.5 shrink-0 text-[#6b6b6b]" size={17} />
      <p>
        <span className="font-semibold text-[#4b5158]">{detail.label} : </span>
        {detail.value}
      </p>
    </div>
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
