'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { CourseBrochureCta } from '@/components/course-detail';
import { useGsapScrollReveal } from '@/hooks/useGsapScrollReveal';

type ContactInfo = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressState: string;
  addressCountry: string;
  addressPincode: string;
};

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#contact-phone-clip)">
        <path
          d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725ZM14.1895 17.5881C11.6992 17.637 8.51562 15.7229 5.98633 13.2034C3.4375 10.6643 1.43555 7.36353 1.48438 4.86353C1.50391 3.78931 1.875 2.87134 2.64648 2.19751C2.70508 2.14868 2.76367 2.09985 2.82227 2.05103C3.11523 1.79712 3.4375 1.6604 3.71094 1.6604C4.00391 1.6604 4.24805 1.76782 4.44336 2.06079L6.20117 4.69751C6.36719 4.94165 6.35742 5.15649 6.16211 5.49829L5.18555 7.06079C4.75586 7.75415 4.83398 8.28149 5.26367 8.86743C5.83008 9.61938 6.67969 10.7034 7.43164 11.4456C8.17383 12.1877 9.41406 13.2424 10.0879 13.7112C10.6738 14.1409 11.2012 14.2385 12.1094 13.7991L13.75 13.0178C14.1211 12.8518 14.4141 12.9006 14.7266 13.0959L17.0117 14.6292C17.3047 14.8147 17.4121 15.0686 17.4121 15.3616C17.4121 15.635 17.2754 15.9573 17.0215 16.2502C16.9727 16.3088 16.9238 16.3674 16.875 16.426C16.2012 17.1975 15.2734 17.5686 14.1895 17.5881Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="contact-phone-clip">
          <rect width="19.4336" height="19.0728" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function ContactPageClient({
  phone,
  whatsapp,
  email,
  address,
  addressState,
  addressCountry,
  addressPincode,
}: ContactInfo) {
  const heroRef = useRef<HTMLElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  useGsapScrollReveal(heroRef, heroLeftRef, { y: 40, duration: 1.2, delay: 0.1, start: 'top 95%' });
  useGsapScrollReveal(heroRef, heroRightRef, { y: 50, duration: 1.4, delay: 0.3, start: 'top 95%' });

  const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
  const addressFull = [address, addressState, addressCountry, addressPincode].filter(Boolean).join(', ');
  const addressLine1 = address || 'Koramangala, Bengaluru 560034';
  const addressLine2 = [addressState, addressCountry].filter(Boolean).join(', ') || 'Karnataka, India';

  return (
    <>
      {/* Hero Banner */}
      <section ref={heroRef} className="full-bleed relative overflow-x-clip overflow-y-visible max-md:pt-10 pb-15 md:pb-20 md:pt-10 lg:pb-24">
        {/* Decorative background — pink gradient (mobile + desktop) */}
        <div className="category-hero-bg pointer-events-none absolute inset-0" aria-hidden />

        <div className="site-container relative z-10 max-md:min-w-0 max-md:max-w-full">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted md:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 hover:text-brand transition-colors">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-muted">{'>'}</span>
            <span className="text-brand font-medium">Contact Us</span>
          </nav>

          <div className="grid items-center gap-10 max-md:min-w-0 max-md:w-full max-md:max-w-full max-md:gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Left: Contact Info */}
            <div ref={heroLeftRef} className="gsap-reveal-pending max-w-xl max-md:w-full max-md:min-w-0">
              <h1 className="max-md:text-[32px] max-md:leading-[44px] md:text-[40px] md:leading-[60px]" style={{ color: '#1E293B', fontFamily: 'Inter', fontWeight: 800 }}>
                Get In Touch With
                <br />
                Our Team
              </h1>

              {/* Animated gradient underline */}
              <span className="mt-1 block h-[19px] w-full max-w-[358px] overflow-hidden" aria-hidden="true">
                <span className="inline-block h-[19px] w-[358px] max-w-full origin-left animate-category-title-underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="358" height="19" viewBox="0 0 358 19" fill="none" className="block h-[19px] w-[358px] max-w-full">
                    <path d="M356.433 5.57693C311.699 1.53361 254.63 7.65521 197.333 7.97869C140.035 8.30216 83.0426 16.3565 25.745 16.6799C13.0292 17.1813 -2.07743 21.6484 0.237115 15.75C6.29024 7.76846 63.664 9.3777 120.885 7.12151C190.823 4.36396 260.607 -2.25902 330.773 0.781552C346.108 2.11261 362.715 3.39353 356.433 5.57693Z" fill="url(#contact-title-underline)" />
                    <defs>
                      <linearGradient id="contact-title-underline" x1="357.654" y1="1.02531" x2="-0.0681898" y2="15.13" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FD022D" />
                        <stop offset="0.5" stopColor="#FFB301" />
                        <stop offset="1" stopColor="#58BD0F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>

              <p className="mt-6 max-w-full md:max-w-[377px]" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '17px', fontWeight: 500, lineHeight: '26px' }}>
                We&apos;d love to hear from you! Whether you&apos;re looking to upskill, transition careers, or build your enterprise learning roadmap — we&apos;re here for every step.
              </p>

              {/* Contact Details */}
              <div className="mt-10 space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ borderRadius: '20px', background: '#F8F9FB' }}>
                    <Image src="/images/ph.png" alt="" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600 }}>Call us</p>
                    <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '15px', fontWeight: 700 }}>{phone}</p>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>Mon–Sat, 9AM – 7PM IST</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ borderRadius: '20px', background: '#F8F9FB' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600 }}>WhatsApp</p>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '15px', fontWeight: 700 }}>{whatsapp}</a>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>Chat with us anytime</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ borderRadius: '20px', background: '#F8F9FB' }}>
                    <Image src="/images/email.png" alt="" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600 }}>Email us</p>
                    <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '15px', fontWeight: 700 }}>{email}</p>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>Reply within 4 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ borderRadius: '20px', background: '#F8F9FB' }}>
                    <Image src="/images/visit.png" alt="" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600 }}>Visit us</p>
                    <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '15px', fontWeight: 700 }}>{addressLine1}</p>
                    <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>{addressLine2}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 max-md:w-full max-md:min-w-0 max-md:max-w-full max-md:flex-col max-md:gap-3">
                <CourseBrochureCta
                  openModal
                  type="contact"
                  courseId={null}
                  className="btn-brand inline-flex h-[54px] items-center gap-2 px-6 md:px-7 max-md:box-border max-md:w-full max-md:min-w-0 max-md:max-w-full max-md:px-4"
                  style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Inter', color: '#FFF' }}
                >
                  Send a Message
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden className="btn-arrow-icon shrink-0">
                    <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="white" />
                  </svg>
                </CourseBrochureCta>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="btn-brand-outline inline-flex h-[54px] w-[192px] min-w-0 cursor-pointer items-center justify-center gap-[18px] px-6 text-sm font-semibold md:text-[15px] max-md:box-border max-md:w-full max-md:max-w-full max-md:gap-2 max-md:px-4"
                >
                  Call Us Now
                  <PhoneIcon className="h-5 w-5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Right: India Map */}
            <div ref={heroRightRef} className="gsap-reveal-pending relative flex items-center justify-center max-md:w-full max-md:min-w-0 max-md:max-w-full">
              <div className="relative w-full max-w-[700px] overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_0_rgba(30,41,59,0.08)] max-md:box-border max-md:max-w-full max-md:min-h-[380px] max-md:p-4 md:h-[652px]">
                <div className="relative mx-auto aspect-[547/700] w-full max-w-[547px] -translate-y-3 md:mt-0 md:-translate-y-6 md:px-5 max-md:max-w-full">
                  <Image
                    src="/images/map.png"
                    alt="India map showing EdgeX Learning presence"
                    fill
                    className="object-contain object-top"
                    priority
                  />

                  {/* Bengaluru marker */}
                  <div className="absolute left-1/2 top-[72%] -translate-x-1/2 -translate-y-1/2 md:left-[36%]">
                    <div className="absolute bottom-[calc(100%+12px)] left-1/2 w-[min(200px,calc(100vw-5rem))] max-w-[200px] -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2.5 text-white shadow-xl md:w-[200px]">
                      <p className="text-[13px] font-bold leading-snug">Bengaluru, Karnataka</p>
                      <p className="text-[11px] text-zinc-300 mt-0.5 font-medium">Scale X Learning HQ</p>
                      <p className="text-[11px] text-zinc-400">{addressFull || 'Koramangala, Bengaluru 560034'}</p>
                      <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-3 w-3 rotate-45 bg-zinc-900" />
                    </div>

                    <div className="relative flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <span className="contact-map-ping absolute inline-flex h-8 w-8 rounded-full bg-red-400/40" />
                        <span className="contact-map-ping-2 absolute inline-flex h-5 w-5 rounded-full bg-red-500/50" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-brand shadow-md shadow-red-500/40" />
                      </div>
                      <p className="mt-1 text-[12px] font-semibold text-brand">Bengaluru</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-7 right-4">
                  <span className="rounded-full bg-red-50 px-4 py-1.5 text-[13px] font-semibold text-brand">
                    Our Presence in India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="full-bleed bg-[#F5F6F8] pb-15 max-md:pt-15 md:py-20">
        <div className="site-container">
          <div className="mb-10 text-center">
            <h2 style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, lineHeight: '1.2' }}>
              Enquiry
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: '#788593', fontFamily: 'Inter', fontWeight: 400 }}>
              We&apos;re here to help
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: 'fa-comment-dots',
                title: 'Chat with us',
                desc: 'For a Quick Answers to your queries, chat with us',
                cta: 'Initiate Chat',
                href: whatsappHref,
                external: true,
              },
              {
                icon: 'fa-book-open',
                title: 'For Individual Learners',
                desc: 'Feel free to mail us for all your queries',
                cta: 'Mail Us',
                href: `mailto:${email}`,
              },
              {
                icon: 'fa-building',
                title: 'For Enterprise Learners',
                desc: 'Mail us for all your queries',
                cta: 'Mail Us',
                href: `mailto:${email}`,
              },
              {
                id: 'become-instructor',
                icon: 'fa-chalkboard-user',
                title: 'Become an Instructor',
                desc: 'Drop us a line, and we will be happy to assist',
                cta: 'Mail Us',
                href: `mailto:${email}`,
              },
              {
                id: 'become-trainer',
                icon: 'fa-handshake',
                title: 'Training Partners',
                desc: 'Feel free to ping us with your inquiries',
                cta: 'Mail Us',
                href: `mailto:${email}`,
              },
              {
                icon: 'fa-file-invoice-dollar',
                title: 'Billing Related',
                desc: 'Feel free to ping for all your queries',
                cta: 'Mail Us',
                href: `mailto:${email}`,
              },
            ].map((card) => (
              <div
                key={card.title}
                id={card.id}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm scroll-mt-24"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: '#EEF3FF' }}>
                  <i className={`fa-solid ${card.icon}`} style={{ color: '#60A5FA', fontSize: '22px' }} aria-hidden />
                </div>

                <p className="mt-5" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '18px', fontWeight: 700 }}>
                  {card.title}
                </p>
                <p className="mt-2" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>
                  &ldquo;{card.desc}&rdquo;
                </p>

                <a
                  href={card.href}
                  {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="btn-brand group mt-6 h-11 gap-2 px-5 inline-flex items-center"
                  style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Inter' }}
                >
                  {card.cta}
                  <svg width="16" height="13" viewBox="0 0 18 15" fill="none" aria-hidden className="btn-arrow-icon shrink-0">
                    <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="white" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
