// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log('✅ Contact form submitted to Sanity:', result._id);

    // Send confirmation email to CLIENT
    try {
      await resend.emails.send({
        from: 'Paira Art <onboarding@resend.dev>',
        to: contactInfo, // Client's email
        replyTo: 'eddy.programmer@gmail.com',
        subject: 'Thank you for contacting Paira Art! 📸',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hello ${name}! 👋</h2>
            <p>Thank you for reaching out to <strong>Paira Art</strong>! We've received your inquiry and we're excited to work with you.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Your Inquiry Details:</h3>
              <p><strong>Photoshoot Type:</strong> ${photoshootType}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Additional Services:</strong> ${needServices}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              <p><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p>We'll review your request and get back to you within 24-48 hours via ${contactMethod}.</p>
            
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>Paira Art Team</strong> 📸
            </p>
          </div>
        `,
      });
      console.log('✅ Confirmation email sent to client:', contactInfo);
    } catch (emailError) {
      console.error('⚠️ Failed to send client email:', emailError);
      console.error('⚠️ Client email address was:', contactInfo);
      // Continue anyway - Sanity submission was successful
    }

    // Send notification email to YOU (Admin)
    try {
      await resend.emails.send({
        from: 'Paira Art Notifications <onboarding@resend.dev>',
        to: 'eddy.programmer@gmail.com',
        subject: `🔔 New Contact Form Submission - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission! 🎉</h2>
            
            <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2e7d32;">Client Information:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Contact Method:</strong> ${contactMethod}</p>
              <p><strong>Contact Info:</strong> ${contactInfo}</p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Project Details:</h3>
              <p><strong>Photoshoot Type:</strong> ${photoshootType}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Additional Services:</strong> ${needServices}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px;">${message}</p>
            </div>
            
            <p><strong>Sanity Document ID:</strong> ${result._id}</p>
            <p style="color: #666; font-size: 14px;">
              View this submission in your Sanity Studio to respond.
            </p>
          </div>
        `,
      });
      console.log('✅ Notification email sent to admin');
    } catch (emailError) {
      console.error('⚠️ Failed to send admin email:', emailError);
      // Continue anyway - Sanity submission was successful
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been submitted successfully! Check your email for confirmation.',
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