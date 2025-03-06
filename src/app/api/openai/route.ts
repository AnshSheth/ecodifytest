import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { extractedText } = body;

    // Prepare the content for OpenAI
    const content = extractedText 
      ? `The following is text extracted from an uploaded document: ${extractedText.substring(0, 1000)}... How are you?`
      : 'How are you?';

    // Make a request to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
      max_tokens: 20,
    });

    // Return the response
    return NextResponse.json({ 
      success: true, 
      message: response.choices[0].message.content,
      usedExtractedText: !!extractedText
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get response from OpenAI' },
      { status: 500 }
    );
  }
} 