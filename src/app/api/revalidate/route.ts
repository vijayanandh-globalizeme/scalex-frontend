import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/revalidate
// Body: { secret: string; courseUri?: string; tags?: string[] }
//
// Call this from the admin API after saving a course to instantly flush
// the Next.js fetch cache without waiting for the revalidate window.

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Revalidation not configured.' }, { status: 500 });
  }

  let body: { secret?: string; courseUri?: string; tags?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: 'Invalid secret.' }, { status: 401 });
  }

  const flushed: string[] = [];

  // Flush by explicit tag list
  if (body.tags?.length) {
    for (const tag of body.tags) {
      revalidateTag(tag, 'default');
      flushed.push(tag);
    }
  }

  // Flush all tags for a specific course URI
  if (body.courseUri) {
    const uri = body.courseUri;
    const courseTags = [
      `course-${uri}`,
      `course-${uri}-details`,
      `course-${uri}-learners`,
      `course-${uri}-trainers`,
      `course-${uri}-reviews`,
      `course-${uri}-locations`,
      `course-${uri}-related`,
      `course-${uri}-plans`,
    ];
    for (const tag of courseTags) {
      revalidateTag(tag, 'default');
      flushed.push(tag);
    }
  }

  if (!flushed.length) {
    return NextResponse.json({ error: 'Provide courseUri or tags.' }, { status: 400 });
  }

  return NextResponse.json({ revalidated: true, flushed });
}
