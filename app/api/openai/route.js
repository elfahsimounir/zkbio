import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set correctly
});

export async function POST(req) {
  try {
    console.log("API route hit");
    const body = await req.json();
    console.log("Request body:", body);

    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      console.error("Invalid prompt:", prompt);
      return NextResponse.json({ error: "Invalid prompt provided" }, { status: 400 });
    }

    console.log("Calling OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Ensure this is correct or use "gpt-3.5-turbo" to test
      messages: [{ role: "user", content: prompt }],
      store: true,
    });

    console.log("OpenAI API response:", completion);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error in API route:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
