import mongoose from "mongoose";

var schema = new mongoose.Schema({
    content: { type: String, req: true },
    type: { type: String, req: true },
    name: { type: String, req: true }
});
var ContentSchema = mongoose.models.ContentSchema || mongoose.model("ContentSchema", schema);

export default ContentSchema;