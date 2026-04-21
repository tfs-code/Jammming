const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

app.post("/api/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res
            .status(400)
            .json({ error: "Authorization code is required" });
    }

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "ngrok-skip-browser-warning": "true",
            },
            body: new URLSearchParams({
                client_id: clientID,
                client_secret: clientSecret,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectURI,
            }).toString(),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error("Error exchanging code for token:", error);
        res.status(500).json({
            error: "Failed to exchange authorization code",
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:`);
});
