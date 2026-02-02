
const express = require("express");
const rosnodejs = require("rosnodejs");

const router = express.Router();
let nh;


rosnodejs.initNode("/gui_node").then((_nh) => {
  nh = _nh;
  console.log("ROS Node connected ");
});

//   topic
async function captureImage(topic) {
  return new Promise((resolve, reject) => {
    const sub = nh.subscribe(topic, "sensor_msgs/Image", (msg) => {
      const buffer = Buffer.from(msg.data);
      const base64Image = buffer.toString("base64");

      sub.shutdown(); //subscribe 1  stop
      resolve(base64Image);
    });

    setTimeout(() => reject("Timeout: No image received"), 3000);
  });
}

// API Endpoint
router.get("/capture/:cameraId", async (req, res) => {
  const cameraId = req.params.cameraId; //  camera num
  const topic = `/camera${cameraId}/image_raw`;

  try {
    const imageBase64 = await captureImage(topic);
    res.json({ image: imageBase64 });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;