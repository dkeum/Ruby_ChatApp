const NavBar = () => {
  return (
    <div className=" w-screen flex flex-row min-w-[500px] md:justify-between lg:justify-around p-10 bg-slate-900 text-gray-500 font-semibold ">
      <div className="transition-all ease-in-out delay-150 hover:text-white duration-300 ">Logo</div>

      <ul className="flex flex-row gap-x-5 ">
        <button className="transition-all ease-in-out delay-150 hover:text-white duration-300 hover:underline decoration-pink-500">Home</button>
        <button className="transition-all ease-in-out delay-150 hover:text-white duration-300 hover:underline decoration-pink-500">Our Mission</button>
        <button className="transition-all ease-in-out delay-150 hover:text-white duration-300 hover:underline decoration-pink-500">Features</button>
        <button className="transition-all ease-in-out delay-150 hover:text-white duration-300 hover:underline decoration-pink-500">Login</button>
      </ul>
    </div>
  );
};

export default NavBar;
