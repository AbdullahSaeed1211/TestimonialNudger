import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract id from context
  const { id } = await params;
  
  // Return a simple JSON response for testing
  return NextResponse.json({
    success: true,
    message: `Fetched data for testimonial ID: ${id}`
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract id from context
  const { id } = await params;
  
  // Return a simple JSON response for testing
  return NextResponse.json({
    success: true,
    message: `Updated testimonial ID: ${id}`
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract id from context
  const { id } = await params;
  
  // Return a simple JSON response for testing
  return NextResponse.json({
    success: true,
    message: `Deleted testimonial ID: ${id}`
  });
} 