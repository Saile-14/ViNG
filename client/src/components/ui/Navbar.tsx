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
import { AuthContext, AuthContextType } from "@/main";
import { useContext, useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";



const Navbar = () => {

  const { data: user, refetch } = useCurrentUser();

  const auth = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth?.setSignedIn(true);
      refetch(); 
    }
  }, [refetch]);

  useEffect(() => {
    if (user) {
      auth?.setCurrentUser(user.id);
    }
  }, [user]);

  useEffect(() => {
    
    console.log(user?.id);}
    

    ,[useCurrentUser])

  return (
    <nav className="pt-6 px-10 pb-4 z-40 fixed top-0 w-screen flex items-center justify-between bg-background">
        <Link to="/" className="text-4xl w-44 text-center font-bold text-primary ">ViNG </ Link>
        {auth?.signedIn ?
        <div className="flex-grow flex text-center justify-center">
          
          <NavigationMenu >
            <NavigationMenuList className="" >
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/feed" className={`${navigationMenuTriggerStyle()} w-32 text-center`}>
                    Feed
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/create-post" className={`${navigationMenuTriggerStyle()} w-32 text-center`}>
                    Send a ViNG
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/my-profile" className={`${navigationMenuTriggerStyle()} w-32 text-center`}>
                    My Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div> : null }

        <div className="flex gap-4 w-44 justify-center">
          <Button onClick={() => {console.log(auth)}} />
        {auth?.signedIn ?  
        <Link to="/" >
          <Button onClick={() => {localStorage.removeItem("token"); auth.setSignedIn(false);}}>
            Log out
          </Button>
        </Link>           
          :
          <Link to="/" >
            <Button>
              Log In
            </Button>
          </Link>}
          <ModeToggle />
        </div>
    </nav>
  );
};

export default Navbar;