"use client";

import { Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DeanDashboard() {
  const [hashKey] = useState("5d41402abc4b2a76b9719d911017c592");
  const [departmentName, setDepartmentName] = useState("");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-sky-300 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-medium mb-8">Welcome, Dean</h1>
          <nav className="flex flex-col space-y-4">
            <Link href="#" className="font-semibold">Faculty</Link>
            <Link href="#" className="font-semibold">Insights</Link>
            <Link href="#" className="text-white/70">Schedule</Link>
          </nav>
        </div>
        <div>
          <Link href="/" className="text-white font-medium flex items-center">
            <span className="mr-2">←</span> Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Department List */}
        <div className="w-1/3 border-r p-6">
          <div className="flex items-center mb-8">
            <span className="text-xl mr-2">+</span>
            <span className="text-gray-500">Create Department</span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500">Department of Computer Science</p>
            <p className="text-gray-500">Department of Data Science</p>
            <p className="text-gray-500">Department of Information Technology</p>
          </div>
        </div>

        {/* Department Details */}
        <div className="w-2/3 p-6">
          <div className="mb-6">
            <label className="text-gray-500 text-sm">Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div className="mt-12">
            <p className="text-gray-500 text-sm">
              No department head is associated with this department yet.<br />
              Give this hash key to this department's head to view insights.
            </p>

            {/* Hash Key Display */}
            <div className="relative mt-3">
              <input
                type="text"
                className="w-full border rounded p-2 text-gray-600"
                value={hashKey}
                readOnly
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}