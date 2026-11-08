import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  return NextResponse.redirect(url);
}
