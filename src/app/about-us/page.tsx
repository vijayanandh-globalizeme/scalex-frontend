import Image from 'next/image';
import Link from 'next/link';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { LogoMarquee } from '@/components/shared';
import { SuccessStoriesSectionServer } from '@/components/success-stories';
import { ReviewPlatformRowServer } from '@/components/testimonials';
import { AwardsSection, defaultAwardsContent } from '@/components/awards';
import AboutHero from './AboutHero';

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Our Journey of Growth and Impact */}
      <section className="full-bleed relative overflow-hidden py-16" style={{ background: '#141414' }}>
        {/* Cross icon bottom right */}
        <div className="pointer-events-none absolute right-0 bottom-0" aria-hidden>
          <Image src="/images/cros.png" alt="" width={220} height={220} className="object-contain" />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0" aria-hidden>
          <Image src="/images/cros.png" alt="" width={220} height={220} className="object-contain" />
        </div>

        <div className="site-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2
                className="mt-6"
                style={{
                  color: '#E5E5E5',
                  fontFamily: 'Inter',
                  fontSize: '34px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '140%',
                }}
              >
                Our Journey of Growth<br />and Impact
              </h2>
              <p className="mt-5 max-w-md" style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '26px' }}>
                Trusted by professionals and organizations alike, we are committed to delivering industry-relevant learning experiences that drive real career and business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="13" viewBox="0 0 24 13" fill="none"><g clipPath="url(#clip-stat1)"><path d="M23.7688 11.1451C23.7688 11.8309 23.346 12.1677 22.5004 12.1677H17.8845C18.0637 11.9093 18.1541 11.601 18.1634 11.2615H22.6558C22.7864 11.2615 22.8424 11.2125 22.8424 11.09C22.8424 9.57142 21.0828 8.15688 19.0496 8.15688C18.3325 8.15688 17.6494 8.33283 17.0677 8.62986C16.8701 8.39497 16.6405 8.17118 16.3828 7.96338C17.1402 7.51868 18.0586 7.25062 19.0496 7.25062C21.6548 7.25062 23.7688 9.11211 23.7688 11.1451ZM21.3812 4.02971C21.3812 5.41972 20.3367 6.55254 19.0496 6.55254C17.775 6.55254 16.718 5.42584 16.718 4.04195C16.718 2.68868 17.775 1.57422 19.0496 1.57422C20.3429 1.57422 21.3812 2.67031 21.3812 4.02971ZM17.6444 4.04195C17.6444 4.92372 18.2911 5.64016 19.0496 5.64016C19.8143 5.64016 20.461 4.92372 20.461 4.02971C20.461 3.16631 19.833 2.4866 19.0496 2.4866C18.2848 2.4866 17.6444 3.17855 17.6444 4.04195Z" fill="#FD022D"/><path d="M7.38426 7.96407C7.12717 8.17162 6.89809 8.39509 6.70078 8.62973C6.11915 8.33283 5.43617 8.15688 4.71917 8.15688C2.68601 8.15688 0.926426 9.57142 0.926426 11.09C0.926426 11.2125 0.982385 11.2615 1.11296 11.2615H5.60533C5.61473 11.601 5.70507 11.9093 5.88399 12.1677H1.26218C0.422798 12.1677 0 11.8309 0 11.1451C0 9.11211 2.11399 7.25062 4.71917 7.25062C5.70824 7.25062 6.62648 7.51893 7.38426 7.96407ZM7.05701 4.02971C7.05701 5.41972 6.00622 6.55254 4.72539 6.55254C3.44456 6.55254 2.39379 5.42584 2.39379 4.04195C2.39379 2.68868 3.44456 1.57422 4.72539 1.57422C6.01865 1.57422 7.05701 2.67031 7.05701 4.02971ZM3.32021 4.04195C3.32021 4.92372 3.96062 5.64016 4.72539 5.64016C5.49016 5.64016 6.13679 4.92372 6.13679 4.02971C6.13679 3.16631 5.50881 2.4866 4.72539 2.4866C3.95441 2.4866 3.32021 3.17855 3.32021 4.04195Z" fill="#FD022D"/><path d="M11.8874 6.49644C13.3671 6.49644 14.5733 5.20441 14.5733 3.62457C14.5733 2.05698 13.3734 0.826172 11.8874 0.826172C10.4076 0.826172 9.20131 2.08147 9.20131 3.63682C9.20131 5.21054 10.4076 6.49644 11.8874 6.49644ZM11.8874 5.57182C10.9796 5.57182 10.2024 4.72067 10.2024 3.63682C10.2024 2.57134 10.9609 1.75081 11.8874 1.75081C12.8138 1.75081 13.5723 2.55298 13.5723 3.62457C13.5723 4.70842 12.8013 5.57182 11.8874 5.57182ZM7.97646 12.1667H15.7858C16.8241 12.1667 17.3153 11.8606 17.3153 11.187C17.3153 9.58266 15.2573 7.26186 11.8811 7.26186C8.51114 7.26186 6.45312 9.58266 6.45312 11.187C6.45312 11.8606 6.94433 12.1667 7.97646 12.1667ZM7.67798 11.2421C7.51632 11.2421 7.45418 11.1992 7.45418 11.0706C7.45418 10.0603 9.03348 8.18649 11.8811 8.18649C14.735 8.18649 16.3143 10.0603 16.3143 11.0706C16.3143 11.1992 16.2459 11.2421 16.0842 11.2421H7.67798Z" fill="#FD022D"/></g><defs><clipPath id="clip-stat1"><rect width="24" height="13" fill="white"/></clipPath></defs></svg>, stat: '30,000+', label: 'Professionals Trained', bg: '#FFEAEE' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none"><g clipPath="url(#clip-stat2)"><path d="M17.1858 15.6871L17.002 15.7539C16.4432 15.9567 16.0396 16.2972 15.778 16.7224C14.9832 16.4627 14.0755 16.3106 13.0664 16.3106C8.58398 16.3106 6.10352 19.2989 6.10352 20.9102C6.10352 21.1153 6.21094 21.1836 6.46484 21.1836H15.4004V21.6719C15.4004 22.0304 15.4286 22.3578 15.4901 22.6582H6.92383C5.30273 22.6582 4.53125 22.17 4.53125 21.0957C4.53125 18.5372 7.76367 14.836 13.0664 14.836C14.6317 14.836 16.0168 15.1597 17.1858 15.6871ZM17.2852 9.03516C17.2852 11.5547 15.3906 13.6153 13.0664 13.6153C10.7422 13.6153 8.84766 11.5645 8.84766 9.05469C8.84766 6.57422 10.752 4.57227 13.0664 4.57227C15.4004 4.57227 17.2852 6.53516 17.2852 9.03516ZM10.4199 9.05469C10.4199 10.7832 11.6406 12.1407 13.0664 12.1407C14.502 12.1407 15.7129 10.7637 15.7129 9.03516C15.7129 7.32617 14.5215 6.04688 13.0664 6.04688C11.6211 6.04688 10.4199 7.35547 10.4199 9.05469Z" fill="#FD022D"/><path d="M21.4258 15.9297C21.9824 16.125 23.7891 16.7696 24.3652 17.0039C24.9414 17.2481 25.1562 17.6192 25.1562 18.1856V21.7012C25.1562 23.5762 24.0527 24.25 21.3965 25.8125C21.0938 25.9883 20.7227 25.9493 20.4883 25.8125C17.832 24.25 16.7383 23.5762 16.7383 21.7012V18.1856C16.7383 17.6192 16.9531 17.2481 17.5293 17.0039C18.0957 16.7696 19.9023 16.1446 20.3809 15.9688C20.7422 15.8223 21.1035 15.8223 21.4258 15.9297ZM22.7148 18.6934L20.332 22.0039L19.1309 20.7051C19.0332 20.5879 18.877 20.4903 18.6621 20.4903C18.3301 20.4903 18.0566 20.7637 18.0566 21.1055C18.0566 21.252 18.1055 21.4278 18.2227 21.5547L19.873 23.3614C20 23.4981 20.1953 23.5762 20.3613 23.5762C20.5762 23.5762 20.7715 23.4786 20.8691 23.3418L23.7109 19.3965C23.7988 19.2793 23.8477 19.1426 23.8477 19.0352C23.8477 18.6836 23.5547 18.4297 23.2324 18.4297C23.0078 18.4297 22.832 18.5372 22.7148 18.6934Z" fill="#FD022D"/></g><defs><clipPath id="clip-stat2"><rect width="26.4941" height="27.2393" fill="white"/></clipPath></defs></svg>, stat: '100+', label: 'Qualified Trainers', bg: '#FFEAEE' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none"><g clipPath="url(#clip-stat3)"><path d="M0 16.5137C0 17.3145 0.527344 17.627 1.10352 17.627C1.43555 17.627 1.71875 17.4316 2.08984 17.207C3.16406 16.4746 4.49219 16.0254 5.84961 16.0352C7.25586 16.0449 8.65234 16.5625 9.74609 17.6172C10.1758 18.0078 10.4883 18.1348 10.8496 18.1348C11.2012 18.1348 11.5234 18.0078 11.9434 17.6172C13.0371 16.5723 14.4336 16.0449 15.8496 16.0352C17.207 16.0254 18.5254 16.4746 19.5996 17.207C19.9707 17.4316 20.2539 17.627 20.5957 17.627C21.1621 17.627 21.6895 17.3145 21.6895 16.5137V3.26172C21.6895 3.0957 21.6797 2.95898 21.5723 2.79297C20.7031 1.2793 18.4961 0 15.8105 0C13.6816 0 11.8359 0.849609 10.8496 2.05078C9.86328 0.849609 8.00781 0 5.88867 0C3.19336 0 0.986328 1.2793 0.117188 2.79297C0.0195312 2.95898 0 3.0957 0 3.26172V16.5137ZM1.57227 15.6836V3.48633C2.36328 2.34375 4.08203 1.57227 5.88867 1.57227C7.74414 1.57227 9.36523 2.35352 10.0586 3.54492V15.8496C9.0625 15.0586 7.50977 14.4629 5.88867 14.4629C4.18945 14.4629 2.60742 14.9414 1.57227 15.6836ZM11.6309 15.8496V3.54492C12.3242 2.35352 13.9551 1.57227 15.8105 1.57227C17.6074 1.57227 19.3262 2.34375 20.1172 3.48633V15.6836C19.082 14.9414 17.5 14.4629 15.8105 14.4629C14.1797 14.4629 12.627 15.0586 11.6309 15.8496Z" fill="#FD022D"/></g><defs><clipPath id="clip-stat3"><rect width="22.0508" height="18.1543" fill="white"/></clipPath></defs></svg>, stat: '130+', label: 'Courses Available', bg: '#FFEAEE' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="33" height="22" viewBox="0 0 33 22" fill="none"><g clipPath="url(#clip-stat4)"><path d="M26.8281 4.6875V8.56035C26.573 8.52255 26.3118 8.50586 26.0469 8.50586C25.7787 8.50586 25.514 8.52307 25.2558 8.56218V5.12695C25.2558 4.50195 24.9433 4.18945 24.3183 4.18945H7.6582C7.0332 4.18945 6.7207 4.50195 6.7207 5.12695V16.2793H19.9401C20.1309 17.0972 20.4879 17.8517 20.9743 18.5059H3.00976C2.40429 18.5059 1.90625 18.0078 1.90625 17.3926C1.90625 16.7773 2.40429 16.2793 3.00976 16.2793H5.14843V4.6875C5.14843 3.32031 5.94922 2.61719 7.23828 2.61719H24.7382C26.0957 2.61719 26.8281 3.32031 26.8281 4.6875Z" fill="#FD022D"/><path d="M31.0078 14.8047C31.0078 17.5195 28.7421 19.7656 26.0468 19.7656C23.332 19.7656 21.0859 17.5391 21.0859 14.8047C21.0859 12.0898 23.332 9.84375 26.0468 9.84375C28.7714 9.84375 31.0078 12.0801 31.0078 14.8047ZM27.8144 12.6074L25.4316 15.9082L24.2304 14.6094C24.1328 14.502 23.9765 14.4043 23.7617 14.4043C23.4296 14.4043 23.1562 14.668 23.1562 15.0195C23.1562 15.1562 23.205 15.332 23.3222 15.459L24.9726 17.2754C25.0996 17.4121 25.2949 17.4805 25.4609 17.4805C25.6757 17.4805 25.871 17.3828 25.9687 17.2461L28.8105 13.3105C28.8984 13.1836 28.9472 13.0469 28.9472 12.9395C28.9472 12.5977 28.6542 12.334 28.332 12.334C28.1074 12.334 27.9316 12.4414 27.8144 12.6074Z" fill="#FD022D"/></g><defs><clipPath id="clip-stat4"><rect width="32.3438" height="21.1035" fill="white"/></clipPath></defs></svg>, stat: '100+', label: 'Enterprise Clients', bg: '#FFEAEE' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-6" style={{ background: '#1E1E1E' }}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: item.bg }}>
                    {item.icon}
                  </div>
                  <p style={{ color: '#FFFFFF', fontFamily: 'Inter', fontSize: '32px', fontWeight: 700 }}>{item.stat}</p>
                  <p className="mt-1" style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="full-bleed bg-white pt-16 pb-3 md:pt-20 md:pb-10">
        <div className="site-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl" style={{ height: '380px' }}>
              <Image src="/images/who-we.png" alt="Who We Are — Scale X Learning team" fill className="object-cover" />
            </div>
            <div>
              <h2
                style={{
                  color: '#1E293B',
                  fontFamily: 'Inter',
                  fontSize: '38px',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  lineHeight: '48px',
                }}
              >
                Who<br />We Are
              </h2>
              <p
                className="mt-6"
                style={{
                  color: '#4A5867',
                  fontFamily: 'Inter',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                Founded in 2016, Scale X Learning has grown into India&apos;s most trusted professional upskilling platform — helping working professionals, corporate teams, and fresh graduates build skills that actually matter in today&apos;s fast-moving industry.
              </p>
              <p className="mt-4" style={{ color: '#4A5867', fontFamily: 'Inter', fontSize: '15px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px' }}>
                From Agile and Scrum certifications to DevOps, Cloud, and project management — we deliver programs built around real-world outcomes, not just classroom hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="full-bleed bg-white pt-10 pb-16 md:pt-10 md:pb-20">
        <div className="site-container">
          <div className="mb-12 text-center">
            <h2
              style={{
                color: '#1E293B',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '34px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '140%',
              }}
            >
              What We Do
            </h2>
            <p
              className="mt-3"
              style={{
                color: '#788593',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              We provide career-transforming programs built for working professionals,<br />
              corporate teams, and enterprise learners across India.
            </p>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              {[
                { title: 'Certification & Exam Prep Programs', desc: 'Globally accredited certifications in Agile, Scrum, PMP, DevOps, and more — with 100% exam pass guarantee.' },
                { title: 'Enterprise & Corporate Training', desc: 'Custom learning pathways for organizations, built around business objectives, team roles, and skill gaps.' },
                { title: 'Technical Learning Tracks', desc: 'Hands-on programs in Cloud, DevOps, Software Testing, and Data — taught by practitioners, not just trainers.' },
                { title: 'Interview Bootcamps', desc: 'Role-specific preparation combining mock interviews, case studies, and real-world problem-solving sessions.' },
                { title: 'Career Mentorship & Placement Support', desc: 'Lifelong access to our career network, placement assistance, and mentor connect for every enrolled professional.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center" style={{ borderRadius: '16px', background: '#F8F9FB' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 18 15" fill="none" aria-hidden>
                      <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="#FD022D" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '18px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}>{item.title}</p>
                    <p className="mt-1" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '15px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-2xl" style={{ height: '480px' }}>
              <Image src="/images/what-do.png" alt="What We Do — Scale X Learning" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us Every Day */}
      <section className="full-bleed bg-surface pt-10 pb-16 md:py-20  md:pb-10">
        <div className="site-container">
          <h2
            className="mb-10 text-center"
            style={{
              color: '#1E293B',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '34px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '140%',
            }}
          >
            What Drives Us Every Day
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[{ title: 'Our Mission' }, { title: 'Our Vision' }].map((card) => (
              <div key={card.title} className="interactive-card rounded-2xl border border-zinc-100 bg-white p-8">
                <h3 style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '26px', fontStyle: 'normal', fontWeight: 700, lineHeight: '36px' }}>{card.title}</h3>
                <div className="mt-2 h-[3px] w-10 rounded-full bg-brand" />
                <p className="mt-5" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '15px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>
                  Enable learners and professionals to gain practical, industry-relevant skills that drive career success and measurable impact. We bridge the gap between classroom learning and boardroom execution.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-100 bg-white px-6 py-8 shadow-sm md:px-10">
            <p className="mb-6 text-center text-[22px] font-semibold leading-normal text-heading md:text-[28px]">
              In Collaboration with{' '}<span className="font-semibold text-brand">World-Class</span>{' '}Certifying Bodies
            </p>
            <div className="w-full min-w-0 overflow-hidden py-5">
              <LogoMarquee
                logos={[
                  { alt: 'Google', src: '/images/hero/google.png' },
                  { alt: 'IBM', src: '/images/hero/ibm.png' },
                  { alt: 'Infosys', src: '/images/hero/infosys.png' },
                  { alt: 'Stanford', src: '/images/hero/stanford.png' },
                  { alt: 'Deloitte' },
                  { alt: 'TCS', src: '/images/hero/tcs.png' },
                ]}
                size="md"
                largeOnMobile
                ariaLabel="Certifying body partners"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Minds Behind Scale X Learning */}
      <section className="full-bleed bg-surface pt-6 pb-16 md:py-20 md:pt-10 md:pb-10">
        <div className="site-container">
          <div className="mb-10 text-center">
            <h2 style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '36px', fontWeight: 700 }}>The Minds Behind Scale X Learning</h2>
            <p className="mt-3" style={{ color: '#788593', textAlign: 'center', fontFamily: 'Inter', fontSize: '18px', fontStyle: 'normal', fontWeight: 500, lineHeight: '26px' }}>
              Visionary leaders with decades of combined experience in ed-tech, corporate training, and professional development.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { img: '/images/pranee.png', name: 'Praneeth Kuridi', role: 'Founder & CEO', bio: '12+ years in tech education and enterprise training leadership across India.' },
              { img: '/images/naray.png', name: 'Narayana Ajay', role: 'Co-Founder & CTO', bio: 'Technology architect driving EdgeX platform innovation and AI-powered learning.' },
              { img: '/images/narasim.png', name: 'Narasimha', role: 'Head of Learning Design', bio: 'Ex-L&D Director at top MNCs. Curriculum architect for 130+ programs.' },
              { img: '/images/ram.png', name: 'Ram Charan', role: 'VP — Enterprise Sales', bio: 'Grew EdgeX enterprise client portfolio to 100+ organisations across India.' },
              { img: '/images/aninth.png', name: 'Anitha Reddy', role: 'Head — Career Success', bio: 'Mentored 5,000+ professionals through career transitions and salary negotiations.' },
            ].map((person) => (
              <div key={person.name} className="interactive-card flex flex-col rounded-2xl border border-zinc-100 bg-white p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="interactive-card-media relative h-28 w-28 overflow-hidden rounded-full mb-3">
                    <Image src={person.img} alt={person.name} fill className="object-cover" />
                  </div>
                  <p className="interactive-card-title" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700 }}>{person.name}</p>
                  <p className="mt-0.5" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '12px', fontWeight: 400 }}>{person.role}</p>
                </div>
                <div className="mt-4 mb-2 h-px w-full bg-zinc-100" />
                <p className="text-center" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400, lineHeight: '20px' }}>{person.bio}</p>
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  <span style={{ color: '#E0001B', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600 }}>View Profile on</span>
                  <Image
                    src="/images/image 20233.png"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] rounded-full object-contain"
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SuccessStoriesSectionServer compact />

      <div className="full-bleed bg-surface pt-0 pb-6">
        <div className="site-container">
          <div className="rounded-2xl border border-zinc-100 bg-white px-0 py-6 shadow-sm md:px-10">
            <ReviewPlatformRowServer />
          </div>
        </div>
      </div>

      {/* Scale X Learning in the News */}
      <section className="full-bleed bg-surface pt-6 pb-16 md:pt-10 md:pb-20">
        <div className="site-container">
          <h2 className="mb-10 text-center" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '36px', fontWeight: 700 }}>
            Scale X Learning in the News
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { logo: '/images/the-eco.png', logoAlt: 'The Economic Times' },
              { logo: '/images/yours.png', logoAlt: 'YourStory' },
              { logo: '/images/inc.png', logoAlt: 'Inc42' },
              { logo: '/images/bussine.png', logoAlt: 'Business Standard' },
            ].map((item) => (
              <div key={item.logoAlt} className="interactive-card flex flex-col rounded-2xl border border-zinc-100 bg-white p-6">
                <div className="relative h-8 w-36">
                  <Image src={item.logo} alt={item.logoAlt} fill className="object-contain object-left" />
                </div>
                <div className="mt-3 h-[2px] w-8 rounded-full bg-brand" />
                <p className="interactive-card-title mt-4 flex-1" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, lineHeight: '22px' }}>
                  EdgeX Learning Emerges as Top EdTech Platform in India&apos;s Professional Upskilling Space
                </p>
                <p className="mt-4" style={{ color: '#788593', fontFamily: 'Inter', fontSize: '13px', fontWeight: 400 }}>March 2025</p>
                <Link href="#" className="mt-2 inline-flex items-center gap-1.5" style={{ color: '#E0001B', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600 }}>
                  Read More
                  <svg width="14" height="12" viewBox="0 0 18 15" fill="none" aria-hidden>
                    <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" fill="#E0001B" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AwardsSection {...defaultAwardsContent} className="pb-12 md:pb-16" />

      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
