import { Router } from "express";

import { generateShortURL, totalClicks, originalUrl } from "../controllers/url.js"



export const generateShortURLRoute = Router().post('/', generateShortURL)
export const originalUrlRoute = Router().get('/:shortId', originalUrl)
export const totalClicksRoute = Router().get('/totalClicks/:shortId', totalClicks) 
