require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const AuthRoutes = require("./Routes/AuthRoutes");
const SavedRoutes = require("./Routes/SavedRoutes");

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cors());

const apiKey = process.env.SPOONACULAR_API_KEY;

app.use("/auth",AuthRoutes);
app.use("/recipes", SavedRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello Bee" });
});



app.get("/show", async (req, res) => {
    try {
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
            params: {
                number: 3,
                apiKey
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: "No query provided" });
        }

        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
            params: {
                query,
                number: 3,
                apiKey
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/show/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "No id provided" });
        }

        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information`,
            {
              params: { apiKey },
            }
          );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
