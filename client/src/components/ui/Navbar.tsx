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
    <nav className="mt-6 z-40 fixed top-0 w-screen">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-4xl font-bold text-primary ">ViNG </ Link>

        <div className="flex gap-10">
          <NavigationMenu >
          <NavigationMenuList className="flex gap-10" >
            <NavigationMenuItem>
            <Link to="/dashboard">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs" >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Something
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Nothing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-4 text-center justify-center">
          <Link to="/sign-up" >
            <Button>
              Sign up
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;