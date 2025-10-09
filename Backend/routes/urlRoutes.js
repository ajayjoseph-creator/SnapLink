import express from "express";
import { shortenUrl, redirectUrl, getClicks, incrementClick } from "../controllers/urlController.js";

const router = express.Router();


router.post("/shorten", shortenUrl);

router.get("/api/clicks/:shortCode", getClicks);

router.post("/api/click/:shortCode", incrementClick);


router.get("/:shortCode", redirectUrl); 

export default router;
