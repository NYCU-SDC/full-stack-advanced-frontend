import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { authContext } from "@/lib/authContext";
import { useContext } from "react";

export default function Header() {
  const { isLoggedIn } = useContext(authContext);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/google?c=${window.location.origin}`;
  };

  return (
    <div className="w-full py-2.5 px-5 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">SDC Task</h1>
      <Dialog>
        <DialogTrigger>
          <UserCircleIcon className="w-6 h-6" />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{isLoggedIn() ? "Profile" : "Login"}</DialogTitle>
          {isLoggedIn() ? (
            <p>You are logged in.</p>
          ) : (
            <Button variant="outline" onClick={handleLogin}>
              Login
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
