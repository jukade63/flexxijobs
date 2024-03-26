import BasicInfo from "@/components/shared/BasicInfo";
import { ProfileTabs } from "@/app/worker/(account)/profile/_components/ProfileTabs";

const Profile = () => {
  return (
    <>
      <h1 className="font-bold text-2xl">Profile</h1>
      <BasicInfo />
      <div className="mt-2">
        <ProfileTabs />
      </div>
    </>
  );
};

export default Profile;
