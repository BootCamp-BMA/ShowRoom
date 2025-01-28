import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 sm:px-12 mt-20">
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary text-center mb-6">
          Get in Touch
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl text-center mb-8">
          Have questions or need assistance? We're here to help! Fill out the
          form below, and our team will get back to you shortly.
        </p>

        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 text-lg font-semibold rounded-full hover:bg-primary-dark transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Additional Contact Information */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Contact Information
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> support@revora.com
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> +(213) 556606665
        </p>
      </div>
    </section>
  );
};

export default Contact;
