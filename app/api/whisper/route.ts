// app/api/whisper/route.ts
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const base64Audio = body.audio;

  const mode = body.mode;

  if (!base64Audio) {
    return Response.json({ error: "Audio file is required" }, { status: 400 });
  }

  const buffer = Buffer.from(base64Audio, "base64");
  const filePath = path.join(process.cwd(), "tmp", `input-${randomUUID()}.webm`);

  const promptTemplatePath = path.join(process.cwd(), "public", "prompt", "prompt-template.txt");
  const promptTemplate = fs.readFileSync(promptTemplatePath, "utf-8");
  console.log(filePath)
  try {
    fs.writeFileSync(filePath, new Uint8Array(buffer));
    const transcriptions = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      prompt: `Dental periodontal charting session. Listen for: tooth numbers (11-18, 21-28, 31-38, 41-48), pocket depth measurements, gingival margin values, bleeding on probing, plaque scores, mobility grades, implant status, furcation types. Terms include: PD, พีดี, GM, จีเอ็ม, BOP, bleeding, บรีดดิ่ง, plaque, พลาค, พลัค, พลักษ์, mobility, โมบิลิตี้, implant, อิมพลานต์, อิมพลานส์, furcation, เฟอเคชั่น, ฟูเคชัน, cut. Numbers spoken as sequences like "four five six" or Thai numerals.`
      
    });

    console.log("Transcriptions:", transcriptions);

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

    fs.unlinkSync(filePath);

    console.log(completion.choices[0].message);

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error processing audio:", error);
    return Response.json(
      { error: "Error processing audio file" },
      { status: 500 }
    );
  }
}
