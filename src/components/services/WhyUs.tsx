import { Boxes, Globe, Headset, Lock, Store } from "lucide-react";
import background from "../../assets/bluegradient.png";

const KeyFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Customizable Storefronts",
      description:
        "Design your store your way with flexible themes, branding, and layouts.",
      icon: <Store className="w-10 h-10 text-white" />,
    },
    {
      id: 2,
      title: "Secure Payments",
      description:
        "Accept naira and global currencies with reliable, secure transactions.",
      icon: <Lock className="w-10 h-10 text-white" />,
    },
    {
      id: 3,
      title: "Inventory & Order Management",
      description:
        "Stay on top of stock, track orders, and manage operations effortlessly.",
      icon: <Boxes className="w-10 h-10 text-white" />,
    },
    // {
    //   id: 4,
    //   title: "Multi-channel Selling",
    //   description:
    //     "Sell online, on social media, and sync with offline sales seamlessly.",
    //   icon: <Globe className="w-10 h-10 text-white" />,
    // },
    {
      id: 5,
      title: "24/7 Customer Support",
      description:
        "We’re here to help anytime, ensuring your business never misses a beat.",
      icon: <Headset className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white"
    >
      <div className=" mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose MTEC</h2>
        <p className="text-lg mb-12 text-gray-100 max-w-3xl mx-auto">
          Everything you need to launch, grow, and scale your business — all in
          one platform.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white bg-opacity-10 rounded-2xl shadow-lg p-8 hover:scale-105 transform transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-white bg-opacity-20 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-200 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
