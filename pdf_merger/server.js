const express = require("express");
const path = require("path");
const multer = require("multer");
const { mergepdfs } = require("./merger");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = 3000;

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 12), async (req, res) => {
  console.log(req.files);
  if (req.files.length < 2) {
    return res.status(400).send("Please upload at least two PDF files.");
  }

  let d = await mergepdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );

  res.redirect(`http://pdf-merger-p6fy.onrender.com/static//${d}.pdf`);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
