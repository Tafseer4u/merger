const path = require("path");

const mergepdfs = async (pdf1, pdf2) => {
  const { default: PDFMerger } = await import("pdf-merger-js"); // Dynamically import pdf-merger-js
  const merger = new PDFMerger();

  await merger.add(pdf1);
  await merger.add(pdf2);
  let d = new Date().getTime();
  await merger.save(`/public/${d}.pdf`)
    return d;
};

module.exports = { mergepdfs };
