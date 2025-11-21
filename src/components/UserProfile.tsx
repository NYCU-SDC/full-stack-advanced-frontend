import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUserProfile } from "@/requests/getUserProfile";
import { updateProfile } from "@/requests/updateProfile";
import { type UserProfile } from "@/types/user.type";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  const [cookies] = useCookies(["access_token"]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (!cookies.access_token) return;

    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile(cookies.access_token);
        setProfile(res);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [cookies.access_token]);

  // Sync aboutText with profile.about when profile is loaded
  useEffect(() => {
    if (profile) {
      setAboutText(profile.about);
    }
  }, [profile]);

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    if (!cookies.access_token) return;

    console.log("Saving about text:", aboutText);

    const updateUserProfile = async () => {
      try {
        const updatedProfile = await updateProfile(
          cookies.access_token,
          aboutText
        );
        setProfile(updatedProfile);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    };
    updateUserProfile();
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <img
          src={profile.avatarUrl}
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
        <p className="text-xl font-semibold">{profile.username}</p>
        <p className="self-start text-sm flex items-center gap-1">
          <EnvelopeIcon className="size-6" /> {profile.email}
        </p>
      </div>
      <div className="space-y-2 flex-auto">
        <div className="flex justify-between">
          <h2 className="font-bold">About</h2>
          {!isEditingAbout ? (
            <PencilSquareIcon
              className="size-6"
              onClick={() => setIsEditingAbout(true)}
            />
          ) : (
            <Button onClick={handleSaveAbout}>Save</Button>
          )}
        </div>
        {isEditingAbout ? (
          <textarea
            className="resize-none w-full h-auto rounded-md border-2 border-gray-300 p-2"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
        ) : (
          <>
            {aboutText.length > 0 && (
              <p className="flex-auto rounded-md border-1 border-gray-300 p-2 whitespace-pre-wrap break-all">
                {aboutText}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
