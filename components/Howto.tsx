import React from "react";

export default function Howto() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-black ">
      <div className="text-center mb-16">
        <h1 className="bg-white border-4 border-black font-black text-4xl py-4 px-8  shadow-[8px_8px_0px_0px_#000] inline-block">
          How to Use
        </h1>
      </div>
      <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_#000] mb-8">
        <p className="mb-4 font-medium">
          เนื่องจากใช้ ai ในการประมวลผล มันจะสามารถฟังภาษาบ้านๆได้
          สามารถใช้เล่นกันได้เต็มที่! เหมือนคุยกับคนเลย เหมือนอย่างในคลิปที่ทุกคนเคยเห็นไป
          คนสร้างไม่รู้ลิมิตเหมือนกัน :D แต่บางครั้งมันก็อาจจะมีความไม่แน่นอน
          จาก noise และการพูดสองภาษาพร้อมกัน
          หากต้องการจดแบบหวังผลให้แม่นยำหลีกเลี่ยงความผิดพลาดให้น้อยที่สุด
          ให้ทำตามคำแนะนำในหน้านี้ เพื่อให้เป็นไปตามวิธีที่สอนเอไอไป
        </p>
      </div>

      <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_#000] mb-8">
        <h2 className="text-2xl font-bold mb-4">Important Note</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li className="font-medium">
            {" "}
            เวอร์ชั่น Alpha ยังมีบัคอยู่มาก (แจ้งบัคที่ ig: Rujinopy)
          </li>
          <li className="font-medium text-red-500">
            {" "}
            สำคัญ บางคนพูดแล้วมันไม่ออกเลย
            ให้ปิดเสียงแอปทุกอย่างที่มีเสียงในเครื่องไปก่อน เช่น youtube spotify
            (บัคอะ ไม่รู้ทำไม)
          </li>
          <li className="font-medium">ควรใช้ไมโครโฟนที่มีคุณภาพปานกลาง-ดี</li>
          <li className="font-medium">ควรพูดชัดเจนและไม่เร็วเกินไป</li>
          <li className="font-medium">
            ควรหลีกเลี่ยงการพูดสองภาษาพร้อมกัน (อาจจะมี่ให้เลือก mode
            ภาษาแบบเฉพาะเจาะจงทีหลัง)
          </li>
          <li className="font-medium">
            ถึงจะใช้ภาษาไทย แต่ออกเสียงท้ายให้ชัดจะดีกว่า เช่น พลัคขึ (plaque)
          </li>
          <li className="font-medium">
            ขณะนี้ใช้เพื่อการศึกษา ไม่ใช่อุปกรณ์ทางการแพทย์
            โปรดใช้ด้วยความระมัดระวัง
          </li>
        </ul>
      </div>

      <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_#000] mb-8">
        <h2 className="text-2xl font-bold mb-4">วิธีใช้</h2>
        <p>format การพูดคือ</p>
        <p className="text-lg font-semibold border-2 border-black py-5 px-1 text-center ">
          &quot;ฟันซี่&quot; + เลขฟัน + [ คุณสมติที่จะจด 1 +  คุณสมติทั้งหมดที่จะจด 2 + ... ] + &quot;คัท&quot;{" "}
        </p>

        <p className="mt-4 text-lg"> <span className="inline-block font-bold">&quot;คัท or cut&quot;</span> เป้นคำที่ต้องพูดเมื่อพูดคุณสมบัติของซี่ใดๆจบ เพื่อแจ้งเอไอว่าจะขึ้นซี่ใหม่แล้วนะ</p>
        <h3 className="text-xl font-bold mt-4">คำที่ใช้ได้</h3>
        <div className="overflow-x-auto">
          
          <table className="min-w-full border-4 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b-2 border-black font-bold">
                  Parameter
                </th>
                <th className="px-4 py-2 border-b-2 border-black font-bold">
                  Accepted Terms (คำที่ใช้ได้)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Tooth number
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Tooth, ฟันซี่
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Probing Depth
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Probing depth, พีดี, PD
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Gingival Margin
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Margin, มาจิ้น, จินไจวัล มาจิน (แนะนำ มาจิ้น)
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Plaque
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Plaque, พลัคคึ, พลาคคึ
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Mobility
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Mobility, โมบิลิตี้
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Bleeding on probing
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Bleeding, บรีดดิ้ง
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Implant
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Implant, อิมพลานท์
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Furcation
                </td>
                <td className="px-4 py-2 border-b border-black">
                  Furcation class ..., เฟอร์เคชั่น คลาส...
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-black font-medium">
                  Absent tooth
                </td>
                <td className="px-4 py-2 border-b border-black">
                  ไม่มี, Absent
                </td>
              </tr>
              
            </tbody>
          </table>            
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_#000]">
          <h2 className="text-2xl font-bold mb-6">
            ตัวอย่าง: Q1B Recording
          </h2>

          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="font-bold mr-3">1.</span>
              <span>Select &quot;Buccal&quot; surface</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">2.</span>
              <span>Click &quot;Record&quot; button</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">3.</span>
              <div>
                <p className="mb-2">
                  Speak in this format ``(พวกตัวเลขให้พูดในภาษานั้นๆ เช่น 17 =
                  หนึ่งเจ็ด(ไทย) = one seven (eng)``
                </p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  ฟันซี่ 17 พีดี 1 2 3 มาจิน 1 1 1 โมบิลิตี้ 2 บรีดดิ้ง 1 0 1
                  พลัค 1 1 1<br />
                  คัท
                  <br />
                  <br />
                  ฟันซี่ 16 พีดี 4 5 6 มาจิน 2 2 2 อิมพลานท์ บรีดดิ้ง 1 1 1 พลัค
                  1 1 1 เฟอร์เคชั่น คลาส 1<br />
                  คัท
                  <br />
                  <br />
                  ฟันซี่ 15 พีดี 1 0 1 มาจิน 0 0 0 อิมพลานท์ บรีดดิ้ง 0 0 0 พลัค
                  1 1 1<br />
                  คัท
                </div>
                <p>หรือ</p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  Tooth 17 pd 1 2 3 margin 1 1 1 mobility 2 bleeding 1 0 1
                  plaque 1 1 1<br />
                  cut
                  <br />
                  <br />
                  Tooth 16 pd 4 5 6 margin 2 2 2 Implant bleeding 1 1 1 plaque 1
                  1 1 Furcation class 1<br />
                  cut
                  <br />
                  <br />
                  Tooth 15 pd 1 0 1 margin 0 0 0 Implant bleeding 0 0 0 plaque 1
                  1 1<br />
                  cut
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">4.</span>
              <span>Click &quot;Stop recording&quot; button</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">5.</span>
              <span>Wait for the results</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">6.</span>
              <span>(Optional) Save as image</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">7.</span>
              <span>(Optional) Save as JSON</span>
            </li>
          </ol>
        </div>
        <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_#000]">
          <h2 className="text-2xl font-bold mb-6">
            ตัวอย่าง: Q2P Recording
          </h2>

          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="font-bold mr-3">1.</span>
              <span>Select &quot;Palatal&quot; surface</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">2.</span>
              <span>Click &quot;Record&quot; button</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">3.</span>
              <div>
                <p className="mb-2">Speak in this format:</p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  ฟันซี่ 28 ไม่มี <br />
                  <br />
                  คัท <br />
                  <br />
                  ฟันซี่ 27 พีดี 1 2 3 มาจิน 1 1 1 โมบิลิตี้ 2 บรีดดิ้ง 1 0 1
                  พลัค 1 1 1<br />
                  <br />
                  คัท
                  <br />
                  <br />
                  ฟันซี่ 26 พีดี 4 5 6 มาจิน 2 2 2 อิมพลานท์ บรีดดิ้ง 1 1 1 พลัค
                  1 1 1 เฟอร์เคชั่น คลาส 1 และ 3<br />
                  คัท
                  <br />
                  <br />
                  ฟันซี่ 25 พีดี 1 0 1 มาจิน 0 0 0 อิมพลานท์ บรีดดิ้ง 0 0 0 พลัค
                  1 1 1<br />
                  คัท
                  <br />
                  ฟันซี่ 24 ไม่มี
                  <br />
                </div>
                <p>หรือ</p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  Tooth 28 absence
                  <br />
                  <br />
                  cut <br />
                  <br />
                  Tooth 27 pd 1 2 3 margin 1 1 1 mobility 2 bleeding 1 0 1
                  plaque 1 1 1<br />
                  <br />
                  cut
                  <br />
                  <br />
                  Tooth 26 pd 4 5 6 margin 2 2 2 Implant bleeding 1 1 1 plaque 1
                  1 1 Furcation class 1 and 3<br />
                  cut
                  <br />
                  <br />
                  Tooth 25 pd 1 0 1 margin 0 0 0 Implant bleeding 0 0 0 plaque 1
                  1 1<br />
                  <br />
                  cut
                  <br />
                  <br />
                  Tooth 24 absence
                  <br />
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">4.</span>
              <span>Click &quot;Stop recording&quot; button</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">5.</span>
              <span>Wait for the results</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">6.</span>
              <span>(Optional) Save as image</span>
            </li>

            <li className="flex items-start">
              <span className="font-bold mr-3">7.</span>
              <span>(Optional) Save as JSON</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
