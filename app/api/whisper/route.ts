// app/api/whisper/route.ts
import OpenAI from "openai";
import fs from "fs";
import path from "path";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const base64Audio = body.audio;
  const mode = body.mode;
  const model = body.model || "whisper-1";

  if (!base64Audio) {
    return Response.json({ error: "Audio file is required" }, { status: 400 });
  }

  try {
    // Convert base64 to Buffer
    const buffer = Buffer.from(base64Audio, "base64");
    
    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'audio/webm' });
    
    // Create a File object from the Blob
    const file = new File([blob], 'audio.webm', { type: 'audio/webm' });

    const promptTemplatePath = path.join(process.cwd(), "public", "prompt", "prompt-template.txt");
    const promptTemplate = fs.readFileSync(promptTemplatePath, "utf-8");

    // Pass the file directly to OpenAI
    const transcriptions = await openai.audio.transcriptions.create({
      file: file,
      model: model,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: promptTemplate,
        },
        {
          role: "user",
          content: "mode: " + mode + transcriptions.text,
        },
      ],
    });

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error processing audio:", error);
    return Response.json(
      { error: "Error processing audio file" },
      { status: 500 }
    );
  }
}
