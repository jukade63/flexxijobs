import Image from "next/image";
import { getSession } from "@/lib/util-fns/get-session";
import EditProfileButton from "@/app/worker/(account)/profile/_components/bio/EditProfileButton";
import { Session } from "next-auth";
import { Progress } from "../ui/progress";
import { getAllProfileData } from "@/actions/worker-profile";
import calculateCompletenessRate from "@/lib/util-fns/calculate-profile-complete";
import fallback from "../../public/fallback-img.png";

export default async function BasicInfo() {
  const session = await getSession();
  const profileData = await getAllProfileData();
  const profileCompleteRate = calculateCompletenessRate(profileData);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-evenly p-5 bg-rose-700 text-white rounded-sm">
      <div className="relative flex gap-4 items-center">
        <Image
          src={session?.user?.imgUrl ?? fallback}
          alt="profile"
          className="object-cover rounded-full"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-white">
            {session?.user?.username || ""}
          </h2>
          <div className="text-sm text-white ">
            Email : {session?.user?.email || ""}
          </div>
          <div className="text-sm text-white">
            Phone Number : {session?.user?.phoneNumber || ""}
          </div>
        </div>
        <div className="absolute top-2 right-0">
          <EditProfileButton session={session as Session} />
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={profileCompleteRate} />
        <p className="text-white text-sm">
          {profileCompleteRate.toFixed(0)}% of your profile is complete
        </p>
        {profileCompleteRate < 100 && (
          <p className="text-amber-400 text-sm font-semibold">
            Complete your profile to apply for jobs
          </p>
        )}
      </div>
    </div>
  );
}
