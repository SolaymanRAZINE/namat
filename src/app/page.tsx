'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure camera permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const resetCamera = () => {
    setPhoto(null);
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
        {photo ? (
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold mb-2">Photo Captured</h2>
            <img src={photo} alt="Captured" className="w-full max-w-lg h-auto rounded-lg object-contain" />
            <button 
              className="bg-blue-600 hover:bg-blue-800 text-white text-lg py-3 px-6 rounded-lg w-full max-w-xs transition-colors"
              onClick={resetCamera}
            >
              Take Another Photo
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold mb-2">Camera</h2>
            <div className="w-full relative rounded-lg overflow-hidden bg-black">
              <video 
                ref={videoRef} 
                className="w-full h-auto"
                autoPlay 
                playsInline
                muted
              />
            </div>
            <div className="flex gap-4 w-full">
              <button 
                className="bg-blue-600 hover:bg-blue-800 text-white text-lg py-3 px-6 rounded-lg flex-1 transition-colors"
                onClick={startCamera}
              >
                Start Camera
              </button>
              <button 
                className="bg-green-600 hover:bg-green-800 text-white text-lg py-3 px-6 rounded-lg flex-1 transition-colors"
                onClick={capturePhoto}
              >
                Capture
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
