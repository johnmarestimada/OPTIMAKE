'use client';

import Link from 'next/link';
import { useState } from 'react';
  export default function VerificationPage() {
    const [code, setCode] = useState(new Array(6).fill(""));
  
    const handleChange = (index: number, value: string) => {
      if (value.length > 1) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    };

  return (
    <div className="flex h-screen bg-[#EAF4FA] justify-center items-center "> 

      <div className="flex justify-between bg-white rounded-xl shadow-lg w-[800px] h-[500px] z-10">
        <div className="p-10">      
        <div className="text-cyan-500 text-sm cursor-pointer mb-6">&lt; Back</div>
        
        <h1 className="text-4xl font-extrabold mb-2">Verification</h1>
        <div className="text-left text-sm text-gray-500 mb-16">
        We've sent a verification code to your email.
        </div>
        
        <div className="flex justify-center space-x-2 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-14 h-14 text-center border rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-8"
            />
          ))}
        </div>
        <Link href="/registration/information">
      <button className="float-right w-40 bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:bg-cyan-500 transition-all mb-10">
          Continue &gt;
        </button>
        </Link>
      </div>
      <img 
        src="/logo.svg" 
        alt="Logo" 
        className="w-60 h-60 absolute ml-96 "></img>
        <div className="bg-cyan-300 rounded-lg flex w-64 h-100 z-10"></div>

      </div>
    </div>
  );
}














  