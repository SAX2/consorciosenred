"use client"

import React, { useEffect, useState } from 'react';

const PDFViewer = ({ base64String }: { base64String: string }) => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [base64String]);

  return (
    <div className="w-full h-screen">
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="PDF Viewer"
        />
      )}
    </div>
  );
};

export default PDFViewer;