import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  // Extract token from context
  const { token } = await params;
  
  // Return a simple JSON response for testing
  return NextResponse.json({
    success: true,
    message: `Fetched data for token: ${token}`
  });
} 