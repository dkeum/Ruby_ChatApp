import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { SearchModal } from "./SearchModal";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex flex-row gap-x-10 items-center text-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="35"
          height="35" // Adjust the size as needed
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-slate-950 flex">
        <div className="w-full text-white flex flex-col text-2xl gap-y-5 pt-20 font-semibold">
          <Link to="/settingboard">
            <button className="w-full flex justify-start pl-20 hover:bg-slate-500">
              {" "}
              📊 Dashboard
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="w-full flex justify-start pl-20 hover:bg-slate-500">
              {" "}
              🤝 Meet
            </button>
          </Link>

          <button className=" flex justify-start pl-20 hover:bg-slate-500">
            {" "}
            👫  <SearchModal title={"Friends"}/>
          </button>
          <button className=" flex flex-row items-center justify-start  pl-20 hover:bg-slate-500">
            {" "}
            🔍 <SearchModal title={"Search"}/>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
