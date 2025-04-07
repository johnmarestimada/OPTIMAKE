"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function ChairpersonDashboard() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contactNo: "",
    email: "",
    hoursAvailable: "",
    preferredCourses: ""
  });

  const [faculty, setFaculty] = useState([
    { id: "1", name: "Ms. Marylene Eder", contactNo: "09123456789", email: "marylene@example.com", hoursAvailable: "20", preferredCourses: "Mathematics, Physics" },
    { id: "2", name: "Ms. Cherry Pagal", contactNo: "09876543210", email: "cherry@example.com", hoursAvailable: "15", preferredCourses: "Biology, Chemistry" },
    { id: "3", name: "Sir. Juan Bautista", contactNo: "09765432189", email: "juan@example.com", hoursAvailable: "18", preferredCourses: "Computer Science, Programming" }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);

  const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
  const weekDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  // Track available time slots
  const [availableSlots, setAvailableSlots] = useState<{[day: string]: {[time: string]: boolean}}>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFacultySelect = (id: string) => {
    const selectedFaculty = faculty.find(f => f.id === id);
    if (selectedFaculty) {
      setFormData({
        id: selectedFaculty.id,
        name: selectedFaculty.name,
        contactNo: selectedFaculty.contactNo,
        email: selectedFaculty.email,
        hoursAvailable: selectedFaculty.hoursAvailable,
        preferredCourses: selectedFaculty.preferredCourses
      });
      setSelectedFacultyId(id);
      setEditMode(true);
    }
  };

  const handleCreateNewFaculty = () => {
    // Clear form and set to create mode
    setFormData({
      id: "",
      name: "",
      contactNo: "",
      email: "",
      hoursAvailable: "",
      preferredCourses: ""
    });
    setSelectedFacultyId(null);
    setEditMode(false);
  };

  const handleSaveFaculty = () => {
    if (!formData.name) {
      alert("Faculty name is required");
      return;
    }

    if (editMode && selectedFacultyId) {
      // Update existing faculty
      setFaculty(prevFaculty => 
        prevFaculty.map(f => 
          f.id === selectedFacultyId ? { ...formData, id: selectedFacultyId } : f
        )
      );
    } else {
      // Add new faculty
      const newId = (Math.max(...faculty.map(f => parseInt(f.id)), 0) + 1).toString();
      setFaculty(prevFaculty => [
        ...prevFaculty,
        { ...formData, id: newId }
      ]);
    }

    // Reset form
    handleCreateNewFaculty();
  };

  const handleDeleteFaculty = () => {
    if (selectedFacultyId) {
      if (confirm("Are you sure you want to delete this faculty member?")) {
        setFaculty(prevFaculty => prevFaculty.filter(f => f.id !== selectedFacultyId));
        handleCreateNewFaculty();
      }
    }
  };

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailableSlots(prev => {
      const newSlots = { ...prev };
      if (!newSlots[day]) {
        newSlots[day] = {};
      }
      newSlots[day][time] = !newSlots[day]?.[time];
      return newSlots;
    });
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
          <div 
            className="flex items-center mb-8 cursor-pointer hover:bg-sky-50 p-2 rounded"
            onClick={handleCreateNewFaculty}
          >
            <span className="text-xl mr-2">+</span>
            <span className="text-gray-500">Create Faculty</span>
          </div>

          <div className="space-y-3">
            {faculty.map((member) => (
              <div 
                key={member.id} 
                className={`bg-sky-200 text-center py-2 px-4 rounded text-gray-700 cursor-pointer ${selectedFacultyId === member.id ? 'ring-2 ring-sky-500' : ''}`}
                onClick={() => handleFacultySelect(member.id)}
              >
                {member.name}
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
            
            <div className="flex space-x-3 mt-4">
              <button 
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
                onClick={handleSaveFaculty}
              >
                {editMode ? "Update Faculty" : "Save Faculty"}
              </button>
              
              {editMode && (
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={handleDeleteFaculty}
                >
                  Delete Faculty
                </button>
              )}
              
              {editMode && (
                <button 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={handleCreateNewFaculty}
                >
                  Cancel
                </button>
              )}
            </div>
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
                    <div 
                      key={dayIndex} 
                      className="flex-1 border-l p-2 flex items-center justify-center cursor-pointer"
                      onClick={() => toggleTimeSlot(day, time)}
                    >
                      {availableSlots[day]?.[time] ? (
                        <div className="bg-sky-400 w-4 h-4 rounded-full"></div>
                      ) : (
                        <div className="border-t border-dashed border-gray-300 w-full"></div>
                      )}
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