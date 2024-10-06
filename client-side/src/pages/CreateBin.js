import React, { useState } from "react";
import axios from "axios";
import InputButton from "../components/InputButton"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export const CreateBin = () => {
  const [file, setFile] = useState();
  const [binType, setBinType] = useState("");
  const [location, setLocation] = useState("");
  const [imageDisplay, setImageDisplay] = useState(null);
  const navigate = useNavigate();

  const cancel = () => {
    navigate("/");
  };

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for the selected file and set it to imageDisplay
    const imageUrl = URL.createObjectURL(selectedFile);
    setImageDisplay(imageUrl);
  };

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
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-28 lg:py-20">
      <Button
        className={"w-max px-2 lg:px-4 py-1 lg:py-2 fixed top-4 left-4"}
        onClick={cancel}
        text={"Cancel"}
      />
      <h1 className="text-center text-3xl lg:text-6xl font-bold">
        Create New Bin.
      </h1>
      <p className="mt-1 mb-4 text-center text-sm lg:text-lg text-gray-400">
        Put the fries (in the right) bin bro.
      </p>

      <form className="lg:w-1/2 w-10/12" onSubmit={submit}>
        <InputButton
          placeholder="Enter a Bin Name"
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          value={location}
        />

        <div className="lg:mt-3 mt-2">
          <h2 className="font-bold text-xl text-black mb-1 lg:mb-2">
            Select Bin Type
          </h2>
          <div className="mt-[1%] flex flex-wrap lg:flex-row gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Recycling"
                checked={binType === "Recycling"}
                onChange={changeBinType}
                className="form-radio text-black border-black h-5 w-5 focus:ring-black"
              />
              <span className="ml-2 text-black">Recycling</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Landfill"
                checked={binType === "Landfill"}
                onChange={changeBinType}
                className="form-radio text-black border-black h-5 w-5 focus:ring-black"
              />
              <span className="ml-2 text-black">Landfill</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Glass"
                checked={binType === "Glass"}
                onChange={changeBinType}
                className="form-radio text-black border-black h-5 w-5 focus:ring-black"
              />
              <span className="ml-2 text-black">Glass</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Compost"
                checked={binType === "Compost"}
                onChange={changeBinType}
                className="form-radio text-black border-black h-5 w-5 focus:ring-black"
              />
              <span className="ml-2 text-black">Compost</span>
            </label>
          </div>
        </div>

        <div className="mt-[2%]">
          <h2 className="mb-[0.5%] font-bold">Attach image</h2>
        </div>

        <div className="w-full h-32 lg:h-72 mt-2 rounded-lg overflow-hidden relative">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e)}
          />
          {/* <button onClick={submit}>Post Image</button> */}

          <label
            htmlFor="file-upload"
            className="w-full h-full cursor-pointer relative"
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              {file ? (
                <>
                  <img
                    src={imageDisplay}
                    alt="Preview"
                    className="w-full h-full object-cover object-center transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 text-white transition-all duration-300 hover:bg-opacity-50 hover:bg-black">
                    <span className="opacity-0 hover:opacity-100 w-full h-full flex items-center justify-center text-center transition-opacity duration-300">
                      Upload Another Image
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-gray-600">Upload Image</span>
              )}
            </div>
          </label>
        </div>

        <div className="mt-[2%] flex justify-center">
          <button
            className="p-[0.3%] px-[8%] py-[0.8%] font-bold border-2 text-white bg-black border-black rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};