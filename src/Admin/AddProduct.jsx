import React, { useState } from "react";
import Compressor from 'compressorjs';

const AddProduct = () => {
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  // const [company, setCompany] = useState(""); // `company` here can be `make` if required
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  // const [color, setColor] = useState("");
  // const [mileage, setMileage] = useState("");
  // const [fuelType, setFuelType] = useState(""); // Ensure correct enum value for `fuelType`
  const [transmission, setTransmission] = useState(""); // Ensure correct enum value for `transmission`
  // const [engineSize, setEngineSize] = useState("");
  // const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // File upload handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6, // Compression quality (0.1 - 1)
        success: (compressedFile) => {
          setImageFile(compressedFile);
          setPreviewImage(URL.createObjectURL(compressedFile));
        },
      });
    }
  };

  

  // Helper function to convert file to base64 string
  // Define the function
// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!(file instanceof File)) {
//       return reject(new Error("Input must be a File object"));
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = (event) => {
//       reject(new Error(`Failed to read file. Error: ${event.target.error?.message || "Unknown error"}`));
//     };

//     try {
//       reader.readAsDataURL(file);
//     } catch (error) {
//       reject(new Error(`Error while starting file read: ${error.message}`));
//     }
//   });
// };

// Usage example
// const handleFileUpload = async (event) => {
//   const file = event.target.files[0];
//   try {
//     const base64String = await convertFileToBase64(file);
//     setModelFile(base64String)
//     console.log('Base64 String:', base64String);
//   } catch (error) {
//     console.error('Error converting file to Base64:', error.message);
//   }
// };

  
  // HTML Example
  // <input type="file" onchange="handleFileUpload(event)" />
  
  const MAX_FILE_SIZE = 40 * 1024 * 1024; // 5 MB

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        return reject(new Error("Input must be a File object"));
      }
  
      if (file.size > MAX_FILE_SIZE) {
        return reject(new Error(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB`));
      }
  
      const reader = new FileReader();
  
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (event) => {
        reject(new Error(`Failed to read file. Error: ${event.target.error?.message || "Unknown error"}`));
      };
  
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        reject(new Error(`Error while starting file read: ${error.message}`));
      }
    });
  };
  
  // Usage example
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const base64String = await convertFileToBase64(file);
      setModelFile(base64String)
      console.log('Base64 String:', base64String);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Prepare the data object to be sent in the request
    const data = {
      model,
      make,  // Ensure the field matches the backend API expected field name
      year,
      pricePerDay,
      // color,
      // mileage,
      // fuelType,
      transmission,
      // engineSize,
      // description,
      imageFile , // Convert image to base64
      modelFile, // Convert model to base64
    };

    // Retrieve token from localStorage or elsewhere
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
            "Content-Type": "application/json", // Sending as JSON
            "Authorization": `Bearer ${token}`, // Include token in Authorization header
          },
          body: JSON.stringify(data), // Send data as JSON
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setMessage("Product added successfully!");
        // Reset form fields after successful submission
        setModel("");
        // setCompany("");
        setYear("");
        setPricePerDay("");
        setMake("")
        // setColor("");
        // setMileage("");
        // setFuelType("");
        setTransmission("");
        // setEngineSize("");
        // setDescription("");
        setImageFile(null);
        // setModelFile(null);
        // setPreviewImage(null);
        console.log(responseData)
      } else {
        const errorData = await response.json();
        setMessage(`Failed to add product: ${errorData.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg text-black">Add Product</h1>
      <div className="bg-white border rounded-md border-black p-7 scroll-smooth">
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="imageFile" className="font-medium cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center border rounded">
                  <span className="text-gray-500">Upload Image</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* 3D Model Upload */}
         
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

          {/* Model */}
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
            <label htmlFor="model" className="font-medium">
              Make
            </label>
            <input
              className="border rounded px-3 py-2"
              type="text"
              id="model"
              placeholder="Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>

          {/* Other Inputs */}
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="company" className="font-medium">
              Company
            </label>
            <input
              className="border rounded px-3 py-2"
              type="text"
              id="company"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div> */}
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
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="color" className="font-medium">
              Color
            </label>
            <input
              className="border rounded px-3 py-2"
              type="text"
              id="color"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="mileage" className="font-medium">
              Mileage
            </label>
            <input
              className="border rounded px-3 py-2"
              type="number"
              id="mileage"
              placeholder="Mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="fuelType" className="font-medium">
              Fuel Type
            </label>
            <input
              className="border rounded px-3 py-2"
              type="text"
              id="fuelType"
              placeholder="Fuel Type"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
          </div> */}
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
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="engineSize" className="font-medium">
              Engine Size
            </label>
            <input
              className="border rounded px-3 py-2"
              type="number"
              id="engineSize"
              placeholder="Engine Size"
              value={engineSize}
              onChange={(e) => setEngineSize(e.target.value)}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              className="border rounded px-3 py-2"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}

          {/* Submit Button */}
          <button
            className="bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50"></span>
                Loading...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
