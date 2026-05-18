import React from "react";

const steps = [
  {
    title: "Requirement Analysis",
    desc: "Understanding client needs and application requirements to deliver precise solutions.",
  },
  {
    title: "Material Engineering",
    desc: "Developing and selecting materials optimized for performance and durability.",
  },
  {
    title: "Formulation & Development",
    desc: "Designing customized chemical formulations tailored to specific industrial applications.",
  },
  {
    title: "Precision Manufacturing",
    desc: "Producing high-quality materials with strict process control and consistency.",
  },
  {
    title: "Quality Testing",
    desc: "Ensuring every product meets industrial standards through rigorous testing.",
  },
  {
    title: "Delivery & Support",
    desc: "Reliable delivery and continuous support to ensure client satisfaction.",
  },
];

const Process = () => {
  return (
    <section id="process" className="bg-[#0F2436] py-24 px-6 text-white">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">How We Work</h2>
        <p className="mt-4 text-gray-400">
          A structured approach ensuring quality, performance, and reliability.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <h3 className="text-xl font-semibold text-blue-400">
              {step.title}
            </h3>
            <p className="mt-3 text-gray-300 text-sm">
              {step.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Process;