import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

        <p className="mb-2">💎</p>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-slate-950 flex"
      >
        <div className="w-full text-white flex flex-col text-2xl gap-y-5 pt-20 font-semibold">
          <button className=" flex justify-start pl-20 hover:bg-slate-500"> 📊 Dashboard</button>
          <button className=" flex justify-start pl-20 hover:bg-slate-500"> 🤝 Meet</button>
          <button className=" flex justify-start pl-20 hover:bg-slate-500"> 👫 Friends</button>
          <button className=" flex justify-start pl-20 hover:bg-slate-500"> 🔍 Search</button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
