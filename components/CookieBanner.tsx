'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed font-mono bottom-0 w-full bg-purple-200 border-t-2 border-black text-black py-4 px-4 flex justify-between items-center z-50 md:px-44">
      <p className="text-md  mr-4">
        This site uses cookies and Google Analytics to understand how you use it, so we can make it even better for you.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-white text-black border-2 border-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-200"
      >
        Got it
      </button>
    </div>
  );
}
