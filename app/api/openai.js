// app/api/openai.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

export async function POST(request) {
    const { prompt } = await request.json();
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });
      
      return NextResponse.json({ result: response.choices[0].message.content });
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      return NextResponse.json({ error: 'Error fetching response from OpenAI: ' + error.message }, { status: 500 });
    }
  }