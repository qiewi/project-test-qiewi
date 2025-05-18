import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page[number]') || '1';
  const size = searchParams.get('page[size]') || '10';
  const sort = searchParams.get('sort') || '-published_at';
  const append = searchParams.getAll('append[]');

  const apiUrl = new URL('https://suitmedia-backend.suitdev.com/api/ideas');
  apiUrl.searchParams.set('page[number]', page);
  apiUrl.searchParams.set('page[size]', size);
  apiUrl.searchParams.set('sort', sort);
  append.forEach(a => apiUrl.searchParams.append('append[]', a));

  try {
    const res = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 