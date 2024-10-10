'use client';

import { useState } from "react";
import RecordingButton from '@/components/RecordingButton'

export default function Home() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-yellow-300">
      <div className="w-full max-w-6xl mx-auto text-center p-4">
        <h1 className="text-lg md:text-2xl">DENT CHEESE BABY</h1>

        <RecordingButton
          setAudioURL={setAudioURL}
          setTranscription={setTranscription}
          setLoading={setLoading}
          loading={loading} // Pass the loading state here
        />

        {audioURL && (
          <div className="my-4">
            <audio src={audioURL} controls className="w-full md:w-auto" />
          </div>
        )}

        {loading && <p className="text-gray-700 my-4">Transcribing...</p>}

        {transcription && (
          <div className="my-4">
            <h2 className="text-md md:text-lg font-semibold">Transcription:</h2>
            <p className="text-sm md:text-base">{transcription}</p>
          </div>
        )}
      </div>

      <div className="relative mx-auto w-full max-w-6xl bg-white min-h-screen">
        <div className="absolute w-full h-auto max-w-4xl md:max-w-5xl lg:max-w-6xl z-20 top-0 left-1/2 transform -translate-x-1/2">
          <img
            src={"https://www.periodontalchart-online.com/uk/svg/uk-svg_grids-01.svg"}
            alt="grid"
            className="w-full h-full"
          />
        </div>
        <div className="absolute w-full h-auto max-w-4xl md:max-w-5xl lg:max-w-6xl z-10 top-0 left-1/2 transform -translate-x-1/2">
          <img
            src="https://www.periodontalchart-online.com/img/svg/svg_teeth.svg"
          />
        </div>
      </div>
    </div>
  );
}
