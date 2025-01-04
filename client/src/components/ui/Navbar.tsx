import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,  
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav className="mt-6 px-10 pb-10 z-40 fixed top-0 w-screen flex items-center justify-between">
        <Link to="/" className="text-4xl w-44 text-center font-bold text-primary ">ViNG </ Link>

        <div className="flex-grow flex text-center justify-center">
          <NavigationMenu >
            <NavigationMenuList className="" >
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-32 text-center`} >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs" >
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-32 text-center`}>
                    Something
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-32 text-center`}>
                    Nothing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-4 w-44 justify-center">
          <Link to="/sign-up" >
            <Button>
              Sign up
            </Button>
          </Link>
          <ModeToggle />
        </div>
    </nav>
  );
};

export default Navbar;