import useProfile from "../hooks/useProfile";
import defaultPP from "../defaultProfilePhoto.jpg";

export const Profile = () => {
  const { profile, loading, refreshProfile } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="flex flex-row items-center justify-start bg-gray-200 py-5 px-6 gap-5 border-[1px] border-black">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-contain"
          src={defaultPP}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col gap-1">
        {profile.orgName ? (
          <h1 className="poppins-semibold">{profile.orgName}</h1>
        ) : (
          <h1 className="poppins-semibold">Organization name not available</h1>
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
      </div>
    </div>
  );
};
