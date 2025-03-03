import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ScriptRequest, ApiResponse } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { idea, niche, duration } = (await request.json()) as ScriptRequest;
    const messages = [
      {
        role: "system",
        content:
          "Adjust this message according to the application's needs and the type of response you expect. Return each script line and suggested pause separately for a short video.",
      },
      {
        role: "user",
        content: `Generate a script for a short-format video based on the idea: "${idea}". The niche is "${niche}" and the total desired duration is ${duration} seconds. Include pauses in seconds in the script text using the format "[pause X seconds]". Return each line separately with its recommended pause.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const assistantMessage = completion.choices[0].message?.content || "";
    const rawLines = assistantMessage.split("\n").filter((line) => line.trim());
    const processedLines = rawLines.map((line) => {
      // Find [pause X seconds]
      const match = line.match(/\[pause\s*(\d+)\s*seconds?\]/i);
      let pauseTime = 1;
      if (match && match[1]) pauseTime = Number(match[1]);

      // Remove the pause text from the content for text
      const text = line.replace(/\[pause\s*\d+\s*seconds?\]/i, "").trim();
      return {
        text: text,
        pause: pauseTime,
      };
    });

    const responseData: ApiResponse = {
      lines: processedLines,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating script" },
      { status: 500 }
    );
  }
}
