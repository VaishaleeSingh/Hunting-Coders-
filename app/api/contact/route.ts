// IMPORTANT: Create this file at: app/api/contact/route.ts
// NOT at app/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Contact form submission received');
    const body = await request.json();
    console.log('📝 Form data:', body);
    const { name, email, message } = body;

    // Validate the data
    if (!name || !email || !message) {
      console.log('❌ Validation failed - missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create contact entry with timestamp
    const contactEntry = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    // Path to the contacts file
    const filePath = path.join(process.cwd(), 'data', 'contacts.json');
    console.log('📁 File path:', filePath);
    
    // Ensure the data directory exists
    const dirPath = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dirPath)) {
      console.log('📂 Creating data directory...');
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Read existing contacts or create empty array
    let contacts = [];
    if (fs.existsSync(filePath)) {
      console.log('📖 Reading existing contacts...');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      contacts = JSON.parse(fileContent);
    } else {
      console.log('📄 No existing file found, creating new one');
    }

    // Add new contact
    contacts.push(contactEntry);
    console.log('✅ Adding contact. Total contacts:', contacts.length);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
    console.log('💾 File saved successfully!');

    return NextResponse.json(
      { message: 'Contact form submitted successfully!', data: contactEntry },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error saving contact:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to save contact form', details: error.message },
      { status: 500 }
    );
  }
}