'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { CourseBodyContent } from '@/lib/courseBody';

const CAREER_CARD =
  'overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

const TAB_BAR_SCROLL =
  'flex h-[48px] items-stretch gap-6 overflow-x-auto rounded-lg bg-[#FCFCFC] px-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 md:px-6 [&::-webkit-scrollbar]:hidden';

const CAREER_COLUMN_DIVIDER =
  'relative before:pointer-events-none before:absolute before:bg-[#EBEBEB] before:content-[""] max-md:before:top-0 max-md:before:left-1/2 max-md:before:h-px max-md:before:w-[80%] max-md:before:-translate-x-1/2 md:before:top-1/2 md:before:left-0 md:before:h-[80%] md:before:w-px md:before:-translate-y-1/2';

function ColumnIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
      {children}
    </span>
  );
}

function ColumnHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <ColumnIcon>{icon}</ColumnIcon>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold leading-tight text-heading">{title}</p>
        <p className="mt-0.5 text-[12px] text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function CareerBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto pt-5">
      <span className="inline-flex h-[33px] w-full items-center justify-center whitespace-nowrap rounded-lg bg-[#FFF6F7] px-3 text-[11px] font-medium leading-none text-brand">
        {children}
      </span>
    </div>
  );
}

function RupeeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-career-rupee-clip)">
        <path
          d="M6.91882 13.9847C7.32859 13.9847 7.62804 13.7088 7.62804 13.318C7.62804 13.0728 7.50984 12.8889 7.30495 12.6973L2.2301 8.13025H3.24665C5.70527 8.13025 7.66744 6.96551 7.98265 4.56705H9.18831C9.48776 4.56705 9.70837 4.35249 9.70837 4.06897C9.70837 3.77777 9.48776 3.56322 9.18831 3.56322H7.99841C7.90385 2.48276 7.43892 1.59387 6.64301 0.996167L9.18831 1.00383C9.48776 1.00383 9.70837 0.789272 9.70837 0.505747C9.70837 0.21456 9.48776 0.00766283 9.18831 0.00766283L0.559494 0C0.220646 0 0.0078802 0.237548 0.0078802 0.62069V0.727969C0.0078802 1.09578 0.220646 1.32567 0.559494 1.32567H3.23089C4.89361 1.32567 6.1702 2.01533 6.37509 3.56322H0.520093C0.220646 3.56322 0 3.77777 0 4.06897C0 4.35249 0.220646 4.56705 0.520093 4.56705H6.38297C6.17808 6.16092 4.83057 6.78161 3.17573 6.78161H0.906226C0.449172 6.78161 0.0472813 7.05747 0.0472813 7.55556V7.59386C0.0472813 7.96931 0.228526 8.20691 0.520093 8.47511L6.18597 13.6168C6.41449 13.8315 6.61149 13.9847 6.91882 13.9847Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-career-rupee-clip">
          <rect width="10" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-career-building-clip)">
        <path
          d="M3.09104 22H10.909C11.5831 22 12 21.5641 12 20.8974V8.10256C12 7.42949 11.5831 7 10.909 7H3.09104C2.41696 7 2 7.42949 2 8.10256V20.8974C2 21.5641 2.41696 22 3.09104 22ZM3.4385 21.0192C3.18833 21.0192 3.0563 20.9102 3.0563 20.6731V8.32692C3.0563 8.08974 3.18833 7.97436 3.4385 7.97436H10.5615C10.8187 7.97436 10.9438 8.08974 10.9438 8.32692V20.6731C10.9438 20.9102 10.8187 21.0192 10.5615 21.0192H3.4385ZM4.83531 11.5064H6.18347C6.35721 11.5064 6.46839 11.4038 6.46839 11.2436V10.032C6.46839 9.8782 6.35721 9.76923 6.18347 9.76923H4.83531C4.66157 9.76923 4.55734 9.8782 4.55734 10.032V11.2436C4.55734 11.4038 4.66157 11.5064 4.83531 11.5064ZM7.8096 11.5064H9.15777C9.33147 11.5064 9.4427 11.4038 9.4427 11.2436V10.032C9.4427 9.8782 9.33147 9.76923 9.15777 9.76923H7.8096C7.64282 9.76923 7.53163 9.8782 7.53163 10.032V11.2436C7.53163 11.4038 7.64282 11.5064 7.8096 11.5064ZM4.83531 14.0448H6.18347C6.35721 14.0448 6.46839 13.9423 6.46839 13.782V12.5705C6.46839 12.4167 6.35721 12.3077 6.18347 12.3077H4.83531C4.66157 12.3077 4.55734 12.4167 4.55734 12.5705V13.782C4.55734 13.9423 4.66157 14.0448 4.83531 14.0448ZM7.8096 14.0448H9.15777C9.33147 14.0448 9.4427 13.9423 9.4427 13.782V12.5705C9.4427 12.4167 9.33147 12.3077 9.15777 12.3077H7.8096C7.64282 12.3077 7.53163 12.4167 7.53163 12.5705V13.782C7.53163 13.9423 7.64282 14.0448 7.8096 14.0448ZM4.83531 16.5833H6.18347C6.35721 16.5833 6.46839 16.4743 6.46839 16.3205V15.109C6.46839 14.9487 6.35721 14.8461 6.18347 14.8461H4.83531C4.66157 14.8461 4.55734 14.9487 4.55734 15.109V16.3205C4.55734 16.4743 4.66157 16.5833 4.83531 16.5833ZM7.8096 16.5833H9.15777C9.33147 16.5833 9.4427 16.4743 9.4427 16.3205V15.109C9.4427 14.9487 9.33147 14.8461 9.15777 14.8461H7.8096C7.64282 14.8461 7.53163 14.9487 7.53163 15.109V16.3205C7.53163 16.4743 7.64282 16.5833 7.8096 16.5833ZM4.9604 21.4871H5.82211V19.4423C5.82211 19.3141 5.88465 19.25 6.03754 19.25H7.96944C8.11537 19.25 8.18487 19.3141 8.18487 19.4423V21.4871H9.04657V19.2179C9.04657 18.6987 8.80335 18.4487 8.25436 18.4487H5.75262C5.20362 18.4487 4.9604 18.6987 4.9604 19.2179V21.4871Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-career-building-clip">
          <rect width="14.4141" height="22.8613" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="11"
      viewBox="0 0 17 11"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-career-demand-clip)">
        <path
          d="M7.24278 6.73872C7.01027 6.91439 6.80311 7.10359 6.62477 7.30213C6.09821 7.05059 5.47908 6.90155 4.82774 6.90155C2.98762 6.90155 1.39511 8.09846 1.39511 9.3834C1.39511 9.48707 1.45138 9.52851 1.56392 9.52851H5.63536C5.6438 9.81581 5.7249 10.0766 5.88621 10.2953H1.7046C0.939295 10.2953 0.556641 10.0104 0.556641 9.43003C0.556641 7.70982 2.46991 6.13472 4.82774 6.13472C5.72528 6.13472 6.55706 6.36185 7.24278 6.73872ZM6.9436 3.40932C6.9436 4.58549 5.99259 5.54403 4.83336 5.54403C3.67414 5.54403 2.72314 4.59067 2.72314 3.41969C2.72314 2.27461 3.67414 1.3316 4.83336 1.3316C6.00382 1.3316 6.9436 2.25906 6.9436 3.40932ZM3.5616 3.41969C3.5616 4.1658 4.14684 4.77202 4.83336 4.77202C5.52552 4.77202 6.11077 4.1658 6.11077 3.40932C6.11077 2.67875 5.5424 2.10362 4.83336 2.10362C4.14121 2.10362 3.5616 2.68912 3.5616 3.41969Z"
          fill="#FD022D"
        />
        <path
          d="M11.3167 5.4974C12.656 5.4974 13.7476 4.40414 13.7476 3.06736C13.7476 1.74093 12.6616 0.699478 11.3167 0.699478C9.983 0.699478 8.88569 1.76165 8.88569 3.07772C8.88569 4.40933 9.983 5.4974 11.3167 5.4974ZM11.3167 4.71503C10.4951 4.71503 9.7917 3.99482 9.7917 3.07772C9.7917 2.17616 10.4839 1.48186 11.3167 1.48186C12.1552 1.48186 12.8417 2.16062 12.8417 3.06736C12.8417 3.98446 12.1495 4.71503 11.3167 4.71503ZM7.78278 10.2953H14.8506C15.7847 10.2953 16.2293 10.0363 16.2293 9.46633C16.2293 8.10881 14.3666 6.14506 11.3167 6.14506C8.26105 6.14506 6.39844 8.10881 6.39844 9.46633C6.39844 10.0363 6.843 10.2953 7.78278 10.2953ZM7.51264 9.51297C7.36633 9.51297 7.30445 9.47667 7.30445 9.36785C7.30445 8.51295 8.73373 6.92744 11.3167 6.92744C13.8939 6.92744 15.3233 8.51295 15.3233 9.36785C15.3233 9.47667 15.267 9.51297 15.1207 9.51297H7.51264Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-career-demand-clip">
          <rect width="17" height="11" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SalaryChart() {
  return (
    <div className="relative mt-5 w-full">
      <Image
        src="/images/course/graph-1.png"
        alt="Average salary range chart"
        width={400}
        height={148}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function DemandRing({ percent, label }: { percent: number; label: string }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[95px] w-[95px]">
        <svg width="95" height="95" viewBox="0 0 108 108" className="-rotate-90" aria-hidden>
          <circle cx="54" cy="54" r={radius - 4} fill="#FFF" />
          <circle cx="54" cy="54" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="8" />
          <circle
            cx="54"
            cy="54"
            r={radius}
            fill="none"
            stroke="#FD022D"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-center text-[20px] font-semibold leading-[140%] text-black">
          {percent}%
        </span>
      </div>
      <p className="mt-3 max-w-[190px] whitespace-pre-line text-center text-[14px] font-normal leading-[140%] text-muted">
        {label}
      </p>
    </div>
  );
}

export default function CourseCareerSection({
  career,
  sectionId,
}: {
  career: CourseBodyContent['career'];
  sectionId?: string;
}) {
  const [activeTabId, setActiveTabId] = useState(career.tabs[0]?.id ?? '');
  const activeTab = career.tabs.find((tab) => tab.id === activeTabId) ?? career.tabs[0];

  if (!activeTab) return null;

  return (
    <div
      id={sectionId}
      className={`px-6 py-5 md:px-8 md:py-6${sectionId ? ' scroll-mt-[116px]' : ''}`}
    >
      <h3 className="text-[20px] font-semibold leading-[140%] text-heading">{career.title}</h3>

      <div
        className={`mt-4 ${CAREER_CARD}`}
        role="tablist"
        aria-label={career.title}
      >
        <div className={TAB_BAR_SCROLL}>
          {career.tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex h-full shrink-0 items-center border-0 border-b-[3px] bg-transparent px-0 text-center text-[16px] font-medium leading-[140%] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-b-brand text-brand'
                    : 'border-b-transparent text-heading hover:text-brand'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        className={`mt-4 ${CAREER_CARD}`}
      >
        <div className="grid md:grid-cols-3 md:items-stretch">
          <div className="flex min-w-0 flex-col p-5 md:p-6">
            <ColumnHeader
              icon={<RupeeIcon />}
              title="Average Salary"
              subtitle={career.salarySubtitle}
            />
            <div className="flex flex-1 flex-col">
              <SalaryChart />
            </div>
            <CareerBadge>{career.salaryBadge}</CareerBadge>
          </div>

          <div className={`flex min-w-0 flex-col p-5 md:p-6 ${CAREER_COLUMN_DIVIDER}`}>
            <ColumnHeader
              icon={<BuildingIcon />}
              title="Top Hiring Companies"
              subtitle={career.companiesSubtitle}
            />
            <div className="mt-5 flex flex-1 flex-col">
              <div className="grid grid-cols-2 gap-3">
                {activeTab.companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex h-[43px] items-center justify-center rounded-lg bg-[#F4F4F4] px-3"
                  >
                    <Image
                      src={company.logoSrc}
                      alt={company.logoAlt}
                      width={120}
                      height={31}
                      className="h-auto max-h-[31px] w-auto max-w-full object-contain"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            </div>
            <CareerBadge>{career.companiesBadge}</CareerBadge>
          </div>

          <div className={`flex min-w-0 flex-col p-5 md:p-6 ${CAREER_COLUMN_DIVIDER}`}>
            <ColumnHeader icon={<PeopleIcon />} title="Demand" subtitle={career.demandSubtitle} />
            <div className="flex flex-1 flex-col items-center justify-center">
              <DemandRing percent={activeTab.demandPercent} label={activeTab.demandLabel} />
            </div>
            <CareerBadge>{career.demandBadge}</CareerBadge>
          </div>
        </div>
      </div>
    </div>
  );
}
