"use client";

import { useRef, useState, useEffect } from "react";

export default function OtpInput({ length = 6, onComplete }) {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const digit = value.slice(-1); // grab only the last typed character

    if (digit && !/^\d+$/.test(digit)) {
      return; // only numbers allowed
    }

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d !== "") && onComplete) {
      onComplete(newDigits.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current is empty, focus previous and clear it
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const numbersOnly = pastedData.replace(/\D/g, "").slice(0, length);

    if (numbersOnly.length > 0) {
      const newDigits = [...digits];
      for (let i = 0; i < numbersOnly.length; i++) {
        newDigits[i] = numbersOnly[i];
      }
      setDigits(newDigits);

      const focusIdx = Math.min(numbersOnly.length, length - 1);
      inputRefs.current[focusIdx]?.focus();

      if (numbersOnly.length === length && onComplete) {
        onComplete(numbersOnly);
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 my-4">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-semibold font-mono text-[#1D1D1F] bg-white rounded-xl border transition-all duration-150 outline-none select-none ${
            digit
              ? "border-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-[#FAFBFD]"
              : "border-black/[0.12] hover:border-black/25"
          } focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15`}
          autoComplete="one-time-code"
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );
}
