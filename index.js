import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// البيانات المحلية
let cities = [
  {
    id: "73930385",
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: { lat: 38.727881642324164, lng: -9.140900099907554 },
  },
  {
    id: "9562",
    cityName: "Banha",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2025-10-15T10:59:37.793Z",
    notes: "",
    position: { lat: 30.462879341709886, lng: 31.195678710937504 },
  },
  {
    id: "59de",
    cityName: "Giza",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2025-10-16T08:44:08.136Z",
    notes: "",
    position: { lat: 29.7453016622136, lng: 31.596679687500004 },
  },
  {
    id: "fa31",
    cityName: "Banha",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2025-10-16T08:44:54.546Z",
    notes: "hhh",
    position: { lat: 30.460511875130663, lng: 31.19979858398438 },
  },
];

// GET: رجّع كل المدن
app.get("/cities", (req, res) => {
  res.json(cities);
});

// POST: أضف مدينة جديدة
app.post("/cities", (req, res) => {
  const newCity = req.body;
  newCity.id = Date.now().toString();
  cities.push(newCity);
  res.status(201).json(newCity);
});

// PUT: تعديل مدينة
app.put("/cities/:id", (req, res) => {
  const { id } = req.params;
  const index = cities.findIndex((city) => city.id === id);
  if (index !== -1) {
    cities[index] = { ...cities[index], ...req.body };
    res.json(cities[index]);
  } else {
    res.status(404).json({ message: "City not found" });
  }
});

// DELETE: حذف مدينة
app.delete("/cities/:id", (req, res) => {
  const { id } = req.params;
  cities = cities.filter((city) => city.id !== id);
  res.status(204).send();
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
