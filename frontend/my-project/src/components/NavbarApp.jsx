import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const NavbarApp = () => {
  return (
    <div className="flex flex-row justify-between w-screen bg-slate-900">
      <div className="flex flex-row text-white ml-20 ">
        <Sidebar />
      </div>

      <div className="flex flex-row gap-x-5 text-2xl items-center mr-[10rem]">
        <div className=" hover:bg-slate-700 p-5 ">🔔</div>

        <div className=" hover:bg-slate-700 p-5">📧</div>

        <div className="w-full h-full bg-slate-900 flex items-center ">
          <NavigationMenu className="flex flex-row justify-between">
            <NavigationMenuList>
              <div className="flex flex-row gap-x-5 text-2xl">
                <NavigationMenuItem className="">
                  <NavigationMenuTrigger className="text-2xl bg-slate-900 hover:bg-slate-700">
                    ⚙️
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[230px] lg:grid-cols-[.75fr_1fr] bg-slate-700 text-white font-semibold">
                      <li className="text-yellow-300" href="/docs" title="Introduction">
                        Ruby Premium
                      </li>
                      <li className="text-yellow-300" href="/docs/installation" title="Installation">
                        Buy Karma
                      </li>
                      <li  href="/docs/primitives/typography" title="Typography">
                        my Profile
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        my Settings
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Rules
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Terms
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Privacy
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Help
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Donate
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                       Log Out
                      </li>
                    </ul>
           
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default NavbarApp;
