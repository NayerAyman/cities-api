import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "data/cities.json";

// ✅ Get all cities
app.get("/api/cities", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// ✅ Add city
app.post("/api/cities", (req, res) => {
  const cities = JSON.parse(fs.readFileSync(DATA_FILE));
  const newCity = { id: Date.now().toString(), ...req.body };
  cities.push(newCity);
  fs.writeFileSync(DATA_FILE, JSON.stringify(cities, null, 2));
  res.status(201).json(newCity);
});

// ✅ Update city
app.put("/api/cities/:id", (req, res) => {
  const cities = JSON.parse(fs.readFileSync(DATA_FILE));
  const id = req.params.id;
  const index = cities.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ error: "City not found" });

  cities[index] = { ...cities[index], ...req.body };
  fs.writeFileSync(DATA_FILE, JSON.stringify(cities, null, 2));
  res.json(cities[index]);
});

// ✅ Delete city
app.delete("/api/cities/:id", (req, res) => {
  const cities = JSON.parse(fs.readFileSync(DATA_FILE));
  const filtered = cities.filter((c) => c.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
  res.json({ success: true });
});

// ✅ Export for Vercel
export default app;
