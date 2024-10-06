import { useState, useEffect } from "react";
import axios from "axios";

const useBins = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);

  const selectBin = (bin) => {
    setSelectedBin(bin);
  };

  const fetchBins = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/allBins`);
      setBins(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();

    const interval = setInterval(() => {
      fetchBins();
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return {
    bins,
    loading,
    error,
    refreshBins: fetchBins,
    selectBin,
    selectedBin,
  };
};

export default useBins;
