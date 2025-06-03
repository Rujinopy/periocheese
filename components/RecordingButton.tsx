"use client";

import { useState, useRef } from "react";
import { Mic, Loader2 } from "lucide-react"; // Add Loader2 import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HowToModal from "./HowToModal";
import { sendGAEvent } from "@next/third-parties/google";

// Add LoadingSpinner component at the top of the file
const LoadingSpinner = () => <Loader2 className="h-8 w-8 animate-spin" />;

interface RecordingButtonProps {
  setAudioURL: (url: string | null) => void;
  setTranscription: (text: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  model: string;
}

export default function RecordingButton({
  setAudioURL,
  setTranscription,
  setLoading,
  loading,
  model,
}: RecordingButtonProps) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Check for supported MIME types
    const mimeType = MediaRecorder.isTypeSupported("audio/mpeg")
      ? "audio/mpeg"
      : MediaRecorder.isTypeSupported("audio/mp3")
      ? "audio/webm"
      : "audio/webm";

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType,
    });

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      audioChunksRef.current = [];
      handleSubmit(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    // Request data every second to ensure we get all audio
    mediaRecorder.start(1000);
  };

  const stopRecording = () => {
    setRecording(false);

    // Stop the MediaRecorder
    mediaRecorderRef.current?.stop();

    // Stop all tracks in the stream
    const stream = mediaRecorderRef.current?.stream;
    stream?.getTracks().forEach((track) => track.stop());

    // Clear the reference
    mediaRecorderRef.current = null;
  };

  const handleSubmit = async (audioBlob: Blob) => {
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);

      // Convert reader.onloadend to a Promise
      const base64Audio = await new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result?.toString().split(",")[1];
          if (base64) {
            resolve(base64);
          } else {
            reject(new Error("Failed to convert audio to base64"));
          }
        };
      });

      const response = await fetch("/api/whisper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audio: base64Audio, mode, model }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranscription(data.content);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error("Error submitting audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-5 items-center justify-center">
      {loading && (
        <div className="flex items-center">
          <LoadingSpinner />
          <span className="ml-2 text-black">Processing...</span>
        </div>
      )}

      <button
        className="px-3 py-2 bg-red-500 hover:bg-red-400 border-2 border-black text-white rounded-3xl my-4 disabled:bg-slate-300 disabled:border-none"
        onClick={() => {
          sendGAEvent({event: "recording_button_clicked", value: "recording_button_clicked"});
          if (recording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
        disabled={loading}
      >
        {recording ? (
          "Stop Recording"
        ) : (
          <div className="flex">
            <Mic />
          </div>
        )}
      </button>
      <Select onValueChange={(value) => setMode(value)}>
        <SelectTrigger
          onClick={() => sendGAEvent({event:"select_mode_clicked", value: "select_mode_clicked"})}
          className="w-[180px] bg-white border-2 border-black text-black"
        >
          <SelectValue placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent className="border-2 border-black">
          <SelectItem value="buccal">Buccal</SelectItem>
          <SelectItem value="palatal">Palatal</SelectItem>
          <SelectItem value="lingual">Lingual</SelectItem>
        </SelectContent>
      </Select>
      <HowToModal />
    </div>
  );
}
