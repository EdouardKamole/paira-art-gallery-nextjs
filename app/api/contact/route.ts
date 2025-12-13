// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Write token
  apiVersion: '2024-01-01',
  useCdn: false, // Important for write operations
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      contactMethod,
      contactInfo,
      photoshootType,
      location,
      needServices,
      budget,
      message,
    } = body;

    // Validate required fields
    if (!name || !contactMethod || !contactInfo || !photoshootType || !location || !needServices || !budget || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create document in Sanity
    const result = await client.create({
      _type: 'contact',
      name,
      preferredContact: contactMethod,
      contactInfo,
      photoshootType,
      location,
      additionalServices: needServices,
      budget,
      detailedRequest: message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    console.log('✅ Contact form submitted successfully:', result._id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been submitted successfully!',
        id: result._id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    );
  }
}