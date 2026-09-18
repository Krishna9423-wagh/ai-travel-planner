import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    // Return mock predictions for demo
    const mockPredictions = [
      { place_id: '1', description: `${input} City Center`, structured_formatting: { main_text: input, secondary_text: 'Famous destination' } },
      { place_id: '2', description: `${input} Old Town`, structured_formatting: { main_text: `${input} Old Town`, secondary_text: 'Historic district' } },
    ];
    return NextResponse.json({ predictions: mockPredictions });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ predictions: [] }, { status: 500 });
  }
}
