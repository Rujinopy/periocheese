'use client';

import { useState, useRef } from "react";
import { Mic } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface RecordingButtonProps {
  setAudioURL: (url: string | null) => void;
  setTranscription: (text: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean; // Add loading state as a prop
}

export default function RecordingButton({ setAudioURL, setTranscription, setLoading, loading }: RecordingButtonProps) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mode, setMode] = useState<string | null>(null); 
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      audioChunksRef.current = [];
      handleSubmit(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const handleSubmit = async (audioBlob: Blob) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (base64Audio) {
          const response = await fetch('/api/whisper', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audio: base64Audio, mode }),
          });

          const data = await response.json();
          if (response.ok) {
            setTranscription(data.content);
          } else {
            alert("Error: " + data.error);
          }
        }
      };
    } catch (error) {
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-5 items-center justify-center">
      <button
        className="px-3 py-2 bg-red-500 hover:bg-red-400 border-2 border-black text-white rounded-3xl my-4"
        onClick={recording ? stopRecording : startRecording}
        disabled={loading}
      >
        {recording ? 'Stop Recording' : <div className="flex"><Mic /></div>}

      </button>
      <Select onValueChange={(value) => setMode(value)}>
        <SelectTrigger className="w-[180px] bg-white border-2 border-black text-black">
          <SelectValue placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent className="border-2 border-black">
          <SelectItem value="buccal">Buccal</SelectItem>
          <SelectItem value="palatal">Palatal</SelectItem>
          <SelectItem value="lingual">Lingual</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
