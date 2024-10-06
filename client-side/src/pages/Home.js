import React, { useState } from "react";
import { useBins } from "../context/BinContext"; // ensure correct path
import { BinDashDisplay } from "../components/BinDashDisplay";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Button from "../components/Button";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { bins, loading, error, selectBin } = useBins();
  const navigate = useNavigate();

  // State for selected filters
  const [selectedBinType, setSelectedBinType] = useState("");
  const [selectedBinStatus, setSelectedBinStatus] = useState("");

  const addSpotNavigate = () => {
    navigate("/createBin");
  };

  const handleBinClick = (bin) => {
    selectBin(bin);
  };

  // Filter bins based on selected filters
  const filteredBins = bins.filter((bin) => {
    const matchesType = selectedBinType
      ? bin.binType === selectedBinType
      : true;
    const matchesStatus = selectedBinStatus
      ? bin.binStatus === selectedBinStatus
      : true;
    return matchesType && matchesStatus;
  });

  // Handle filter button clicks
  const handleBinTypeFilter = (type) => {
    setSelectedBinType(type);
  };

  const handleBinStatusFilter = (status) => {
    setSelectedBinStatus(status);
  };

  return (
    <div className="w-screen bg-gray-300 h-screen px-2 py-2">
      <div className="flex flex-row gap-2 h-full">
        <div className="flex gap-2 flex-col w-1/4">
          <Profile />
          <SideBar />
        </div>
        <div className="w-3/4 h-full bg-white px-4 py-4 rounded-lg">
          <h1 className="poppins-semibold text-4xl mb-4">Garbage Dashboard</h1>

          <h2 className="text-sm text-black text-opacity-30 poppins-regular mb-1 ml-1">
            Filter By:
          </h2>
          <div className="flex flex-row justify-between">
            <div className="flex items-center flex-row gap-3 w-2/3 mb-4">
              <Button
                text={"All"}
                onClick={() => handleBinStatusFilter("")}
                className={`w-max ${
                  selectedBinStatus === "" ? "font-bold" : ""
                }`}
              />
              <Button
                text={"Empty"}
                onClick={() => handleBinStatusFilter("empty")}
                className={`w-max ${
                  selectedBinStatus === "Empty" ? "font-bold" : ""
                }`}
              />
              <Button
                text={"Not Full"}
                onClick={() => handleBinStatusFilter("not full")}
                className={`w-max ${
                  selectedBinStatus === "Not Full" ? "font-bold" : ""
                }`}
              />
              <Button
                text={"Full"}
                onClick={() => handleBinStatusFilter("full")}
                className={`w-max ${
                  selectedBinStatus === "Full" ? "font-bold" : ""
                }`}
              />
            </div>
            <Button
              onClick={addSpotNavigate}
              text={"Add Bin"}
              className={"w-max"}
              icon={<FiPlus />}
            />
          </div>
          {loading ? (
            <p>Loading bins...</p>
          ) : error ? (
            <p>Error fetching bins: {error}</p>
          ) : (
            <div className="w-full h-full">
              <BinDashDisplay
                location={"Location"}
                binType={"Bin Type"}
                binStatus={"Bin Status"}
                isHeading={true}
                className={"rounded-t-lg overflow-hidden"}
              />
              {filteredBins.length > 0 ? (
                <div className="flex rounded-b-lg flex-col gap-[1px] w-full max-h-full overflow-y-scroll border-[1px] border-black px-[1px] py-[1px] bg-gray-300">
                  {filteredBins.map((bin, index) => (
                    <div key={index} onClick={() => handleBinClick(bin)}>
                      <BinDashDisplay
                        location={bin.location}
                        binType={bin.binType}
                        binStatus={bin.binStatus}
                        lastUpdated={bin.lastUpdated}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
