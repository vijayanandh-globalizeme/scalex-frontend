import type { CoursePrepComparisonContent } from '@/lib/courseBody';

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clip0_883_19751)">
        <path d="M15.715 7.9961C15.715 12.4018 12.1945 15.9922 7.85749 15.9922C3.52817 15.9922 0 12.4018 0 7.9961C0 3.58256 3.52817 0 7.85749 0C12.1945 0 15.715 3.58256 15.715 7.9961ZM10.2532 4.88389L6.96389 10.2617L5.40009 8.20775C5.20751 7.94906 5.03804 7.8785 4.81464 7.8785C4.46798 7.8785 4.19837 8.16858 4.19837 8.5213C4.19837 8.7016 4.2677 8.87411 4.38325 9.03088L6.3168 11.4454C6.51709 11.7198 6.73279 11.8295 6.99471 11.8295C7.25662 11.8295 7.48002 11.7041 7.64179 11.4454L11.2624 5.6443C11.3548 5.47968 11.455 5.29937 11.455 5.12691C11.455 4.75846 11.1391 4.52329 10.8002 4.52329C10.5999 4.52329 10.3996 4.64871 10.2532 4.88389Z" fill="#43BE11" fillOpacity="0.85"/>
      </g>
      <defs>
        <clipPath id="clip0_883_19751">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clip0_883_19822)">
        <path d="M15.715 7.9961C15.715 12.4018 12.1945 15.9922 7.85749 15.9922C3.52817 15.9922 0 12.4018 0 7.9961C0 3.58256 3.52817 0 7.85749 0C12.1945 0 15.715 3.58256 15.715 7.9961ZM10.1377 4.79766L7.86583 7.09323L5.60039 4.79766C5.47713 4.67223 5.32307 4.60952 5.15359 4.60952C4.79923 4.60952 4.51421 4.89173 4.51421 5.2445C4.51421 5.4248 4.58354 5.58158 4.69909 5.70702L6.96035 8.00816L4.69909 10.293C4.58354 10.4263 4.51421 10.5752 4.51421 10.7555C4.51421 11.1162 4.79923 11.4141 5.15359 11.4141C5.33847 11.4141 5.49254 11.3356 5.61579 11.218L7.86359 8.92733L10.1146 11.218C10.2378 11.3356 10.3919 11.4141 10.5768 11.4141C10.9235 11.4141 11.2085 11.1162 11.2085 10.7555C11.2085 10.5752 11.1469 10.4263 11.0236 10.293L8.76714 8.00654L11.0236 5.70702C11.1469 5.58158 11.2085 5.4248 11.2085 5.2445C11.2085 4.89173 10.9235 4.60952 10.5768 4.60952C10.3996 4.60952 10.2532 4.67223 10.1377 4.79766Z" fill="#D61534" fillOpacity="0.85"/>
      </g>
      <defs>
        <clipPath id="clip0_883_19822">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export default function CoursePrepComparisonSection({
  content,
}: {
  content: CoursePrepComparisonContent;
}) {
  return (
    <section className="relative scroll-mt-[116px] pt-[22px]">
      <div className="rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)] p-6 md:p-8">
        <h2 className="text-[24px] font-bold leading-[140%] text-[#1E293B] md:text-[28px]">
          {content.heading}
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col />
              {content.columns.map((col, i) => (
                <col key={col} style={i === content.columns.length - 1 ? { width: '287px' } : { width: '300px' }} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[#1E293B]">
                  Offerings
                </th>
                {content.columns.map((col, i) => (
                  <th key={col} className="py-4 text-[14px] font-bold text-[#1E293B]"
                    style={i === content.columns.length - 1 ? {
                      background: 'linear-gradient(90deg,rgba(255,239,242,0.5) 0%,rgba(255,255,255,0) 100%)',
                      borderRadius: '0 0 20px 0',
                    } : undefined}
                  >
                    <div className="flex justify-center">{col}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row.offering} className="border-b border-[#EBEBEB]">
                  <td className="py-4 text-[14px] font-normal text-[#1E293B]">{row.offering}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className="py-4"
                      style={j === row.values.length - 1 ? {
                        background: 'linear-gradient(90deg,rgba(255,239,242,0.5) 0%,rgba(255,255,255,0) 100%)',
                      } : undefined}
                    >
                      <div className="flex justify-center">
                        {val ? <CheckIcon /> : <CrossIcon />}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
