import dbConnect from "../../lib/dbConnect.js";
import ContentSchema from "../../models/content.js";
import Cron from "cron";

export default async function CreateContent (req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ message: "POST request required for /api/fetchcontent" });
        return;
    }
    var query = req.body;
    if (!query.content) {
        res.status(400).json({ message: "cannot find value content" });
        return;
    }
    if (!query.name) {
        res.status(400).json({ message: "cannot find value name" });
        return;
    }
    if (!query.type) {
        res.status(400).json({ message: "cannot find value type" });
        return;
    }
    await dbConnect();
    var data = await ContentSchema.findOne({
        content: query.content,
        type: query.type,
        name: query.name
    });
    var doTimeout = false;
    if (!data) {
        data = await ContentSchema.create({
            content: query.content,
            type: query.type,
            name: query.name
        });
        doTimeout = true;
    }
    if (doTimeout) {
        setTimeout(async ()=>{
            await ContentSchema.deleteOne({
                content: query.content,
                type: query.type,
                name: query.name
            });
        }, 1000*60*60*24);
        res.status(200).json(JSON.stringify(data));
    } else {
        res.status(200).json(JSON.stringify(data));
    }
}