import React, { createContext, useEffect, useState } from "react";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [cars, setCars] = useState([]);
  const url = "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getWhere";

  useEffect(() => {
    async function getCars() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching cars: ${response.statusText}`);
        }

        const carData = await response.json(); // Parse the JSON response
        const availableCars = carData.filter((car) => car.isAvailable === true); // Filter cars that are available

        const carsWithImagesAndModels = await Promise.all(
          availableCars.map(async (car) => {
            const imageUrls = await fetchCarImages(car.images);
            const model3D = await fetchCarModel(car.model3D);
            return { ...car, imageUrls, model3D };
          })
        );

        setCars(carsWithImagesAndModels);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    }

    getCars();
  }, []);

  const fetchCarImages = async (imageIds) => {
    try {
      const imagePromises = imageIds.map(async (id) => {
        const response = await fetch(`https://show-room-server-979c93442bc5.herokuapp.com/api/file/getById/${id}`, {
          method: "GET",
          headers: { accept: "application/octet-stream" },
        });

        if (!response.ok) {
          throw new Error(`Error fetching image for ID: ${id}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer]);
        return URL.createObjectURL(blob);
      });

      return await Promise.all(imagePromises);
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const fetchCarModel = async (modelId) => {
    const url = `https://show-room-server-979c93442bc5.herokuapp.com/api/file/getById/${modelId}`;
    
    try {
      // Fetch the model data as binary (octet-stream)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream' // Expecting binary data
        }
      });
  
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error(`Error fetching model for ID: ${modelId}`);
      }
  
      // Read the response as binary data (arrayBuffer)
      const fileData = await response.arrayBuffer();
  
      // Example: Log the size of the file data
      console.log('File data size:', fileData.byteLength, 'bytes');
      
      // Now you have the file data stored in 'fileData' as an ArrayBuffer
      // You can process or display the data as needed, such as saving it or converting it to an image or a model.
      
      // Create a Blob from the ArrayBuffer (assuming it's a file you want to render/download)
      const blob = new Blob([fileData], { type: 'application/octet-stream' });
      
      // Create a URL for the Blob (useful for displaying or downloading the file)
      return URL.createObjectURL(blob);
  
    } catch (error) {
      console.error('Error fetching model:', error);
      return null;
    }
  };
  const value = { cars };
  return <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>;
};

export default AppContextProvider;
