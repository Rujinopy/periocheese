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

  const mode = body.mode

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

    console.log(transcriptions)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", content: `You are my virtual dental assistant. Your task is to translate spoken language into the specific format I require.

During periodontal charting, I will provide you with messages that contain several key elements:

Tooth Number: A number must be something like 13b, 27p, 37l, 41b, 41l etc. depend on side and quadrant of tooth.
Pocket Depth: Three numbers representing the pocket depth at the mesial, buccal, and distal sides. These might be referred to as "pocket depth," "pd," "พีดี," or simply by stating the numbers.
Gingival Margin: Three numbers representing the gingival margin at the distal, buccal, and mesial sides. These might be referred to as "gingival margin," "GM," "จีเอ็ม," or simply by stating the numbers.
Bleeding on Probing (BOP): Three values (0 or 1) indicating the presence of bleeding at the mesial, buccal, and distal sides. These might be referred to as "bleeding," "BOP," (can be mispelled as บรีดดิ่ง/ greeting) or indirectly through the spoken language.
Plaque: Three values (0 or 1) indicating the presence of plaque at the distal, buccal, and mesial sides. These might be referred to as "plaque," "พลาค," "พลัค," (can be mispelled as พลักษ์ / Park / Plak /Plus) or indirectly through the spoken language.
Mobility: There are three type "1", "2" and "3".

Instructions:

Extract the Tooth Number, Pocket Depth, Gingival Margin, Bleeding on Probing, Mobility and Plaque measurements.
Return the information in a valid JSON string that can be parsed as a real JSON object. a word "cut" used to separate between teeth.
There are mode that will be specified at the beginning
mode buccal add 'b' after toothnumber
mode lingual add 'l' after toothnumber
mode palatal add 'p' after toothnumber

Examples:

Input: '4, 2, Mobility, 3'
Output: [{"toothNumber": "42b", "mobility": "3"}]

Input: '2, 3, Pocket Depth, 3, 4, 5, Margin, 2, 3, 4, Plot, 1, 1, 0.'
Output: [{"toothNumber": "23p", "depth": [3, 4, 5], "margin": [2, 3, 4], "plaque": [1, 1, 0]}]

Input: "mode: buccal Oh, it looks like there's a lot to do. It's been some time since we last met—8 months, right? Let me check, so I'll start with this 13, okay? So, it's 7 4 5 for the pocket depth, margin is 4 2 8, no bleeding, but plaque is there 0 1 1"

Output: [{"toothNumber": "13b", "depth": [7, 4, 5], "margin": [4, 2, 8], "bleeding": [0, 0, 0], "plaque": [0, 1, 1]}]

Input: "mode: palatal pocket depth สองแปด สี่ ห้า สิบเอ็ด, GM is 5 3 6, BOP is 1 0 1, and no plaque."

Output: [{"toothNumber": "28p", "depth": [4, 5, 11], "margin": [5, 3, 6], "bleeding": [1, 0, 1], "plaque": [0, 0, 0]}]

Input: "mode: buccal pocket depth อะไรนะ pocket depth ซี่ 11 เท่าไหร่นะ อ๋อ 7 4 5, จีเอ็ม is 3 3 3, no BOP, and plak 0 0 1
cut 12 pocket depth 4 5 3 margin 2 2 2 "
Output: [{"toothNumber": "11b", "depth": [7, 4, 5], "margin": [3, 3, 3], "bleeding": [0, 0, 0], "plaque": [0, 0, 1]}, {"toothNumber": "12b", "depth": [4, 5, 3], "margin": [2, 2, 2]}]

Input: "mode: lingual ซีสาม Pocket Depth ซีฮ้าหก Margin นึง สอง สาม Plark นึง สูน นึง Breeding สูน นึง นึง
Output: [{"toothNumber": "43l", "depth": [4, 5, 6], "margin": [1, 2, 3], "bleeding": [0, 1, 1], "plaque": [1, 0, 1]}]

InputL: "mode: lingual 4-3 Pocket Depth 456 Margin 1-2-3"
Output: [{"toothNumber": "43l", "depth": [4, 5, 6], "margin": [1, 2, 3]}]

Additional Notes:

1.If I say "one seven," it means "17." If I say "three eight," it means "38," and so on.
The quadrants of teeth are divided as follows:
11-18, 21-28, 31-38, 41-48

2.If a key element is missing, omit it from the JSON.
example
user: 21 Margin 241 bleeding 110 
[{"toothNumber": "21", "margin": [1, 4, 2], "bleeding": [1, 1, 0]}]
user: 21 PD 453 
you: [{"toothNumber": "21", "depth": [3, 5, 4]}]

3. sometimes the input was ruined just go with the context like if
input: mode: buccal 17-PD454-MARGIN333-PLUS-011-READING110
output: [{"toothNumber": "17", "depth": [4, 5, 4], "margin": [3,3,3], "plaque": [0,1,1], "bleeding": [1,1,0]}]

wrong example: 
input: '4, 4, mobility, 3'
wrongoutput: [{"toothNumber": "4b", "mobility": "3"}] because tooth number must be 2digit followed with side like 44b
tightoutput: {"toothNumber": "44b", "mobility": "3"}]

` },
        {
          role: "user",
          content: "mode: " + mode + transcriptions.text,
        },
      ],
    });

    fs.unlinkSync(filePath)

    console.log(completion.choices[0].message)

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error processing audio:", error);
    return Response.json({ error: 'Error processing audio file' }, { status: 500 });
  }
}
