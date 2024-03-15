import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ homeRef, missionRef, featureRef }) => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  const scrollToSection = (elementRef, link) => {

    if(location.pathname === "/login" || location.pathname === "/createaccount" ){
        navigate('/')
    }

    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
    setActiveLink(link);
  };


  return (
    <nav className="w-screen flex flex-row min-w-[500px] md:justify-between lg:justify-around p-10 bg-slate-900 text-gray-500 text-2xl font-semibold sticky top-0 z-50">
      <Link to="/" >
        <div className="transition-all ease-in-out delay-150 hover:text-white duration-300 text-4xl ">
          💎 Ruby Chat
        </div>
      </Link>

      <ul className="flex flex-row gap-x-5 cursor-pointer">
        <li >
          <a
            onClick={() => scrollToSection(homeRef, "home")}
            className={`transition-all ease-in-out delay-150 hover:text-white duration-300 ${
              activeLink === "home" ? "text-white" : ""
            }`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            onClick={() => scrollToSection(missionRef, "mission")}
            className={`transition-all ease-in-out delay-150 hover:text-white duration-300 ${
              activeLink === "mission" ? "text-white" : ""
            }`}
          >
            Our Mission
          </a>
        </li>
        <li>
          <a
            onClick={() => scrollToSection(featureRef, "features")}
            className={`transition-all ease-in-out delay-150 hover:text-white duration-300 ${
              activeLink === "features" ? "text-white" : ""
            }`}
          >
            Features
          </a>
        </li>
        <li>
          <Link to="/login" className="transition-all ease-in-out delay-150 hover:text-white duration-300">
            Login
          </Link>
        </li>
        <li>
          <Link to="/createaccount" className="transition-all ease-in-out delay-150 hover:text-white duration-300">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
