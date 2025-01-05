const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-r my-10 from-pink-100 via-white to-pink-100 py-16 px-6 md:px-20 text-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-pink-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 text-lg">
          Discover what sets us apart and why we are the perfect choice for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 transition transform duration-300">
          <div className="mb-4">
            <div className="bg-pink-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Fast and Reliable
          </h3>
          <p className="text-gray-600">
            Our platform ensures quick and dependable services for your needs.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 transition transform duration-300">
          <div className="mb-4">
            <div className="bg-pink-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Trusted by Many
          </h3>
          <p className="text-gray-600">
            Join thousands of satisfied users who trust our services.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 transition transform duration-300">
          <div className="mb-4">
            <div className="bg-pink-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            24/7 Support
          </h3>
          <p className="text-gray-600">
            We are always available to assist you whenever you need us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
