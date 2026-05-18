import React from "react";
import { motion } from "framer-motion";

const Contact = () => {

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <div className="bg-[#0B1C2C] text-white min-h-screen">

      {/* TOP INTRO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 pt-24"
      >

        <p className="text-blue-400 text-sm uppercase tracking-wider">
          Contact Us
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Let’s Build Reliable Industrial Solutions Together
        </h1>

        <p className="mt-6 text-gray-400 max-w-4xl leading-relaxed">
          Whether you are looking for investment casting waxes,
          releasing agents, adhesives, or custom coating solutions,
          our team is ready to assist you with reliable industrial
          materials tailored to your manufacturing requirements.
          We believe in building long-term relationships through
          quality products, technical support, and consistent service.
        </p>

      </motion.section>

      {/* MAIN SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12"
      >

        {/* LEFT — FORM */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-md"
        >

          <h2 className="text-2xl font-semibold">
            Send an Inquiry
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Fill out the form and our team will get back to you shortly.
          </p>

          <form className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white/5 transition duration-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white/5 transition duration-300"
            />

            <input
              type="text"
              placeholder="Company Name"
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white/5 transition duration-300"
            />

            <textarea
              rows="5"
              placeholder="Tell us about your requirements..."
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white/5 transition duration-300 resize-none"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300"
            >
              Submit Inquiry
            </button>

          </form>

        </motion.div>

        {/* RIGHT — MAP + INFO */}
        <div className="space-y-6">

          {/* MAP */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
          >

            <iframe
              title="map"
              src="https://www.google.com/maps?q=Nashik,Maharashtra&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              className="grayscale"
            ></iframe>

          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-md"
          >

            <h3 className="text-xl font-semibold text-blue-400">
              Contact Information
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Email
                </p>

                <p className="mt-1 text-gray-300">
                  info@chemtechspecialty.com
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Phone
                </p>

                <p className="mt-1 text-gray-300">
                  +91 86687 58151
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Address
                </p>

                <p className="mt-1 text-gray-300 leading-relaxed">
                  Nashik, Maharashtra, India
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </motion.section>

    </div>
  );
};

export default Contact;