"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex font-black font-mono p-2 text-xl items-center">
            <Link href="/" className="text-black">
              <img
                alt="logo-periocheese"
                src="/logo/png-periocheese-logo.png"
                className="h-10  "
              ></img>{" "}
              Periocheese
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#about"
              className="text-black font-bold hover:bg-[#FFE27A] px-3 py-2 border-2 border-transparent hover:border-black transition-all"
            >
              About
            </a>
            <a
              href="/#features"
              className="text-black font-bold hover:bg-[#FFE27A] px-3 py-2 border-2 border-transparent hover:border-black transition-all"
            >
              Features
            </a>
            {/* <a href="#customers" className="text-black font-bold hover:bg-yellow-400 px-3 py-2 border-2 border-transparent hover:border-black transition-all">
              Customers
            </a>
            <a href="#updates" className="text-black font-bold hover:bg-yellow-400 px-3 py-2 border-2 border-transparent hover:border-black transition-all">
              Updates
            </a> */}
            <a
              href="/how-to"
              className="text-black font-bold hover:bg-[#FFE27A] px-3 py-2 border-2 border-transparent hover:border-black transition-all"
            >
              How to
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/form">
            <button className="bg-[#FFE27A] font-black rounded-md text-black px-6 py-3 border-2 hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 border-black transition-all">
              Try cheese
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#FFE27A] p-2 border-2 border-black"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#about"
                className="block px-3 py-2 text-black font-bold border-2 border-transparent hover:border-black hover:bg-[#FFE27A]"
              >
                About
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-black font-bold border-2 border-transparent hover:border-black hover:bg-[#FFE27A]"
              >
                Features
              </a>
              {/* <a href="#customers" className="block px-3 py-2 text-black font-bold border-2 border-transparent hover:border-black hover:bg-yellow-400">
                Customers
              </a>
              <a href="#updates" className="block px-3 py-2 text-black font-bold border-2 border-transparent hover:border-black hover:bg-yellow-400">
                Updates
              </a> */}
              <a
                href="#help"
                className="block px-3 py-2 text-black font-bold border-2 border-transparent hover:border-black hover:bg-[#FFE27A]"
              >
                How to
              </a>
              <a href="/form">
                <button className="w-full mt-4 bg-[#FFE27A] text-black font-black px-6 py-3 border-2 border-black">
                  Try cheese
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
