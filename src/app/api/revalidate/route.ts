import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path, tag, secret } = await request.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (path) {
      revalidatePath(path as string);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    if (tag) {
      revalidateTag(tag as string, {});
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    return NextResponse.json({ message: 'Missing path or tag to revalidate' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
