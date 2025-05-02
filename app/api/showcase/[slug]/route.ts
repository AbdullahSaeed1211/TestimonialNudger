import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Extract slug from context
  const { slug } = await params;
  
  // Return a simple JSON response for testing
  return NextResponse.json({
    success: true,
    message: `Fetched data for slug: ${slug}`
  });
} 