"use client";

import { Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DeanDashboard() {
  const [departments, setDepartments] = useState([
    { id: "1", name: "Department of Computer Science", hashKey: "5d41402abc4b2a76b9719d911017c592" },
    { id: "2", name: "Department of Data Science", hashKey: "e4da3b7fbbce2345d7772b0674a318d5" },
    { id: "3", name: "Department of Information Technology", hashKey: "1679091c5a880faf6fb5e6087eb1b2dc" }
  ]);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    hashKey: ""
  });
  
  const [editMode, setEditMode] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  // Generate a random hash key
  const generateHashKey = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const handleCreateNewDepartment = () => {
    // Reset form and set to create mode
    setFormData({
      id: "",
      name: "",
      hashKey: generateHashKey()
    });
    setSelectedDepartmentId(null);
    setEditMode(false);
  };

  const handleDepartmentSelect = (id: string) => {
    const selectedDepartment = departments.find(d => d.id === id);
    if (selectedDepartment) {
      setFormData({
        id: selectedDepartment.id,
        name: selectedDepartment.name,
        hashKey: selectedDepartment.hashKey
      });
      setSelectedDepartmentId(id);
      setEditMode(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDepartment = () => {
    if (!formData.name.trim()) {
      alert("Department name is required");
      return;
    }

    if (editMode && selectedDepartmentId) {
      // Update existing department
      setDepartments(prevDepartments => 
        prevDepartments.map(dept => 
          dept.id === selectedDepartmentId ? { ...formData, id: selectedDepartmentId } : dept
        )
      );
    } else {
      // Add new department
      const newId = (Math.max(...departments.map(d => parseInt(d.id)), 0) + 1).toString();
      setDepartments(prevDepartments => [
        ...prevDepartments,
        { ...formData, id: newId }
      ]);
    }

    // Reset form after saving
    handleCreateNewDepartment();
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartmentId) {
      if (confirm("Are you sure you want to delete this department?")) {
        setDepartments(prevDepartments => 
          prevDepartments.filter(dept => dept.id !== selectedDepartmentId)
        );
        handleCreateNewDepartment();
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.hashKey);
    alert("Hash key copied to clipboard!");
  };

  const regenerateHashKey = () => {
    setFormData(prev => ({
      ...prev,
      hashKey: generateHashKey()
    }));
  };

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
          <div 
            className="flex items-center mb-8 cursor-pointer hover:bg-sky-50 p-2 rounded"
            onClick={handleCreateNewDepartment}
          >
            <span className="text-xl mr-2">+</span>
            <span className="text-gray-500">Create Department</span>
          </div>

          <div className="space-y-4">
            {departments.map((dept) => (
              <div 
                key={dept.id} 
                className={`p-2 rounded cursor-pointer ${selectedDepartmentId === dept.id ? 'bg-sky-100' : 'hover:bg-sky-50'}`}
                onClick={() => handleDepartmentSelect(dept.id)}
              >
                <p className="text-gray-500">{dept.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Details */}
        <div className="w-2/3 p-6">
          <div className="mb-6">
            <label className="text-gray-500 text-sm">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded p-2 mt-1"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter department name"
            />
          </div>

          <div className="flex space-x-3 mt-4 mb-8">
            <button 
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
              onClick={handleSaveDepartment}
            >
              {editMode ? "Update Department" : "Save Department"}
            </button>
            
            {editMode && (
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={handleDeleteDepartment}
              >
                Delete Department
              </button>
            )}
            
            {editMode && (
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCreateNewDepartment}
              >
                Cancel
              </button>
            )}
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
                value={formData.hashKey}
                readOnly
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
            </div>
            
            <button 
              className="mt-2 text-sky-500 text-sm hover:text-sky-700"
              onClick={regenerateHashKey}
            >
              Generate new hash key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}