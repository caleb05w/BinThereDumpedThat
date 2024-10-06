import React, { useState } from "react";
import axios from "axios";
import InputButton from "../components/InputButton"

export const CreateBin = () => {
  const [file, setFile] = useState();
  const [binType, setBinType] = useState("");
  const [location, setLocation] = useState("");

  const changeBinType = (event) => {
    setBinType(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("location", location);
    formData.append("binType", binType);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

    try {
      await axios.post(`${process.env.REACT_APP_URL}/createBin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="px-[25%] py-[10%] mb-[10%]">
      <h1 className="text-center text-6xl font-bold">Create New Bin.</h1>
      <p className="m-[2%] text-center text-gray-400">A super cool catchphrase</p>

      <form className="mt-[5%]" onSubmit={submit}>

        <InputButton 
          placeholder="Enter a Bin Name"
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          value={location}
          />
        
        <div className="mt-[2%]">
          <h2 className="font-bold">Select Bin Type</h2>
          <div className="mt-[0.5%] flex flex-row justify-between gap-4">
            
            <label>
              <input
                type="radio"
                value="Recycling"
                checked={binType === "Recycling"}
                onChange={changeBinType}
              />
              Recycling
            </label>
            <br/>

            <label>
              <input
                type="radio"
                value="Landfill"
                checked={binType === "Landfill"}
                onChange={changeBinType}
              />
              Landfill
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="Glass"
                checked={binType === "Glass"}
                onChange={changeBinType}
              />
              Glass
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="Compost"
                checked={binType === "Compost"}
                onChange={changeBinType}
              />
              Compost
            </label>
            <br />
          </div>
        </div>

        <div className="mt-[2%]">
        <h2 className="mb-[0.5%] font-bold">Attach image</h2>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        </div>

        <div className="mt-[2%] flex justify-center">
        <button className="p-[0.3%] px-[8%] py-[0.8%] font-bold border-2 text-white bg-black border-black rounded-md" type="submit">Submit</button>
        </div>

      </form>
    </div>
  );
};