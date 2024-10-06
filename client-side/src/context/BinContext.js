import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BinContext = createContext();

export const useBins = () => {
  return useContext(BinContext);
};

export const BinProvider = ({ children }) => {
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
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <BinContext.Provider
      value={{ bins, loading, error, selectBin, selectedBin }}
    >
      {children}
    </BinContext.Provider>
  );
};
