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
      <section ref={heroRef} className="full-bleed relative overflow-x-clip overflow-y-visible pb-8 md:pb-16 lg:pb-20" style={{ paddingTop: '75px' }}>
        {/* Decorative background */}
        <div className="category-hero-bg pointer-events-none absolute inset-0" aria-hidden />

        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 hover:text-brand transition-colors">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-muted">{'>'}</span>
            <span className="text-brand font-medium">Contact Us</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: Contact Info */}
            <div ref={heroLeftRef} className="gsap-reveal-pending max-w-xl">
              <h1 style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '40px', fontWeight: 800, lineHeight: '60px' }}>
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

              <p style={{ color: '#788593', fontFamily: 'Inter', fontSize: '17px', fontWeight: 500, lineHeight: '26px', width: '377px', maxWidth: '100%' }} className="mt-6">
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
              <div className="mt-10 flex flex-wrap gap-4">
                <CourseBrochureCta
                  openModal
                  type="contact"
                  courseId={null}
                  className="btn-brand h-[54px] gap-2 px-6 md:px-7 inline-flex items-center"
                  style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Inter', color: '#FFF' }}
                >
                  Send a Message
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden className="btn-arrow-icon shrink-0">
                    <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="white" />
                  </svg>
                </CourseBrochureCta>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="btn-brand-outline inline-flex h-[54px] items-center justify-center gap-3 px-6 text-sm font-semibold sm:w-auto md:text-[15px]"
                >
                  Call Us Now
                </a>
              </div>
            </div>

            {/* Right: India Map */}
            <div ref={heroRightRef} className="gsap-reveal-pending relative flex items-center justify-center">
              <div className="relative w-full rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_0_rgba(30,41,59,0.08)]" style={{ maxWidth: '700px', height: '652px', marginTop: '-35px' }}>
                <div className="relative rounded-xl mt-5" style={{ maxWidth: '547px', height: '700px', margin: '-50px auto 0', paddingLeft: '20px', paddingRight: '20px' }}>
                  <Image
                    src="/images/map.png"
                    alt="India map showing EdgeX Learning presence"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Bengaluru marker */}
                  <div className="absolute" style={{ left: '36%', top: '72%', transform: 'translate(-50%, -50%)' }}>
                    <div className="absolute w-[200px] rounded-lg bg-zinc-900 px-3 py-2.5 text-white shadow-xl" style={{ bottom: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)' }}>
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

      {/* Our Presence Section */}
      <section className="full-bleed bg-[#F5F6F8] py-14 md:py-20">
        <div className="site-container">
          <div className="mb-10 text-center">
            <h2 style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, lineHeight: '1.2' }}>
              Our Presence
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: '#788593', fontFamily: 'Inter', fontWeight: 400 }}>
              We are the right ones that leaps your career
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between" style={{ gap: '30px' }}>
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm lg:shrink-0" style={{ width: '420px', maxWidth: '100%' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇳</span>
                  <span style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '17px', fontWeight: 700 }}>
                    Bengaluru, India
                  </span>
                </div>
                <div className="mt-2 h-[3px] w-10 rounded-full bg-brand" />

                <div className="mt-6">
                  <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700 }}>
                    Scale X Learning Pvt. Ltd.
                  </p>
                  <p className="mt-2" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>
                    {addressFull || '4th Floor, Koramangala Industrial Layout, Koramangala, Bengaluru, Karnataka 560034'}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-zinc-200" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image src="/images/ph.png" alt="" width={18} height={18} className="object-contain shrink-0" />
                  <span style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}>
                    {phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/images/email.png" alt="" width={18} height={18} className="object-contain shrink-0" />
                  <span style={{ color: '#E0001B', fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}>
                    {email}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-2xl lg:min-h-0 flex-1" style={{ maxWidth: '850px' }}>
              <Image
                src="/images/rit.png"
                alt="Bengaluru, Karnataka — EdgeX Learning HQ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
