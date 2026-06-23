import Image from 'next/image';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';
import type { LayoutSettings } from '@/services/layoutApi';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';
import FooterDisclaimer from './FooterDisclaimer';
import MobileBottomBar from './MobileBottomBar';

const footerLinkClass =
  'block text-sm font-normal leading-relaxed tracking-[-0.16px] text-heading transition hover:text-brand';

const COLUMN_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact us', href: '#' },
      { label: 'Corporate Training', href: '#' },
      { label: 'Reviews', href: '#' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Trainers', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', href: '#' },
      { label: 'Course Info', href: '#' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Refund Policy', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
];


function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 13.1543C7.87109 16.0352 11.3086 18.2227 14.0723 18.2227C15.3711 18.2227 16.5039 17.7051 17.2461 16.875C17.959 16.0742 18.2031 15.4785 18.2031 14.9512C18.2031 14.541 17.9492 14.1602 17.3047 13.7109L14.9219 12.002C14.3262 11.582 14.0625 11.5039 13.7109 11.5039C13.4082 11.5039 13.1543 11.5625 12.6465 11.8359L11.084 12.6953C10.8984 12.8027 10.8203 12.8223 10.6836 12.8223C10.498 12.8223 10.3711 12.7734 10.1855 12.6953C9.44336 12.3535 8.39844 11.5332 7.4707 10.6055C6.54297 9.67773 5.82031 8.73047 5.44922 7.99805C5.40039 7.90039 5.3418 7.74414 5.3418 7.58789C5.3418 7.46094 5.41016 7.35352 5.48828 7.2168L6.40625 5.64453C6.66016 5.21484 6.72852 4.98047 6.72852 4.64844C6.72852 4.26758 6.60156 3.85742 6.24023 3.33984L4.59961 1.05469C4.13086 0.400391 3.7793 0 3.25195 0C2.59766 0 1.80664 0.498047 1.24023 1.04492C0.429688 1.82617 0 2.91992 0 4.15039C0 6.93359 2.13867 10.3027 5 13.1543Z"
        fill="white"
        fillOpacity="0.85"
      />
      <path
        d="M11.5039 7.19721L11.748 3.39838L11.7578 1.9433C11.748 1.56244 11.4551 1.26947 11.0742 1.24994C10.6934 1.23041 10.3516 1.54291 10.3516 1.9433V7.60736C10.3613 8.11517 10.6055 8.37885 11.123 8.37885H16.7969C17.1973 8.37885 17.5195 8.04682 17.4902 7.64642C17.4707 7.26556 17.1777 6.98236 16.7969 6.99213L15.3223 6.98236L11.5039 7.19721ZM11.1719 6.67963C10.9473 6.92377 10.9375 7.30463 11.1719 7.539C11.4062 7.77338 11.7969 7.76361 12.041 7.539L14.0918 5.64447L18.291 1.42572C18.4473 1.26947 18.5352 1.09369 18.5352 0.888611C18.5254 0.507751 18.2129 0.205017 17.8027 0.214783C17.6074 0.205017 17.4414 0.273377 17.2949 0.419861L13.0762 4.62885L11.1719 6.67963Z"
        fill="white"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="17"
      viewBox="0 0 24 17"
      fill="none"
      aria-hidden
    >
      <path
        d="M11.7773 9.51172C12.0996 9.51172 12.4121 9.38477 12.7148 9.11133L22.4707 0.517578C21.9434 0.166016 21.3379 0.00976562 20.498 0.00976562H3.06641C2.22656 0.00976562 1.62109 0.166016 1.08398 0.517578L10.8398 9.11133C11.1523 9.38477 11.4648 9.51172 11.7773 9.51172ZM0.253906 15.2637L7.48047 8.04688L0.234375 1.66016C0.126953 1.86523 0 2.36328 0 3.03711V13.8184C0 14.4434 0.0976562 14.8926 0.253906 15.2637ZM2.77344 16.8457H20.791C21.5039 16.8457 22.0605 16.6699 22.4316 16.416L15 8.98438L13.5742 10.2539C13.0078 10.752 12.3926 11.0059 11.7773 11.0059C11.1719 11.0059 10.5566 10.752 9.99023 10.2539L8.56445 8.98438L1.13281 16.416C1.50391 16.6699 2.05078 16.8457 2.77344 16.8457ZM23.3105 15.2637C23.457 14.8926 23.5645 14.4434 23.5645 13.8184V3.03711C23.5645 2.36328 23.4375 1.86523 23.3301 1.66016L16.084 8.04688L23.3105 15.2637Z"
        fill="white"
        fillOpacity="0.85"
      />
    </svg>
  );
}

type StringKeys<T> = { [K in keyof T]: T[K] extends string | undefined ? K : never }[keyof T];

const SOCIAL_MAP: { key: StringKeys<LayoutSettings>; src: string; label: string }[] = [
  { key: 'LINKEDIN',  src: '/images/LinkedIn.svg',  label: 'LinkedIn' },
  { key: 'TWITTER',   src: '/images/Twitter.svg',   label: 'Twitter' },
  { key: 'FACEBOOK',  src: '/images/Facebook.svg',  label: 'Facebook' },
  { key: 'INSTAGRAM', src: '/images/Instagram.svg', label: 'Instagram' },
  { key: 'YOUTUBE',   src: '/images/youtube.svg',   label: 'YouTube' },
];

function getSocialIcons(settings: LayoutSettings) {
  return SOCIAL_MAP.flatMap(({ key, src, label }) => {
    const href = settings[key];
    if (!href) return [];
    return [{ href, src, label }];
  });
}

function toWhatsAppHref(phone: string | undefined): string {
  if (!phone) return 'https://wa.me/';
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

function buildAddress(settings: LayoutSettings): string {
  return [
    settings.CONTACT_ADDRESS,
    settings.CONTACT_ADDRESS_STATE,
    settings.CONTACT_ADDRESS_COUNTRY,
    settings.CONTACT_ADDRESS_PINCODE,
  ]
    .filter(Boolean)
    .join(', ');
}

function WhatsAppFab({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-transparent shadow-lg transition hover:scale-105 hover:shadow-xl md:left-6"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/images/whatspp.svg"
        alt=""
        width={40}
        height={40}
        className="pointer-events-none h-10 w-10 object-contain"
        sizes="40px"
      />
    </a>
  );
}

function ChatFab() {
  return (
    <button
      type="button"
      className="fixed bottom-20 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-transparent transition hover:scale-105 sm:bottom-6 md:right-6"
      aria-label="Open chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="30"
        viewBox="0 0 35 30"
        fill="none"
        className="pointer-events-none h-[36px] w-auto"
        aria-hidden
      >
        <path
          d="M34.449 13.855C34.449 21.8771 27.2107 27.7101 17.2171 27.7101C13.9404 27.7101 10.9468 27.1196 8.37022 25.9818C6.83617 27.0619 4.73618 27.7101 2.68085 27.7101C1.69787 27.7101 1.34043 27.0042 2.01064 26.4282C2.90426 25.6216 3.2766 24.8872 3.2766 23.7638C3.2766 21.1857 0 19.6303 0 13.855C0 5.81853 7.2383 0 17.2171 0C27.1957 0 34.449 5.81853 34.449 13.855ZM22.2362 13.9126C22.2362 15.108 23.2341 16.0729 24.4702 16.0729C25.6915 16.0729 26.7043 15.108 26.7043 13.9126C26.7043 12.7172 25.6915 11.7523 24.4702 11.7523C23.2341 11.7523 22.2362 12.7172 22.2362 13.9126ZM15.0723 13.9126C15.0723 15.108 16.0702 16.0729 17.3065 16.0729C18.5276 16.0729 19.5255 15.108 19.5255 13.9126C19.5255 12.7172 18.5276 11.7523 17.3065 11.7523C16.0702 11.7523 15.0723 12.7172 15.0723 13.9126ZM7.89362 13.9126C7.89362 15.108 8.90638 16.0729 10.1277 16.0729C11.3638 16.0729 12.3617 15.108 12.3617 13.9126C12.3617 12.7172 11.349 11.7523 10.1277 11.7523C8.90638 11.7523 7.89362 12.7172 7.89362 13.9126Z"
          fill="#4ECC5C"
        />
      </svg>
    </button>
  );
}

type GridItem = { label: string; href: string };

function CourseGridSection({ title, items, showTopBorder }: { title: string; items: GridItem[]; showTopBorder?: boolean }) {
  if (items.length === 0) return null;
  return (
    <section className={showTopBorder ? 'pt-2 lg:pt-3' : ''}>
      <h2 className="mb-4 text-base font-semibold leading-tight text-heading lg:mb-5">{title}</h2>
      <ul className="flex flex-wrap items-center gap-y-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center">
            <Link
              href={item.href}
              className="text-sm font-normal tracking-[-0.16px] text-[#6b7fa3] transition hover:text-brand"
            >
              {item.label}
            </Link>
            {i < items.length - 1 && (
              <span className="mx-3 select-none text-zinc-300" aria-hidden>|</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}


const Footer = ({
  settings = {},
  categories = [],
}: {
  settings?: LayoutSettings;
  categories?: MegaMenuCategory[];
}) => {
  const socialIcons = getSocialIcons(settings);
  const whatsAppHref = toWhatsAppHref(settings.CONTACT_WHATSAPP_NO);
  const address = buildAddress(settings);
  const phone = settings.CONTACT_PHONE_NO ?? '';
  const email = settings.CONTACT_EMAIL ?? '';
  const currentYear = new Date().getFullYear();

  const topCategories: GridItem[] = categories.map((cat) => ({
    label: cat.label,
    href: cat.href,
  }));

  const topCourses: GridItem[] = categories
    .flatMap((cat) =>
      cat.courses.map((course) => ({
        label: course.label,
        href: course.href,
        priority: course.priority ?? 999,
      })),
    )
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 10)
    .map(({ label, href }) => ({ label, href }));

  return (
    <>
      <footer className="bg-white text-heading">
        <div className="site-container pb-8 pt-14 md:pb-12 md:pt-16 lg:pt-[4.5rem]">
          {/* Top: 4 tight link columns + logo column with larger inset */}
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-0">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 md:grid-cols-4 md:gap-x-2 md:gap-y-0 lg:gap-x-3">
              {COLUMN_GROUPS.map((col) => (
                <div key={col.title} className="min-w-0">
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-heading">{col.title}</h3>
                  <ul className="space-y-2.5">
                    {col.links.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className={footerLinkClass}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="min-w-0 md:max-w-md md:flex-none md:basis-[32%] lg:basis-[34%] md:pl-10 lg:pl-14 xl:pl-20">
              <Link href="/" className="mb-5 inline-block" aria-label="ScaleX Learning home">
                <Image
                  src="/images/footer-logo.png"
                  alt="ScaleX Learning"
                  width={170}
                  height={52}
                  className="h-11 w-auto max-w-[170px] object-contain object-left"
                  sizes="170px"
                />
              </Link>
              <p className="footer-body-text mb-3">Connect with us</p>
              {socialIcons.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2.5">
                  {socialIcons.map(({ href, src, label }) => (
                    <Link key={label} href={href} className="flex shrink-0" aria-label={label} target="_blank" rel="noopener noreferrer">
                      <Image src={src} alt="" width={40} height={40} className="h-10 w-10 object-contain" sizes="40px" />
                    </Link>
                  ))}
                </div>
              )}
              {address && (
                <p className="footer-body-text mb-3">Address: {address}</p>
              )}
              <p className="footer-body-text mb-3">© 2016-{currentYear} - {SITE_NAME}. All Rights Reserved.</p>
              <p className="footer-body-text max-w-md">
                The certification names are the trademarks of their respective owners.
              </p>
            </div>
          </div>

          {/* Course directory */}
          {(topCategories.length > 0 || topCourses.length > 0) && (
            <div className="mt-12 space-y-10 md:mt-14 md:space-y-12 lg:mt-16 lg:space-y-14">
              <CourseGridSection title="Top Categories" items={topCategories} />
              <CourseGridSection title="Top Courses" items={topCourses} showTopBorder />
              <FooterDisclaimer />
            </div>
          )}
        </div>

        {/* Bottom contact strip — desktop only */}
        <div className="hidden border-t border-white/5 bg-black sm:block">
          <div className="site-container flex flex-col gap-2 py-2 text-sm leading-none text-zinc-300 sm:h-[37px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
            <div className="flex items-center gap-2">
              <PhoneIcon className="shrink-0" />
              <span className="tracking-[-0.16px]">Talk to Us to Scale Up</span>
            </div>
            {phone && (
              <div className="flex items-center gap-2 sm:justify-center">
                <PhoneIcon className="shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="tracking-[-0.16px] transition hover:text-white">
                  {phone}
                </a>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 sm:justify-end">
                <MailIcon className="shrink-0" />
                <a href={`mailto:${email}`} className="tracking-[-0.16px] transition hover:text-white">
                  {email}
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>

      <WhatsAppFab href={whatsAppHref} />
      <ChatFab />
      <MobileBottomBar phone={phone} />
    </>
  );
};

export default Footer;
