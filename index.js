var express = require("express");
var cors = require("cors");
var multer = require("multer"); // Import multer
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Serve HTML form
app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Multer setup to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// API endpoint to handle file uploads
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
	if (!req.file) {
		return res.json({ error: "No file uploaded" });
	}

	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
