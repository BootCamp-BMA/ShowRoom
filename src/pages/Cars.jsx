import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";

const Cars = () => {
  const { cars } = useContext(Appcontext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-auto gap-10 mt-10">
        {cars.map((e) => (
          <div
            key={e.id} // Ensures each item has a unique key
            className="cursor-pointer rounded-2xl border-primary border-solid border p-4"
            onClick={() => navigate(`/Cars/${e.id}`)}
          >
            <img className="w-full" src={e.image} alt="Car" />
            <h1>{e.name}</h1>
            <p>{e.model}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
