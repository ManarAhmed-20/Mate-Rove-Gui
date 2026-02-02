const express = require("express");
const rosnodejs = require("rosnodejs");

const router = express.Router();
let nh;

//node start1
rosnodejs.initNode("/gui_stream_node").then((_nh) => {
  nh = _nh;
  console.log("ROS Stream Node connected ✅");
});

// Rout
router.get("/stream/:cameraId", (req, res) => {
  const cameraId = req.params.cameraId;
  const topic = `/camera${cameraId}/image_raw`;

  res.writeHead(200, {
    "Content-Type": "multipart/x-mixed-replace; boundary=frame",
    "Cache-Control": "no-cache",
    "Connection": "close",
  });

  const sub = nh.subscribe(topic, "sensor_msgs/Image", (msg) => {
    const buffer = Buffer.from(msg.data);

    res.write("--frame\r\n");
    res.write("Content-Type: image/jpeg\r\n\r\n");
    res.write(buffer);
    res.write("\r\n");
  });

  req.on("close", () => {
    sub.shutdown();
  });
});

module.exports = router;