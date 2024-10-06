import React from "react";
import useBins from "../hooks/useBins";
import useProfile from "../hooks/useProfile";
import { BinDashDisplay } from "../components/BinDashDisplay";

const Home = () => {
  const { bins, loading, error, refreshBins } = useBins();
  const { logout } = useProfile();

  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <p>Loading bins...</p>
      ) : error ? (
        <p>Error fetching bins: {error}</p>
      ) : (
        <div>
          {bins.length > 0 ? (
            <div className="flex flex-col gap-[1px] lg:w-3/4 px-[1px] py-[1px] bg-gray-300">
              <BinDashDisplay
                location={"Location"}
                binType={"Bin Type"}
                binStatus={"Bin Status"}
                isHeading={true}
              />
              {bins.map((bin, index) => (
                <div key={index}>
                  <BinDashDisplay
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

      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Home;
