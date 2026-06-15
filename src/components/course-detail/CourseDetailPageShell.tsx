'use client';

import type { ReactNode } from 'react';
import type { CourseLeadFormProps } from './CourseLeadForm';
import { CourseBrochureModalProvider } from './CourseBrochureModalContext';

export default function CourseDetailPageShell({
  form,
  children,
}: {
  form: CourseLeadFormProps;
  children: ReactNode;
}) {
  return <CourseBrochureModalProvider form={form}>{children}</CourseBrochureModalProvider>;
}
