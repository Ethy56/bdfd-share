import dbConnect from "../../lib/dbConnect.js";
import ContentSchema from "../../models/content.js";

export default async function GetContent (req, res) {
    if (req.method !== "GET") {
        res.status(400).json({ message: "GET request required for /api/fetchcontent" });
        return;
    }
    var { query } = req;
    if (!query.id) {
        res.status(400).json({type: "Error", name: "Unknown identifier", content: "cannot find one with id " + query.id, query });
        return;
    }
    await dbConnect();
    var data = await ContentSchema.findOne({
        _id: query.id
    });
    if (!data) {
        res.status(200).json({type: "Error", name: "Unknown identifier", content: "cannot find one with id " + query.id });
        return;
    }
    res.status(200).json(data);
}