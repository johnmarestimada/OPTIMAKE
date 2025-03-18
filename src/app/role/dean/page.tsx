import Link from "next/link";

export default function SelectRole() {
  return (
    <div className="h-screen relative">
      {/* Background colors */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-700"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-cyan-50"></div>

      <div className="relative flex items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[900px] h-[600px] text-center z-10">
          
          {/* Logout Link */}
          <div className="text-left mb-24">
            <Link href="/role">
              <span className="text-cyan-500 text-sm cursor-pointer">&lt; Back</span>
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold mb-4 mr-64">College Dean</h1>
          <p className="text-gray-500 text-sm mb-8 mr-64">
            Input the hash key given by the campus admin.
          </p>

          {/* Hash Key Input */}
          <label className="block font-bold mb-2 mr-64">Hash key</label>
          <div className="flex items-center justify-center border-2 rounded-lg px-3 py-2 mb-10 ml-44 w-60 mx-auto">
            <span className="text-gray-400"></span>
            <input 
              type="text" 
              className="outline-none w-full" 
              placeholder="Enter your hash key"
            />
          </div>

          {/* Continue Button */}
          <button className="w-60 bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:bg-cyan-500 transition-all mb-10 mx-auto block">
            Continue &gt;
          </button>
          
          {/* Learn More Link */}
          <p className="text-gray-500 text-sm mt-10">
            Learn more about roles and permissions 
            <Link href="/">
              <span className="text-cyan-500 cursor-pointer"> here.</span>
            </Link>
          </p>

          {/* Image */}
          <div className="hidden sm:block absolute right-80 top-1/2 transform -translate-y-1/2">
            <img
              src="/dean.svg"
              alt="College Dean"
              width={300}
              height={300}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
