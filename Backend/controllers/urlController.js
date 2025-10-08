import Url from "../models/Url.js";
import { nanoid } from "nanoid";

const BASE_URL = process.env.BASE_URL || "http://localhost:3003";


export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ message: "Please provide a URL" });
  }

  try {
   
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json({ shortUrl: url.shortUrl });
    }

  
    const shortCode = nanoid(6); 

   
    const shortUrl = `${BASE_URL}/${shortCode}`;

 
    url = new Url({ longUrl, shortCode, shortUrl });
    await url.save();

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }


    url.clicks += 1;
    await url.save();


    res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getClicks = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ message: "URL not found" });
    res.json({ clicks: url.clicks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const incrementClick = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ message: "URL not found" });
    url.clicks += 1;
    await url.save();
    res.json({ clicks: url.clicks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
