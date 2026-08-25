const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    dest: "uploads/"
});

app.get("/", (req, res) => {
    res.status(200).json({
        status: "online",
        message: "AI Clipper Backend aktif!"
    });
});

app.post("/analyze", upload.single("video"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: "Video belum dikirim."
        });
    }

    console.log("Video diterima:", req.file.originalname);

    res.status(200).json({
        success: true,
        message: "Video berhasil diterima oleh backend.",
        filename: req.file.filename,
        originalName: req.file.originalname
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Clipper Backend berjalan di port ${PORT}`);
});
