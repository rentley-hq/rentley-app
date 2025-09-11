import React from "react";

const ComingSoonCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="bg-gray-100 border border-dashed border-gray-400 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">Coming soon…</p>
    </div>
  );
};

export default ComingSoonCard;
