import { createContext } from "react";
import {cars} from "../assets/assests";
export const Appcontext = createContext();
const AppContextProvider = (prop) => {
  const value = {
    cars,
  };
  return (
    <Appcontext.Provider value={value}>{prop.children}</Appcontext.Provider>
  );
};
export default AppContextProvider;