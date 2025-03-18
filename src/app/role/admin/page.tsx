import Link from "next/link";

export default function SelectRole() {
  return (
    <div className="h-screen relative">
      {/* bgcolor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-700"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-cyan-50"></div>

      <div className="relative flex items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[1000px] h-[600px] text-center z-10">
          
          <div className="text-left mb-24">
            <Link href="/role">
              <span className="text-cyan-500 text-sm cursor-pointer">&lt; Back</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold mb-4 mr-64">Campus Admin</h1>
          <p className="text-gray-500 text-sm mb-8 mr-64">
          Get started on registering for a university campus.
          </p>

          <label className="block font-bold mb-2 mr-96">University Name</label>
        <div className="flex items-center border-2 rounded-lg px-3 py-2 mb-4 ml-44 w-72">
          <span className="text-gray-400">@</span>
          <input 
            type="text" 
            className="outline-none w-60 ml-2" 
            placeholder="Enter university name"
          />
        </div>
        <label className="block font-bold mb-2 mr-96">Campus Address</label>
        <div className="flex items-center border-2 rounded-lg px-3 py-2 mb-4 ml-44 w-72">
        <span className="text-gray-400">@</span>
        <input 
          type="text" 
          className="outline-none w-60 ml-2" 
          placeholder="Enter campus address"
        />
        </div>

          <button className="float-center w-60 bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:bg-cyan-500 transition-all mb-10">
          Continue &gt;
        </button>
          
          <p className="text-gray-500 text-sm mt-10">
            Learn more about roles and permissions 
            <Link href="/">
              <span className="text-cyan-500 cursor-pointer"> here.</span>
            </Link>
          </p>
          <div className="hidden sm:block absolute right-72 top-1/2 transform -translate-y-1/2">
        <img
          src="/admin.svg" // Replace with the correct image path in /public/
          alt="Campus Admin"
          width={300}
          height={300}
        />
      </div>

        </div>
      </div>
    </div>
  );

};
