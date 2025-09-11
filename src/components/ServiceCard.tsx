import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  cta?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, cta }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <div>
        {price && <p className="text-lg font-bold mb-2">{price}</p>}
        {cta && (
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
