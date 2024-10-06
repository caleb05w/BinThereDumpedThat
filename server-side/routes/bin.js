const express = require("express");
const crypto = require("crypto");
const Bin = require("../models/bin");
const router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const accessKey = process.env.ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to create a new bin
router.post("/createBin", async (req, res) => {
  const { location, binStatus, binType } = req.body;

  try {
    const bin = await Bin.create({ location, binStatus, binType });

    res.status(201).json({
      _id: bin._id,
      locations: bin.location,
      binStatus: bin.binStatus,
      binType: bin.binType,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

router.get("/allBins", async (req, res) => {
  try {
    const bins = await Bin.find();

    const updatedBins = bins.map((bin) => {
      let updatedBinType;
      switch (bin.binType) {
        case 1:
          updatedBinType = "recycling";
          break;
        case 2:
          updatedBinType = "compost";
          break;
        case 3:
          updatedBinType = "regular garbage";
          break;
        default:
          updatedBinType = bin.binType;
      }

      return {
        ...bin._doc,
        binType: updatedBinType,
      };
    });

    res.status(200).json(updatedBins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

router.post("/post", upload.single("image"), async (req, res) => {
  console.log("req.file", req.file.buffer);
  req.file.buffer;

  const hash = crypto
    .createHash("sha256")
    .update(req.file.originalname + Date.now())
    .digest("hex");

  const params = {
    Bucket: bucketName,
    Key: hash,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
});

module.exports = router;
