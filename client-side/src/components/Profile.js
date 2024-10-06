import useProfile from "../hooks/useProfile";
import defaultPP from "../defaultProfilePhoto.jpg";
import Button from "./Button";

const Profile = () => {
  const { profile, loading, refreshProfile, logout } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="flex flex-row items-center justify-start rounded-lg bg-white lg:py-10 py-4 px-4 lg:px-6 gap-6">
      <div className="lg:w-20 lg:h-20 h-12 w-12 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-contain"
          src={defaultPP}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        {profile.orgName ? (
          <h1 className="poppins-semibold text-xl">{profile.orgName}</h1>
        ) : (
          <h1 className="poppins-semibold text-xl">
            Organization name not available
          </h1>
        )}
        {profile.email ? (
          <h1 className="poppins-regular text-black text-opacity-30 text-sm">
            {profile.email}
          </h1>
        ) : (
          <h1 className="poppins-regular text-black text-opacity-30 text-sm">
            Email not available
          </h1>
        )}
        <Button
          className={"w-max text-xs mt-1 px-2 py-1.5 "}
          onClick={logout}
          text={"Log Out"}
        />
      </div>
    </div>
  );
};

export default Profile;