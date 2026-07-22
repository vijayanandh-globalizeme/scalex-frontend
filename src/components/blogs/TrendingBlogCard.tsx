import Image from 'next/image';
import Link from 'next/link';
import type { ApiBlogListItem } from '@/services/blogApi';

const DEFAULT_BLOG_IMAGE = '/images/blog.png';
const DEFAULT_AUTHOR_AVATAR = '/images/pranee.png';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export type TrendingBlogCardData = {
  id: string;
  category: string;
  views: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  author: { name: string; avatarSrc: string; date: string };
  href: string;
};

export function toTrendingBlogCard(item: ApiBlogListItem): TrendingBlogCardData {
  return {
    id: item.id,
    category: item.categoryName ?? '',
    views: `${item.views.toLocaleString()} Views`,
    readTime: `${item.readTimeMinutes} min read`,
    title: item.title,
    excerpt: item.shortDescription,
    imageSrc: item.featureImage?.url ?? DEFAULT_BLOG_IMAGE,
    author: {
      name: item.trainerName ?? 'ScaleX Team',
      avatarSrc: item.trainerAvatar?.url ?? DEFAULT_AUTHOR_AVATAR,
      date: formatDate(item.createdAt),
    },
    href: `/blogs/${item.uri}`,
  };
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrendingBlogCard({
  blog,
  footerClassName,
}: {
  blog: TrendingBlogCardData;
  footerClassName?: string;
}) {
  return (
    <Link
      href={blog.href}
      className="interactive-card flex h-full w-full flex-col rounded-2xl bg-white"
      style={{ minWidth: 0 }}
    >
      <div className="interactive-card-media relative h-[200px] shrink-0 overflow-hidden rounded-t-2xl">
        <Image src={blog.imageSrc} alt={blog.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#FFF0F3] px-3 py-1 text-[12px] font-semibold text-brand">{blog.category}</span>
          <span className="flex items-center gap-1 text-[12px] text-muted"><EyeIcon /> {blog.views}</span>
          <span className="flex items-center gap-1 text-[12px] text-muted"><ClockIcon /> {blog.readTime}</span>
        </div>
        <h3 className="interactive-card-title mb-2 line-clamp-2 min-h-[2.75rem] text-[15px] font-bold leading-snug text-heading">{blog.title}</h3>
        <p className="line-clamp-2 min-h-[2.5rem] flex-1 text-[13px] leading-snug text-muted">{blog.excerpt}</p>
        <div className={`mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 ${footerClassName ?? ''}`}>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-100">
              <Image src={blog.author.avatarSrc} alt={blog.author.name} fill className="object-cover" sizes="32px" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-heading">{blog.author.name}</p>
              <p className="text-[11px] text-muted">{blog.author.date}</p>
            </div>
          </div>
          <span className="inline-flex items-center text-brand">
            <svg className="btn-arrow-icon" width="14" height="12" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
              <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
