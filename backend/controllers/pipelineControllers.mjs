import multer from "multer";
import path from "path";

// Set storage engine for multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/Conference Papers"); // Destination folder for file uploads
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
	},
});

// Multer filter to accept only .xls files
const fileFilter = (req, file, cb) => {
	const fileTypes = /xls|xlsx/;
	const extname = fileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype =
		file.mimetype === "application/vnd.ms-excel" ||
		file.mimetype ===
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // Include MIME type for .xlsx

	if (mimetype && extname) {
		cb(null, true);
	} else {
		cb(new Error("Only .xls files are allowed!"), false);
	}
};

// Initialize multer with storage and file filter
const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 2MB
	fileFilter: fileFilter,
}).single("file"); // Handle single file upload

// Controller function for file upload
export const uploadFile = (req, res) => {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res
				.status(500)
				.json({ message: `Multer error: ${err.message}` });
		} else if (err) {
			return res.status(400).json({ message: `Error: ${err.message}` });
		}

		// Check if file is uploaded
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		res.status(200).json({
			message: "File uploaded successfully",
			file: req.file,
		});
	});
};
