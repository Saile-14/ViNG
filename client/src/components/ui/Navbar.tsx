import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-bold">ViNG </div>

        <NavigationMenu >
          <NavigationMenuList >
          <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()} >
              dashboard?
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/docs" >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="bg-secondary-main text-white hover:bg-secondary-light">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;