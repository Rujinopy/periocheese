import Link from "next/link";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      subtitle: [
        {
          title: "try cheese",
          link: "/form",
        },
      ],
    },
    {
      title: "Report bug",
      subtitle: [{ title: "instagram", link: "https://www.instagram.com/Rujinopy" }],
    },
    {
      title: "Resources",
      subtitle: [{ title: "How to", link: "/how-to" }],
    },
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="flex font-black font-mono p-2 text-xl items-center text-white">
            <Link href="/" className="text-black">
              <img
                alt="logo-periocheese"
                src="/logo/png-periocheese-logo.png"
                className="h-10  "
              ></img>{" "}
            </Link>
            <p className="text-white">Periocheese</p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-black text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.subtitle.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={sub.link}
                      className="text-gray-400 font-bold hover:text-yellow-400 transition-colors"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="mt-12 pt-8 border-t-2 border-gray-800">
          <div className="flex justify-center space-x-6">
            {["🦷", "❤️", "🦷", "❤️"].map((icon, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black w-12 h-12 border-2 border-gray-600 hover:border-black flex items-center justify-center text-xl transition-all"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
