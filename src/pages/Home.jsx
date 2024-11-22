import React, { useRef } from "react";
import Header from "./Header";
import Cars from "./Cars";
import { FaRegHandshake, FaAward, FaCarSide } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom"; // To detect if it's the home page

const Home = () => {
  const carsSectionRef = useRef(null);
  const location = useLocation(); // Use location to check if we're on the Home page

  const scrollToCars = () => {
    if (carsSectionRef.current) {
      carsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // React Intersection Observer for animations on scroll
  const [refWhyChooseUs, inViewWhyChooseUs] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refCarsSection, inViewCarsSection] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isHomePage = location.pathname === "/"; // Check if we are on the home page

  return (
    <>
      {/* Header Section */}
      <Header>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 animate__animated animate__fadeInDown">
          Welcome to ShowRoom
        </h1>
        <p className="text-lg sm:text-xl mb-6 animate__animated animate__fadeInUp">
          Discover and buy your dream car with ease. Explore our latest
          collection!
        </p>
        <button
          className="rounded-full bg-primary px-6 py-3 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out"
          onClick={scrollToCars}
        >
          Explore Cars
        </button>
      </Header>

      {/* Why Choose Us Section */}
      <section
        ref={refWhyChooseUs}
        className={`py-16 px-6 bg-gray-100 transition-opacity duration-1000 ${
          inViewWhyChooseUs
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-center text-5xl font-extrabold text-primary mb-12">
          Why Choose Us?
        </h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <FaAward className="text-primary text-6xl mb-4" />
            <h4 className="text-xl font-bold mb-2">Trusted by Thousands</h4>
            <p className="text-gray-600">
              Join a community of satisfied customers who trust us for their
              car-buying needs.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <FaRegHandshake className="text-primary text-6xl mb-4" />
            <h4 className="text-xl font-bold mb-2">Seamless Transactions</h4>
            <p className="text-gray-600">
              Experience hassle-free processes from start to finish.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <FaCarSide className="text-primary text-6xl mb-4" />
            <h4 className="text-xl font-bold mb-2">Diverse Selection</h4>
            <p className="text-gray-600">
              Explore a wide variety of cars tailored to your needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section
        ref={(el) => {
          carsSectionRef.current = el;
          refCarsSection(el);
        }}
        className={`py-16 px-4 sm:px-8 bg-white transition-opacity duration-1000 ${
          inViewCarsSection
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-center text-6xl text-primary font-extrabold mb-8">
          Our Featured Cars
        </h3>
        <Cars />

        {/* Show All Cars Button */}
        <div className="text-center mt-12">
          <button className="rounded-full bg-primary px-6 py-3 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out">
            Show All Cars
          </button>
        </div>
      </section>

      {/* New Section: Online, In-Person, Everywhere */}
      <section className="flex items-center justify-between py-16 px-6 bg-gray-50">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 pr-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Online, In-person, Everywhere
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Experience the convenience of buying your car from anywhere,
            anytime. Whether online or in-person, our platform makes it easy to
            find your perfect car.
          </p>
          <button className="rounded-full bg-primary px-6 py-3 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out">
            Get Started
          </button>
        </div>

        {/* Right Side: Car Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="/carImages/pexels-mikebirdy-120049.jpg"
            alt="Car"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
