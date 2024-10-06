import React from "react";
import useBins from "../hooks/useBins";
import useProfile from "../hooks/useProfile";
import { BinDashDisplay } from "../components/BinDashDisplay";
import { Profile } from "../components/Profile";

const Home = () => {
  const { selectedBin, selectBin, loading, error, bins } = useBins();
  const { logout } = useProfile();

  return (
    <div className="w-screen h-screen px-2 py-2">
      {" "}
      {/* No overflow-y-scroll here */}
      <div className="flex flex-col gap-2 h-full">
        <Profile />
        {loading ? (
          <p>Loading bins...</p>
        ) : error ? (
          <p>Error fetching bins: {error}</p>
        ) : (
          <div className="flex-grow">
            {bins.length > 0 ? (
              <div className="flex flex-col gap-[1px] lg:w-3/4 max-h-[400px] overflow-y-scroll border-[1px] border-black px-[1px] py-[1px] bg-gray-300">
                {/* Set a max height and make this container scrollable */}
                <BinDashDisplay
                  location={"Location"}
                  binType={"Bin Type"}
                  binStatus={"Bin Status"}
                  isHeading={true}
                />
                {bins.map((bin, index) => (
                  <div key={index}>
                    <BinDashDisplay
                      onClick={() => selectBin(bin)}
                      location={bin.location}
                      binType={bin.binType}
                      binStatus={bin.binStatus}
                      binColor={
                        bin.binStatus.toLowerCase() === "empty"
                          ? "text-green-600"
                          : bin.binStatus.toLowerCase() === "not full"
                          ? "text-yellow-500"
                          : bin.binStatus.toLowerCase() === "full"
                          ? "text-red-600"
                          : "text-black"
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No bins found.</p>
            )}
          </div>
        )}

        <p>{selectedBin ? selectedBin.binStatus : "no bin selected"}</p>
      </div>
    </div>
  );
};

export default Home;
