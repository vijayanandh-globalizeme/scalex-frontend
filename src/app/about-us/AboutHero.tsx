'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGsapScrollReveal } from '@/hooks/useGsapScrollReveal';
import { CourseBrochureCta } from '@/components/course-detail';

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImagesRef = useRef<HTMLDivElement>(null);
  useGsapScrollReveal(heroRef, heroContentRef, { y: 40, duration: 1.2, delay: 0.1, start: 'top 95%' });
  useGsapScrollReveal(heroRef, heroImagesRef, { y: 50, duration: 1.4, delay: 0.3, start: 'top 95%' });

  return (
    <section ref={heroRef} className="full-bleed relative overflow-x-clip overflow-y-visible pb-0 pt-[55px] md:pb-12 md:pt-[75px]">
      <div className="site-container relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted md:mb-10" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-brand transition-colors">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-muted">{'>'}</span>
          <span className="text-brand font-medium">About Us</span>
        </nav>

        {/* Heading */}
        <div ref={heroContentRef} className="gsap-reveal-pending text-center">
          <h1
            className="text-[28px] leading-[40px] md:text-[40px] md:leading-[60px]"
            style={{
              color: 'var(--Text-Black-Primary, #1E293B)',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 800,
            }}
          >
            Empowering Professionals to
            <br className="hidden md:block" />
            Build{' '}
            <span className="relative inline-block whitespace-nowrap pb-[23px] align-top">
              <span>Future-Ready Careers</span>
              <span className="absolute bottom-0 left-0 block h-[19px] w-full overflow-hidden" aria-hidden>
                <span className="block h-[19px] w-full origin-left animate-category-title-underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="19" viewBox="0 0 500 19" fill="none" className="block h-[19px] w-full">
                    <path d="M498.433 5.57693C435.699 1.53361 355.63 7.65521 275.333 7.97869C195.035 8.30216 115.043 16.3565 35.745 16.6799C18.0292 17.1813 -2.07743 21.6484 0.237115 15.75C8.29024 7.76846 88.664 9.3777 168.885 7.12151C265.823 4.36396 362.607 -2.25902 460.773 0.781552C481.108 2.11261 506.715 3.39353 498.433 5.57693Z" fill="url(#about-title-underline)" />
                    <defs>
                      <linearGradient id="about-title-underline" x1="500" y1="1" x2="0" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FD022D" />
                        <stop offset="0.5" stopColor="#FFB301" />
                        <stop offset="1" stopColor="#58BD0F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </span>
            {'. AI Powered Now'}
          </h1>

          <p
            className="mx-auto mt-4 max-w-[1050px] md:mt-6"
            style={{
              color: '#788593',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '24px',
            }}
          >
            Helping learners and professionals gain industry-relevant skills, certifications, and practical expertise to
            <br />
            accelerate career growth and long-term success.
          </p>

          <div className="mt-6 mb-6 flex justify-center md:mt-8 md:mb-8">
            <CourseBrochureCta
              openModal
              type="contact"
              courseId={null}
              className="btn-brand inline-flex h-[54px] items-center gap-3 px-8"
              style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Inter' }}
            >
              Partner With Us
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden className="btn-arrow-icon shrink-0">
                <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="white" />
              </svg>
            </CourseBrochureCta>
          </div>
        </div>

        {/* Image grid */}
        <div
          ref={heroImagesRef}
          className="gsap-reveal-pending mt-6 grid grid-cols-3 gap-2 px-[10px] pb-[50px] md:mt-10 md:gap-4 md:pb-0 min-[1400px]:grid-cols-[398px_408px_398px] min-[1400px]:justify-between"
        >
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="relative h-[140px] overflow-hidden rounded-2xl md:h-[220px]">
              <Image src="/images/about-left.png" alt="Professional" fill className="object-cover" />
            </div>
            <div className="relative h-[140px] overflow-hidden rounded-2xl md:h-[220px]">
              <Image src="/images/about-left-1.png" alt="Professional" fill className="object-cover" />
            </div>
          </div>
          <div className="relative h-[296px] overflow-hidden rounded-2xl md:h-[460px]">
            <Image src="/images/about-center.png" alt="Professional leader" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="relative h-[140px] overflow-hidden rounded-2xl md:h-[220px]">
              <Image src="/images/about-right.png" alt="Professional" fill className="object-cover" />
            </div>
            <div className="relative h-[140px] overflow-hidden rounded-2xl md:h-[220px]">
              <Image src="/images/about-right-1.png" alt="Professional" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
