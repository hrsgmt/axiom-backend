import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("Axiom backend running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
