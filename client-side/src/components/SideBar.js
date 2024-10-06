import React, { useEffect } from "react";
import Button from "../components/Button";
import { useBins } from "../context/BinContext";

function SideBar() {
  const { selectedBin, loading, error } = useBins();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedBin) {
    return (
      <div className="flex flex-col gap-1 items-center justify-center bg-white h-full w-full rounded-lg">
        <p className="poppins-semibold text-xl">No bin selected.</p>
        <p className="poppins-regular text-black text-opacity-30 text-sm">
          Select a bin to start.
        </p>
      </div>
    );
  }

  let formattedDate, formattedTime;

  if (selectedBin) {
    formattedDate = new Date(selectedBin.lastUpdated).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
      }
    );

    formattedTime = new Date(selectedBin.lastUpdated).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Set to false for 24-hour format
      }
    );
  }

  return (
    <div className="bg-white flex flex-col gap-4 justify-between w-full rounded-lg px-5 py-4 h-full">
      <div>
        <h1 className=" text-2xl poppins-semibold">{selectedBin.location}</h1>
        {selectedBin ? (
          <div className="flex flex-col">
            <p className="poppins-regular text-lg">
              Status:{" "}
              <span
                className={`uppercase ${
                  selectedBin.binStatus === "full"
                    ? "text-red-500"
                    : selectedBin.binStatus === "not full"
                    ? "text-yellow-500"
                    : selectedBin.binStatus === "empty"
                    ? "text-green-500"
                    : "text-black"
                }`}
              >
                {selectedBin.binStatus}
              </span>
            </p>
            <p className="poppins-regular text-[0.9vw] opacity-30">
              Bin Type: {selectedBin.binType}
            </p>
            <div className="w-full mt-2 mb-4 h-52 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={selectedBin.image}
              ></img>
            </div>

            <h1 className="text-xl poppins-semibold">Bin Information</h1>

            <div className="flex-col flex gap-4 mt-2">
              <div className="w-[100%] flex items-center justify-between">
                <p className="text-black text-opacity-30 text-sm">Bin ID</p>
                <p className="poppins-medium text-opacity-30 text-black text-sm">
                  {selectedBin._id}
                </p>
              </div>

              <div className="w-[100%] flex items-center justify-between">
                <p className="text-black text-opacity-30 text-sm">Bin Status</p>
                <p
                  className={`uppercase ${
                    selectedBin.binStatus === "full"
                      ? "text-red-500 text-lg"
                      : selectedBin.binStatus === "not full"
                      ? "text-yellow-500 text-lg"
                      : selectedBin.binStatus === "empty"
                      ? "text-green-500 text-lg"
                      : "text-black"
                  }`}
                >
                  {selectedBin.binStatus}
                </p>
              </div>

              <div className="w-[100%] flex items-center justify-between">
                <p className="text-black text-opacity-30 text-sm">Bin Type</p>
                <p className="poppins-medium text-lg">{selectedBin.binType}</p>
              </div>

              <div className="w-[100%] flex items-center justify-between">
                <p className="text-black text-opacity-30 text-sm">
                  Bin Location
                </p>
                <p className="poppins-medium text-lg">{selectedBin.location}</p>
              </div>

              <div className="w-[100%] flex items-center justify-between">
                <p className="text-black text-opacity-30 text-sm">
                  Last Updated
                </p>
                <p className="poppins-medium text-lg">
                  <p className="poppins-medium text-lg">{`${formattedDate}, ${formattedTime}`}</p>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No bin selected</p>
        )}
      </div>
      <Button className="mb-1" text="View More" />
    </div>
  );
}

export default SideBar;
