import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg w-full max-w-md rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          🔗 URL Shortener
        </h1>
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
