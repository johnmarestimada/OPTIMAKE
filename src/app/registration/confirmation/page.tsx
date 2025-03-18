import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex h-screen bg-[#EAF4FA] justify-center items-center "> 

      <div className="flex justify-between bg-white rounded-xl shadow-lg w-[800px] h-[500px] z-10">
        <div className="p-10">      
        <div className="text-cyan-500 text-sm cursor-pointer mb-6">&lt; Back</div>
        
        <h1 className="text-4xl font-extrabold mb-2">Registration</h1>
        <div className="text-left text-sm text-gray-500 mb-6">
          Check your account password.
        </div>
        
        <label className="block font-bold mb-2">Password</label>
        <div className="flex items-center border-2 rounded-lg px-3 py-2 mb-8 w-64">
        <span className="text-gray-400">@</span>
        <input 
          type="password" 
          className="outline-none w-60 ml-2" 
          placeholder="Enter your password"
        />
        </div>
        <Link href="/verification">
      <button className="float-right w-60 bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:bg-cyan-500 transition-all mb-10">
          Continue &gt;
        </button>
        </Link>
        <div className="text-sm text-gray-500 mb-30">
          Already have an account? 
            <Link href="/">
            <span className="text-cyan-500 cursor-pointer"> Sign In here.</span>
          </Link>
        </div>
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
