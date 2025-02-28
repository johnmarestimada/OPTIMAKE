import Link from "next/link";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#EAF4FA] relative"> 

<img 
        src="/logo.svg" 
        alt="Logo" 
        className="w-60 h-60 absolute top-32 right-80 z-20"></img>

      <div className="bg-white p-10 rounded-xl shadow-lg w-[700px] h-[500px] relative z-10">
        <div className="text-cyan-500 text-sm cursor-pointer mb-6">&lt; Back</div>
        
        <h1 className="text-3xl font-extrabold mb-6">Login</h1>
        
        <label className="block font-bold mb-2">Email</label>
        <div className="flex items-center border-2 rounded-lg px-3 py-2 mb-4 w-72">
          <span className="text-gray-400">@</span>
          <input 
            type="email" 
            className="outline-none w-60 ml-2" 
            placeholder="Enter your email"
          />
        </div>
        <label className="block font-bold mb-2">Password</label>
        <div className="flex items-center border-2 rounded-lg px-3 py-2 mb-4 w-72">
        <span className="text-gray-400">@</span>
        <input 
          type="password" 
          className="outline-none w-60 ml-2" 
          placeholder="Enter your password"
        />
        </div>
        
        <div className="text-cyan-500 text-sm text-left mb-6 cursor-pointer">Forgot your password?</div>
        
        <button className="float-right w-60 bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:bg-cyan-500 transition-all">
          Login
        </button>
        
        <div className="text-center text-sm text-gray-500 mt-4 absolute bottom-5 w-full">
          Don't have an account? 
          <Link href="/registration">
            <span className="text-cyan-500 cursor-pointer"> Sign up here.</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:block bg-cyan-300 h-[500px] w-[250px] absolute top-1/2 transform -translate-y-1/2 right-44 rounded-lg"></div>
    </div>
  );
}
