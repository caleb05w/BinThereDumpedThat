import React from "react";
import useBins from "../hooks/useBins";
import useProfile from "../hooks/useProfile";

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
          <h2>Bins List</h2>
          {bins.length > 0 ? (
            <div>
              {bins.map((bin, index) => (
                <div key={index} className="flex flex-row gap-8">
                  <h1>{bin.location}</h1>
                  <h1>{bin.binStatus}</h1>
                  <h1>{bin.binType}</h1>
                  <img
                    className="w-40 h-32 object-contain"
                    src={bin.image}
                  ></img>
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
