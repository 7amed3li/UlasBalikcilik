import { NextResponse } from 'next/server';
import { getLivePricesMap } from '@/lib/services/priceService';

export async function GET() {
  try {
    const pricesMap = await getLivePricesMap();
    return NextResponse.json(
      { success: true, data: pricesMap },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error("API /api/prices error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to load prices' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
