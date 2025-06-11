"use client"

import { useState, useEffect } from "react";
import QrScanner from "react-qr-barcode-scanner";
import { Camera, X } from "lucide-react";

export default function Page() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    if (barcode !== null) {
      setIsCameraOpen(false);
    }
  }, [barcode]);

  const handleToggleCamera = () => {
    setBarcode(null);
    setIsCameraOpen(!isCameraOpen);
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <button
        type="button"
        onClick={handleToggleCamera}
        className="p-2 rounded-full hover:bg-muted transition-colors border border-gray-400 mb-4"
      >
        {isCameraOpen ? <X className="h-6 w-6 text-primary" /> : <Camera className="h-6 w-6 text-primary" />}
      </button>
      {isCameraOpen && (
        <QrScanner
          onUpdate={(err, result) => {
            console.log(result);
            if (result) {
              setBarcode(result.getText());
            }
          }}
          />  
      )}
      {barcode && (
        <div className="text-sm text-gray-500">
          {barcode}
        </div>
      )}
    </div>
  )
}