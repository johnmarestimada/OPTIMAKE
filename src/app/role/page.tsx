import Link from "next/link";

interface RoleCardProps {
  title: string;
  icon: string;
}

export default function SelectRole() {
  return (
    <div className="h-screen relative">
      {/* bgcolor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-700"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-cyan-50"></div>

      <div className="relative flex items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[1000px] h-[600px] text-center z-10">
          
          <div className="text-left mb-4">
            <Link href="/">
              <span className="text-cyan-500 text-sm cursor-pointer">&lt; Logout</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold mb-2">Select Your Role</h1>
          <p className="text-gray-500 text-sm mb-6">
            Choose your role to access the appropriate management tools and features.
          </p>

          {/* role area */}
          <div className="flex justify-center gap-10 mt-20">
            <Link href="/role/dean">  {/* ✅ Fix the href here */}
              <RoleCard title="College Dean" icon="/dean.svg" />
            </Link>
            <Link href="/role/admin">  {/* ✅ Fix the href here */}
            <RoleCard title="Campus Admin" icon="/admin.svg" />
            </Link>
            <Link href="/role/chairman">  {/* ✅ Fix the href here */}
            <RoleCard title="Department Head" icon="/chairman.svg" />
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-36">
            Learn more about roles and permissions 
            <Link href="/">
              <span className="text-cyan-500 cursor-pointer"> here.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

//role components
const RoleCard: React.FC<RoleCardProps> = ({ title, icon }) => {
  return (
    <div className="bg-cyan-700 p-6 rounded-lg w-[200px] h-[200px] flex flex-col items-center cursor-pointer hover:shadow-md transition">
      <img src={icon} alt={title} className="w-20 h-20 mb-2" />
      <span className="font-semibold text-white">{title}</span>
    </div>
  );
};
