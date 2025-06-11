"use client"

import { useState, useEffect } from "react";
import QrScanner from "react-qr-barcode-scanner";

export function CameraButton() {
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
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={handleToggleCamera}
        className="p-2 rounded-full hover:bg-muted transition-colors border border-gray-400 mb-2"
      >
        {isCameraOpen ? <div className="h-6 w-6 text-primary">X</div> : <div className="h-6 w-6 text-primary">Camera</div> }
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