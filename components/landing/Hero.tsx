"use client";
import Star9 from "@/components/stars/s9";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-yellow-100 min-h-screen flex items-center border-b-8 border-black bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <Star9 color="#FFE27A" size={150} stroke="black" strokeWidth={1} className="absolute top-0 left-[460px] z-0 opacity-100 md:visible invisible"/>
        <Star9 color="#FFE27A" size={100} stroke="black" strokeWidth={1} className="absolute top-[300px] -left-[200px] z-0 opacity-100  md:visible invisible"/>
        <Star9 color="#FFE27A" size={60} stroke="black" strokeWidth={1} className="absolute top-[500px] left-[400px] z-0 opacity-100  md:visible invisible"/>
        <div className="grid grid-re grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4 relative">
              <Star9 color="#FFE27A" size={70} stroke="black" strokeWidth={1} className="absolute -top-[25px] right-[12px] z-0 opacity-100  visible md:invisible"/>
              <h1 className="text-5xl lg:text-7xl text-[#c1caf8] font-sans md:font-bold font-black leading-relaxed"
               style={{
                  WebkitTextStrokeColor: "black",
                  WebkitTextStroke: "1px black",
                }}>
                Speech to Charting {" "}
               
              </h1>
               <span className="font-sans font-bold text-3xl md:text-4xl text-black  py-2  mt-2 border-black inline-block transform "
                //add text stroke style
                >
                  for Dentist 
                </span>
              <p className="text-xl font-bold text-black max-w-md mx-auto lg:mx-0">
                speak and we&apos;ll do the rest. 😋
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              
              <Link href="/form" className="bg-[#FFE27A] rounded-md text-black font-black text-xl px-8 py-4 border-2 border-black hover:shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
                Try cheese
              </Link>
            </div>

            <div className="space-y-2 text-black font-bold flex flex-col items-center lg:items-start">
              <p>✓ It&apos;s free.</p>
              <p>✓ LLM powered</p>
              <p>✓ Have fun with generative ai</p>
            </div>
          </div>

          {/* Right Column - Dental Chart */}
          <div className="flex relative justify-center lg:justify-end">
            <div className="absolute w-full top-0 left-0 flex justify-center">
              {/* <img
                src="/logo/cheese-icon2-nobg.png"
                alt="cheese-icon"
                className="-top-7 w-[200px] z-10 relative"
              /> */}
            </div>
            <img
              src="/logo/perio-chart2.jpg"
              alt="perio-chart"
              className="w-full shadow-[4px_4px_0px_0px_#000] md:shadow-[16px_16px_0px_0px_#000] shadow-[#000000] rounded-lg border-2 border-[#000000]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
