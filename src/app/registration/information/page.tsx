import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#EAF4FA] justify-center items-center "> 
      <div className="flex justify-between bg-white rounded-xl shadow-lg w-[800px] h-[500px] z-10">
        <div className="p-10">   
        
        <Link href="/verification">
          <div className="text-cyan-500 text-sm cursor-pointer mb-4">&lt; Back</div>
        </Link>

        <h1 className="text-3xl font-extrabold mb-2">Registration</h1>
        <p className="text-gray-500 text-sm mb-6">Lastly, input your personal information.</p>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-bold text-sm mb-2">First Name</label>
            <div className="flex items-center border-2 rounded-lg px-3 py-2 w-44">
              <span className="text-gray-400">@</span>
              <input 
                type="text" 
                className="outline-none w-full ml-2" 
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="w-1/2">
            <label className="block font-bold text-sm mb-2">Last Name</label>
            <div className="flex items-center border-2 rounded-lg px-3 py-2 w-44 ">
              <span className="text-gray-400">@</span>
              <input 
                type="text" 
                className="outline-none w-full ml-2" 
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>

        {/* Birthday */}
        <label className="block font-bold text-sm mt-4 mb-2">Birthday</label>
      <div className="flex space-x-2 mb-4">
          <select className="border-2 rounded-lg px-3 py-2 w-1/3 bg-white" defaultValue="">
            <option value="" disabled>Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <input 
            type="number" 
            className="border-2 rounded-lg px-3 py-2 w-1/4 text-center" 
            placeholder="00"
            min="1"
            max="31"
          />
          <input 
            type="number" 
            className="border-2 rounded-lg px-3 py-2 w-1/4 text-center" 
            placeholder="0000"
            min="1900"
            max="2025"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4"/>
            <span className="text-sm text-gray-500">
              I agree to the <Link href="/terms" className="text-cyan-500">Terms & Conditions</Link>
            </span>
          </div>
          </div>
          <Link href="/role">
            <button className="bg-cyan-400 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-cyan-500 transition-all">
              Continue
            </button>
          </Link>
        </div>
        <img 
        src="/logo.svg" 
        alt="Logo" 
        className="w-60 h-60 absolute ml-96 "></img>
        <div className="bg-cyan-300 rounded-lg flex w-64 h-100 z-50"></div>
      </div>
    </div>
  );
}
