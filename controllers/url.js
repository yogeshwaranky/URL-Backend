import { nanoid } from "nanoid";
import URL from "models/url.js";

export const generateShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(400).send({ error: "Url is required" })
    }
    const shortID = nanoid(5);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID })
    }

export const totalClicks = async(req, res) => {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    }
    catch (err) {
        console.log("Error occures", err);
    }
};

export const originalUrl = async(req,res)=>{
const shortId = req.params.shortId;
try{
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectUrl);
}
catch(err){
    connsole.log("Error Ocurred",err)
}
};
