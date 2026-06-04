import {
  Mail,
  MapPin,
  Phone,
  Search,
  Tag,
} from "lucide-react";
import Image from "next/image";
import type { BlogArchive, BlogEntry, BlogPageModel, ProductTag } from "@/models/ecommerce";

type BlogViewModel = BlogPageModel & {
  pageTitle: string;
  cartTotal: string;
};

type Props = {
  viewModel: BlogViewModel;
};

export function BlogPageView({ viewModel }: Props) {
  return (
    <main className="min-h-screen bg-white text-[#252a31]">
      <Breadcrumb pageTitle={viewModel.pageTitle} />
      <section className="mx-auto grid max-w-6xl gap-9 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_260px] lg:py-24">
        <PostFeed posts={viewModel.posts} />
        <BlogSidebar
          archives={viewModel.archives}
          productTags={viewModel.productTags}
          recentPosts={viewModel.recentPosts}
        />
      </section>
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

function PostFeed({ posts }: { posts: BlogEntry[] }) {
  return (
    <section className="space-y-12">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
      <div className="flex justify-center gap-5 pt-2 text-sm">
        <button className="grid h-8 min-w-8 place-items-center bg-[#aa9737] text-white" type="button">
          1
        </button>
        <button className="grid h-8 min-w-8 place-items-center transition hover:bg-[#aa9737] hover:text-white" type="button">
          2
        </button>
        <button className="grid h-8 min-w-8 place-items-center transition hover:bg-[#aa9737] hover:text-white" type="button">
          ...
        </button>
      </div>
    </section>
  );
}

function BlogPostCard({ post }: { post: BlogEntry }) {
  return (
    <article className="border border-[#eeeeee] px-5 py-8 text-center sm:px-6">
      <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#aa9737]">
        <Tag size={12} /> {post.category}
      </p>
      <h1 className="mt-3 font-serif text-2xl font-bold uppercase text-[#252a31]">{post.title}</h1>
      <p className="mt-3 text-[12px] text-[#68717a]">
        Posted by {post.author} <span className="mx-3">|</span> {post.date}
      </p>
      <PostMedia post={post} />
      <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#4f5962]">{post.excerpt}</p>
      <a
        className="mt-5 inline-flex h-9 items-center justify-center bg-[#aa9737] px-5 text-[11px] font-bold uppercase text-white transition hover:bg-[#8d7b28]"
        href="#"
      >
        Read more
      </a>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#252a31]">Share this post</p>
      <div className="mt-3 flex justify-center gap-2">
        {["f", "t", "g+", "in", "p"].map((item) => (
          <a
            key={item}
            className="grid h-6 min-w-6 place-items-center border border-[#d7dce0] text-[10px] font-bold text-[#37404a] transition hover:border-[#aa9737] hover:text-[#aa9737]"
            href="#"
          >
            {item}
          </a>
        ))}
      </div>
    </article>
  );
}

function PostMedia({ post }: { post: BlogEntry }) {
  if (post.format === "video") {
    return (
      <div className="mx-auto mt-7 grid aspect-video max-w-[760px] place-items-center bg-[#2b2b2b] text-white">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-4 border-white/80 text-2xl">!</span>
          <p className="mt-4 text-lg font-bold">Video unavailable</p>
          <p className="text-sm text-white/80">This video is private</p>
        </div>
      </div>
    );
  }

  if (post.format === "audio") {
    return (
      <div className="mx-auto mt-7 max-w-[760px] bg-[#f4ad85] px-4 py-5">
        <div className="flex items-center gap-4">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-[#f26d21] text-white" type="button">
            ▶
          </button>
          <div className="h-10 flex-1 overflow-hidden rounded bg-white/60">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_3px,#30251f_3px,#30251f_5px)] opacity-50" />
          </div>
        </div>
      </div>
    );
  }

  return post.image ? (
    <div className="relative mx-auto mt-7 aspect-[16/9] max-w-[760px] bg-[#f5f3ef]">
      <Image
        alt={post.title}
        className="object-cover"
        fill
        loading="eager"
        sizes="(min-width: 1024px) 760px, 100vw"
        src={post.image}
      />
    </div>
  ) : null;
}

function BlogSidebar({
  archives,
  productTags,
  recentPosts,
}: {
  archives: BlogArchive[];
  productTags: ProductTag[];
  recentPosts: BlogArchive[];
}) {
  return (
    <aside className="space-y-8">
      <SidebarPanel title="Search">
        <form className="relative mt-4">
          <label className="sr-only" htmlFor="blog-search">Search blog</label>
          <input
            id="blog-search"
            className="h-10 w-full border border-[#dfe3e6] px-3 pr-10 text-sm outline-none focus:border-[#aa9737]"
            placeholder="Search..."
            suppressHydrationWarning
            type="search"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d858d]" size={15} />
        </form>
      </SidebarPanel>
      <SidebarPanel title="Blog Archives">
        <SidebarList items={archives} />
      </SidebarPanel>
      <SidebarPanel title="Recent Posts">
        <SidebarList items={recentPosts} />
      </SidebarPanel>
      <aside className="relative aspect-[3/5] overflow-hidden bg-[#81a933] text-white">
        <Image
          alt="Organic cream promotion"
          className="object-cover"
          fill
          loading="eager"
          sizes="260px"
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=520&q=80"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#6c9829] to-transparent p-7 text-center">
          <p className="inline-flex rounded-full border border-white px-4 py-1 text-2xl font-bold">100%</p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-none">CREAM</h2>
          <p className="text-xl uppercase">Organic</p>
        </div>
      </aside>
      <SidebarPanel title="Product Tags">
        <div className="mt-4 flex flex-wrap gap-2">
          {productTags.map((tag) => (
            <a
              key={tag.label}
              className="border border-[#dfe3e6] px-3 py-1 text-[11px] text-[#68717a] transition hover:border-[#aa9737] hover:text-[#aa9737]"
              href={tag.href}
            >
              {tag.label}
            </a>
          ))}
        </div>
      </SidebarPanel>
    </aside>
  );
}

function SidebarPanel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section>
      <h2 className="font-serif text-sm font-bold uppercase text-[#252a31]">{title}</h2>
      {children}
    </section>
  );
}

function SidebarList({ items }: { items: BlogArchive[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-[#68717a]">
      {items.map((item) => (
        <li key={item.label}>
          <a className="transition hover:text-[#aa9737]" href="#">
            {item.label} ({item.count})
          </a>
        </li>
      ))}
    </ul>
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
