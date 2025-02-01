import { NextResponse } from 'next/server';
import { client } from '../../../sanity/client';

export async function POST(request: Request) {
  try {
    const { email, supabaseId } = await request.json();

    const doc = {
      _type: 'user',
      email,
      supabaseId,
      fullName: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    };

    await client.create(doc);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to create user profile' },
      { status: 500 }
    );
  }
}