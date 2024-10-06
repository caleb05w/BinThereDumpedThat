import React, { useState } from "react";
import axios from "axios";

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

    try {
      await axios.post(`${process.env.REACT_APP_URL}/createBin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1>Create Bin</h1>

      <form className="flex flex-col gap-8 items-start" onSubmit={submit}>
        <input
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          required
          className="bg-gray-300 w-1/4"
        />

        <div>
          <h2>Select Bin Type</h2>
          <div className="flex flex-row gap-4">
            <label>
              <input
                type="radio"
                value="Recycling"
                checked={binType === "Recycling"}
                onChange={changeBinType}
              />
              Recycling
            </label>
            <br />

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
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
