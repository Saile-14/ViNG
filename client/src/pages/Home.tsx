import { LoginForm } from "@/components/login-form";

function Home() {
    return ( 
      <>
          <div className="flex min-h-svh items-center justify-center">
            <div className="w-screen max-w-sm">
             <LoginForm />
            </div>
          </div>
      </>
    );
}

export default Home;