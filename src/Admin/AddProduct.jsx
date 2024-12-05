import React, { useState } from "react";

const AddProduct = () => {
  const [step, setStep] = useState(1); // Step 1: Basic Info, Step 2: Uploads
  const [carId, setCarId] = useState(null); // Store created car ID

  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [transmission, setTransmission] = useState("");

  const [imageFiles, setImageFiles] = useState([]); // Array to store image files
  const [modelFile, setModelFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle multiple image uploads
  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // Store multiple files in state
  };

  // Handle 3D model upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setModelFile(file);
  };

  // Submit Basic Car Info
  const handleSubmitBasicInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      model,
      make,
      year,
      pricePerDay,
      transmission,
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Access denied: No token provided.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setCarId(responseData._id); // Save the created car's ID
        setMessage("Car information saved successfully!");
        setStep(2); // Proceed to Step 2
      } else {
        const errorData = await response.json();
        setMessage(`Failed to save car information: ${errorData.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit Images and 3D Model
  const handleSubmitUploads = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    if (!carId) {
      setMessage("Error: No car ID found.");
      setLoading(false);
      return;
    }
  
    const token = localStorage.getItem("authToken");
  
    try {
      // Upload Images
      const imageFormData = new FormData();
      imageFiles.forEach((file) => imageFormData.append("image", file));
  
      const imageResponse = await fetch(
        `https://show-room-server-979c93442bc5.herokuapp.com/api/file/uploadImagesToCar/${carId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        }
      );
  
      if (!imageResponse.ok) {
        const errorData = await imageResponse.json();
        console.error("Image upload error:", errorData);
        setMessage(`Failed to upload images: ${errorData.message || "Unknown error"}`);
        setLoading(false);
        return;
      }
  
      // Upload Model
      if (modelFile) {
        const modelFormData = new FormData();
        modelFormData.append("modelFile", modelFile);
  
        const modelResponse = await fetch(
          `https://show-room-server-979c93442bc5.herokuapp.com/api/file/uploadModelToCar/${carId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: modelFormData,
          }
        );
  
        if (!modelResponse.ok) {
          const errorData = await modelResponse.json();
          console.error("Model upload error:", errorData);
          setMessage(`Failed to upload model: ${errorData.message || "Unknown error"}`);
          setLoading(false);
          return;
        }
      }
  
      // Success Message
      setMessage("Images and model uploaded successfully!");
    } catch (error) {
      console.error("General error:", error);
      setMessage("An error occurred. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <h1 className="font-bold text-lg text-black">Add Product</h1>
      <div className="bg-white border rounded-md border-black p-7 scroll-smooth">
        {step === 1 && (
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitBasicInfo}>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="model" className="font-medium">
                Model
              </label>
              <input
                className="border rounded px-3 py-2"
                type="text"
                id="model"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="make" className="font-medium">
                Make
              </label>
              <input
                className="border rounded px-3 py-2"
                type="text"
                id="make"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="year" className="font-medium">
                Year
              </label>
              <input
                className="border rounded px-3 py-2"
                type="number"
                id="year"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="pricePerDay" className="font-medium">
                Price Per Day
              </label>
              <input
                className="border rounded px-3 py-2"
                type="number"
                id="pricePerDay"
                placeholder="Price Per Day"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="transmission" className="font-medium">
                Transmission
              </label>
              <input
                className="border rounded px-3 py-2"
                type="text"
                id="transmission"
                placeholder="Transmission"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              />
            </div>
            <button
              className="bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitUploads}>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="imageFile" className="font-medium">
                Upload Images
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                multiple // Allow multiple files
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="modelFile" className="font-medium">
                Upload 3D Model
              </label>
              <input
                type="file"
                id="modelFile"
                name="modelFile"
                accept=".glb,.gltf,.obj"
                onChange={handleFileUpload}
              />
            </div>
            <button
              className="bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
