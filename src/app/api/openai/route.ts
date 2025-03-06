import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    // Make a request to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'How are you?',
        },
      ],
      max_tokens: 20,
    });

    // Return the response
    return NextResponse.json({ 
      success: true, 
      message: response.choices[0].message.content 
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get response from OpenAI' },
      { status: 500 }
    );
  }
} 