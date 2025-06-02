import { cn } from "@/lib/utils";

const Features = ({ className } : {className: string}) => {
  const features = [
    {
      title: "speak to draw a chart",
      description: "Voice-controlled dental charting"
    },
    {
      title: "edit as you want",
      description: "Full editing capabilities"
    },
    {
      title: "export to jpg",
      description: "Multiple export formats"
    },
    {
        title: "reusable by save as json / load jsons (in development)",
        description: "Save and reuse charts"
    },
    // {
    //     title: "multiple transcribe models",
    //     description: "load jsons"
    // },
    // {
    //   title: "easily integrate with your own api",
    //   description: "Seamless API integration"
    // }
  ];

  return (
    <section id="features" className={cn(`${className} py-20 text-black`) }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="bg-white border-4 border-black font-black text-4xl py-4 px-8 shadow-[8px_8px_0px_0px_#000] inline-block">
            Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <h3 className="bg-white border-4 border-black font-bold text-lg text-center py-3 px-6 shadow-[4px_4px_0px_0px_#000]">
                {feature.title}
              </h3>
              {/* <div className="bg-white border-4 border-black h-48 shadow-[8px_8px_0px_0px_#000] flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 border-4 border-black grid grid-cols-4 gap-1 p-2 ">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="bg-gray-300 border border-black "></div>
                  ))}
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;