import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/message", (req, res) => {
  const { text } = req.body;
  return res.json({
    message: `Client typed "${text}". This is the server's default response.`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
