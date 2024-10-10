// app/api/whisper/route.ts
import { NextResponse } from 'next/server';
import OpenAI from "openai";
import fs from 'fs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json()

  const base64Audio = body.audio

  if (!base64Audio) {
    return Response.json({ error: 'Audio file is required' }, { status: 400 });
  }
  const buffer = Buffer.from(base64Audio, "base64");
  const filePath = "tmpinput.wav"

  try {

    fs.writeFileSync(filePath, buffer)
    const transcriptions = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", content: `You are my virtual dental assistant. Your task is to translate spoken language into the specific format I require.

During periodontal charting, I will provide you with messages that contain several key elements:

Tooth Number: A number like 13, 27, etc.
Pocket Depth: Three numbers representing the pocket depth at the mesial, buccal, and distal sides. These might be referred to as "pocket depth," "pd," "พีดี," or simply by stating the numbers.
Gingival Margin: Three numbers representing the gingival margin at the mesial, buccal, and distal sides. These might be referred to as "gingival margin," "GM," "จีเอ็ม," or simply by stating the numbers.
Bleeding on Probing (BOP): Three values (0 or 1) indicating the presence of bleeding at the mesial, buccal, and distal sides. These might be referred to as "bleeding," "BOP," or indirectly through the spoken language.
Plaque: Three values (0 or 1) indicating the presence of plaque at the mesial, buccal, and distal sides. These might be referred to as "plaque," "พลาค," "พลัค," or indirectly through the spoken language.
Instructions:

Extract the Tooth Number, Pocket Depth, Gingival Margin, Bleeding on Probing, and Plaque measurements.
Return the information in a valid JSON string that can be parsed as a real JSON object.
Examples:

Input: "Oh, it looks like there's a lot to do. It's been some time since we last met—8 months, right? Let me check, so I'll start with this 13, okay? So, it's 7 4 5 for the pocket depth, margin is 4 2 8, no bleeding, but plaque is there on buccal and distal."

Output: {"toothNumber": "13", "depth": [7, 4, 5], "margin": [4, 2, 8], "bleeding": [0, 0, 0], "plaque": [0, 1, 1]}

Input: "For pocket depth สองแปด สี่ ห้า สิบเอ็ด, GM is 5 3 6, BOP is 1 0 1, and no plaque."

Output: {"toothNumber": "28", "depth": [4, 5, 11], "margin": [5, 3, 6], "bleeding": [1, 0, 1], "plaque": [0, 0, 0]}

Input: "For pocket depth อะไรนะ pocket depth ซี่ 11 เท่าไหร่นะ อ๋อ 7 4 5, จีเอ็ม is 3 3 3, no BOP, and plaque is only on the distal."

Output: {"toothNumber": "11", "depth": [7, 4, 5], "margin": [3, 3, 3], "bleeding": [0, 0, 0], "plaque": [0, 0, 1]}

Additional Notes:

If I say "one seven," it means "17." If I say "three eight," it means "38," and so on.
The quadrants of teeth are divided as follows:
11-18
21-28
31-38
41-48

` },
        {
          role: "user",
          content: transcriptions.text,
        },
      ],
    });

    fs.unlinkSync(filePath)

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error processing audio:", error);
    return Response.json({ error: 'Error processing audio file' }, { status: 500 });
  }
}
