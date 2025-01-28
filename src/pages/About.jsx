import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 sm:px-12 mt-20">
      {/* Added mt-20 to create space below the fixed navbar */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">
          About ShowRoom
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          ShowRoom is your trusted platform for discovering and purchasing the
          best cars. We bring together cutting-edge technology and a passion for
          innovation to ensure you find your dream vehicle with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
        {/* Mission Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To redefine the car buying experience by offering a seamless,
            reliable, and transparent platform that connects buyers and sellers
            globally.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To be the leading car marketplace, driven by customer satisfaction
            and the highest standards of quality and innovation.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
            <li>Transparency</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Team
          </h2>
          <p className="text-gray-600">
            A dedicated team of car enthusiasts and tech experts committed to
            creating a seamless experience for our users.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
