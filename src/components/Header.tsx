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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./mode-toggle";
import LangSwitcher from "./LangSwitcher";
import { useTranslation } from "react-i18next";
import UserProfile from "@/components/UserProfile";

export default function Header() {
  const { isLoggedIn, logout } = useContext(authContext);
  const { t } = useTranslation();

  console.log("Header render, isLoggedIn:", isLoggedIn);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/google?c=${window.location.origin}`;
  };

  return (
    <div className="w-full py-2.5 px-5 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">SDC Task</h1>
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Cog8ToothIcon className="size-6" />
          </PopoverTrigger>
          <PopoverContent className="space-y-2">
            <p className="text-sm font-bold">{t("settings.label")}</p>
            <hr />
            <div className="flex justify-between items-center">
              <p className="text-sm">{t("settings.theme")}</p>
              <ModeToggle />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">{t("settings.language")}</p>
              <LangSwitcher />
            </div>
          </PopoverContent>
        </Popover>
        <Dialog>
          <DialogTrigger>
            <UserCircleIcon className="size-6" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {isLoggedIn ? t("user.profile") : t("user.login")}
            </DialogTitle>
            {isLoggedIn ? (
              <>
                <UserProfile />
                <Button variant="outline" onClick={logout}>
                  {t("user.logout")}
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogin}>
                {t("user.login")}
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
