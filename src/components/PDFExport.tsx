"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

interface PDFExportProps {
  contentRef: React.RefObject<HTMLElement | null>;
  filename?: string;
}

export const PDFExport: React.FC<PDFExportProps> = ({ contentRef, filename = "CV.pdf" }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!contentRef.current) {
      console.error("Content ref is not available");
      return;
    }

    setIsGenerating(true);

    try {
      // Hide navigation, footer, and PDF button that shouldn't be in PDF
      const navigation = document.querySelector("nav");
      const footer = document.querySelector("footer");
      const pdfButton = document.querySelector("[data-pdf-button]");
      const originalNavDisplay = navigation?.style.display;
      const originalFooterDisplay = footer?.style.display;
      const originalButtonDisplay = pdfButton ? (pdfButton as HTMLElement).style.display : "";

      if (navigation) navigation.style.display = "none";
      if (footer) footer.style.display = "none";
      if (pdfButton) (pdfButton as HTMLElement).style.display = "none";

      // Wait a bit to ensure all content is rendered
      await new Promise(resolve => setTimeout(resolve, 200));

      // html2canvas-pro supports modern CSS color functions (lab(), lch(), oklab(), oklch())
      // so we don't need to convert colors manually
      const canvas = await html2canvas(contentRef.current, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
      });

      // Restore navigation, footer, and button
      if (navigation) navigation.style.display = originalNavDisplay || "";
      if (footer) footer.style.display = originalFooterDisplay || "";
      if (pdfButton) (pdfButton as HTMLElement).style.display = originalButtonDisplay || "";

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      
      // Get PDF dimensions in mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Get canvas dimensions in pixels
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Convert pixels to mm (96 DPI: 1px ≈ 0.264583mm)
      const pxToMm = 0.264583;
      const imgWidthMm = imgWidth * pxToMm;
      const imgHeightMm = imgHeight * pxToMm;
      
      // Scale to fit PDF width while maintaining aspect ratio
      const widthRatio = pdfWidth / imgWidthMm;
      const scaledWidth = pdfWidth;
      const scaledHeight = imgHeightMm * widthRatio;
      
      // Calculate number of pages needed
      const totalPages = Math.ceil(scaledHeight / pdfHeight);
      
      // Add image to PDF pages
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }
        
        // Calculate y position (negative to show the correct portion)
        const yPos = -(page * pdfHeight);
        
        // Add the full image, positioned to show the correct portion
        pdf.addImage(
          imgData,
          "PNG",
          0,
          yPos,
          scaledWidth,
          scaledHeight
        );
      }

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      
      // Restore elements in case of error
      const navigation = document.querySelector("nav");
      const footer = document.querySelector("footer");
      const pdfButton = document.querySelector("[data-pdf-button]");
      if (navigation) navigation.style.display = "";
      if (footer) footer.style.display = "";
      if (pdfButton) (pdfButton as HTMLElement).style.display = "";
      
      // Show more detailed error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to generate PDF: ${errorMessage}. Please check the console for more details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      data-pdf-button
      onClick={generatePDF}
      disabled={isGenerating}
      className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CV as PDF
        </>
      )}
    </button>
  );
};

