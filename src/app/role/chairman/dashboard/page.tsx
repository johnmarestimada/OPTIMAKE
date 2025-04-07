"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function ChairpersonDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    hoursAvailable: "",
    preferredCourses: ""
  });

  const faculty = [
    "Ms. Marylene Eder",
    "Ms. Cherry Pagal",
    "Sir. Juan Bautista"
  ];

  const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
  const weekDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-sky-300 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-medium mb-8">Welcome, Chairperson</h1>
          <nav className="flex flex-col space-y-4">
            <Link href="#" className="font-semibold">Faculty</Link>
            <Link href="#" className="font-semibold">Insights</Link>
            <Link href="/role/chairman/dashboard/courses" className="font-semibold">Courses</Link>
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
        {/* Faculty List */}
        <div className="w-1/3 border-r p-6">
          <div className="flex items-center mb-8">
            <span className="text-xl mr-2">+</span>
            <span className="text-gray-500">Create Faculty</span>
          </div>

          <div className="space-y-3">
            {faculty.map((member, index) => (
              <div key={index} className="bg-sky-200 text-center py-2 px-4 rounded text-gray-700">
                {member}
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Details */}
        <div className="w-2/3 p-6">
          <div className="space-y-3 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="contactNo"
              placeholder="Contact No."
              className="w-full bg-sky-200 rounded p-2"
              value={formData.contactNo}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="hoursAvailable"
              placeholder="No. of hours available per week (units)"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.hoursAvailable}
              onChange={handleChange}
            />
            <input
              type="text"
              name="preferredCourses"
              placeholder="Preferred Courses"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.preferredCourses}
              onChange={handleChange}
            />
          </div>

          {/* Faculty Image */}
          <div className="flex justify-center my-6">
            <img
              src="/chairman.svg"
              alt="Department Head"
              width={200}
              height={200}
            />
          </div>

          {/* Timetable */}
          <div>
            <h3 className="text-gray-500 mb-4">Available Timeslots</h3>
            <div className="border rounded overflow-x-auto">
              <div className="flex border-b">
                <div className="w-20"></div>
                {weekDays.map((day, index) => (
                  <div key={index} className="flex-1 text-center p-2 text-sky-400 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} className="flex border-b last:border-b-0">
                  <div className="w-20 p-2 text-sky-400 text-sm">{time}</div>
                  {weekDays.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex-1 border-l p-2 flex items-center justify-center">
                      <div className="border-t border-dashed border-gray-300 w-full"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}