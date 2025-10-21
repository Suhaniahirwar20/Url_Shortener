import React, { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert("Please enter a URL");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/create", { url });
      setShortUrl(res.data.shortUrl);
      setUrl("");
    } catch (err) {
      alert(err.response?.data?.message || "Error Shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition duration-200"
      >
        {loading ? "Processing..." : "Shorten URL"}
      </button>

      {shortUrl && (
        <p className="text-center mt-4 text-green-700">
          ✅ Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </form>
  );
};

export default UrlForm;
