import * as express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "this is eve-linebot." });
});
app.listen(process.env.PORT || 3000);

module.exports = app;
