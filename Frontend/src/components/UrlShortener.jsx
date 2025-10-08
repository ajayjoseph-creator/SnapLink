import React, { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [clicks, setClicks] = useState(0); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return setError("Please enter a URL");
    setError("");
    setClicks(0); 

    try {
      const res = await axios.post("https://snaplink-xp0q.onrender.com/api/shorten", { longUrl });
      setShortUrl(res.data.shortUrl);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      setError("Error shortening URL");
    }
  };

  const handleClick = async (shortUrl) => {
    const shortCode = shortUrl.split("/").pop();
    try {
      const res = await axios.get(`https://snaplink-xp0q.onrender.com/api/clicks/${shortCode}`);
      setClicks(res.data.clicks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100 flex flex-col lg:flex-row items-center justify-center gap-10 p-6">
      
    
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full sm:max-w-md text-center border border-green-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-2">Welcome to SnapLink!</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Create short, memorable links in seconds.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-600">Shorten Your URL</h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL"
            className="flex-1 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition font-semibold w-full sm:w-auto"
          >
            Shorten
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        {shortUrl && (
          <div className="mt-6 break-all">
            <p className="font-semibold text-gray-700 mb-1">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
              onClick={() => handleClick(shortUrl)}
            >
              {shortUrl}
            </a>
            {clicks > 0 && <p className="mt-2 text-sm text-gray-500">Clicks: {clicks}</p>}
          </div>
        )}
      </div>

     
      
    </div>
  );
};

export default UrlShortener;
