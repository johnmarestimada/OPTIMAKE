"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ChairpersonCoursesDashboard() {
  const [formData, setFormData] = useState({
    codeId: "",
    name: "",
    description: "",
    duration: "",
    sections: ""
  });

  const [courses, setCourses] = useState([
    "Intro to Programming",
    "Computational Databases",
    "Algorithm and Complexity"
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleNewCourseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCourseName(e.target.value);
  };

  const handleAddCourse = (e: FormEvent) => {
    e.preventDefault();
    if (newCourseName.trim()) {
      setCourses([...courses, newCourseName]);
      setNewCourseName("");
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewCourseName("");
  };

  const handleCourseClick = (index: number) => {
    setSelectedCourseIndex(index);
    // You could also populate the form with the selected course data here
  };

  const handleDeleteCourse = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the course selection
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    
    // Reset selected course if the deleted one was selected
    if (selectedCourseIndex === index) {
      setSelectedCourseIndex(null);
    } else if (selectedCourseIndex !== null && selectedCourseIndex > index) {
      // Adjust the selected index if a course above it was deleted
      setSelectedCourseIndex(selectedCourseIndex - 1);
    }
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
            <Link href="#" className="font-semibold">Courses</Link>
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
        {/* Course List */}
        <div className="w-1/3 border-r p-6">
          <div className="space-y-3 mb-10">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className={`bg-sky-200 text-center py-2 px-4 rounded text-gray-700 cursor-pointer hover:bg-sky-300 transition-colors relative group ${selectedCourseIndex === index ? 'bg-sky-300' : ''}`}
                onClick={() => handleCourseClick(index)}
              >
                {course}
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleDeleteCourse(index, e)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {isCreating ? (
            <form onSubmit={handleAddCourse} className="mt-8">
              <input
                type="text"
                placeholder="Course Name"
                className="w-full bg-sky-200 rounded p-2 mb-2"
                value={newCourseName}
                onChange={handleNewCourseChange}
                autoFocus
              />
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="bg-sky-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
                <button 
                  type="button" 
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div 
              className="flex items-center text-sky-600 mt-8 cursor-pointer hover:text-sky-700"
              onClick={handleCreateClick}
            >
              <span className="text-xl mr-2">+</span>
              <span>Create Course</span>
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="w-2/3 p-6">
          <div className="space-y-3">
            <input
              type="text"
              name="codeId"
              placeholder="Code / ID"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.codeId}
              onChange={handleChange}
            />
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
              name="description"
              placeholder="Description"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.duration}
              onChange={handleChange}
            />
            <input
              type="text"
              name="sections"
              placeholder="No. of Sections"
              className="w-full bg-sky-200 rounded p-2"
              value={formData.sections}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}