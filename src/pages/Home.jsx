import React, { useRef } from "react";
import Header from "./Header";
import Cars from "./Cars";

const Home = () => {
  const carsSectionRef = useRef(null);

  // Scroll to the Cars section when the button is clicked
  const scrollToCars = () => {
    if (carsSectionRef.current) {
      carsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Pass content as children to Header */}
      <Header>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to ShowRoom
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Discover and buy your dream car with ease. Explore our latest
          collection!
        </p>
        <button
          className="bg-primary text-white px-8 py-3 text-lg font-semibold rounded-full hover:bg-primary-dark transition duration-300"
          onClick={scrollToCars}
        >
          Explore Cars
        </button>
      </Header>

      {/* Featured Cars Section */}
      <section ref={carsSectionRef} className="py-12 px-4 sm:px-8 bg-white">
        <h3 className="text-center text-6xl text-primary font-extrabold">
          Our Featured Cars
        </h3>
        <Cars />

        {/* Show All Cars Button */}
        <div className="text-center mt-8">
          <button className="bg-primary text-white px-8 py-3 text-lg font-semibold rounded-full hover:bg-primary-dark transition duration-300">
            Show All Cars
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
