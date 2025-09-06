import { BoxIcon, ChartLine, Rocket, UserPlus } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up & Customize",
      description:
        "Create your store in minutes with easy setup and flexible branding.",
      icon: <UserPlus className="text-indigo-600 w-10 h-10" />,
    },
    {
      id: 2,
      title: "Add Products & Services",
      description:
        "Upload inventory, set prices, and showcase your offerings effortlessly.",
      icon: <BoxIcon className="text-green-600 w-10 h-10" />,
    },
    {
      id: 3,
      title: "Launch & Sell",
      description: "Go live and start accepting secure payments instantly.",
      icon: <Rocket className="text-pink-600 w-10 h-10" />,
    },
    {
      id: 4,
      title: "Manage & Grow",
      description:
        "Track sales, analyze performance, and scale with powerful tools.",
      icon: <ChartLine className="text-orange-600 w-10 h-10" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Get started in just a few simple steps. From setup to growth, MTEC
          makes the process effortless.
        </p>

        {/* Timeline container */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center lg:w-1/4"
            >
              {/* Icon */}
              <div className="flex z-10 items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-4">
                {step.icon}
              </div>

              {/* Number circle */}
              <span className="absolute z-20 -top-4 left-1/2 transform -translate-x-1/2 text-sm font-bold text-white bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                {step.id}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{step.description}</p>

              {/* Connecting line for desktop */}
              {step.id !== steps.length && (
                <div className="hidden lg:block absolute top-10 right-[-50%] w-full border-t-2 border-dashed border-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
