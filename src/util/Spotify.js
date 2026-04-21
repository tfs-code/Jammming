let accessToken = "";
const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessCode = window.location.href.match(/code=([^&]*)/);
        if (urlAccessCode) {
            const authorizationCode = urlAccessCode[1];
            window.history.pushState("Access Token", null, "/");
            // Exchange authorization code for access token via backend
            return fetch("http://localhost:3001/api/token", {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                method: "POST",
                body: JSON.stringify({ code: authorizationCode }),
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    if (jsonResponse.error) {
                        throw new Error(jsonResponse.error);
                    }
                    accessToken = jsonResponse.access_token;
                    const expiresIn = Number(jsonResponse.expires_in);
                    window.setTimeout(
                        () => (accessToken = ""),
                        expiresIn * 1000,
                    );
                    return accessToken;
                });
        } else {
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = redirect;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": "true",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map((tracks) => ({
                    id: tracks.id,
                    name: tracks.name,
                    artist: tracks.artists[0].name,
                    album: tracks.album.name,
                    uri: tracks.uri,
                }));
            });
    },
};

export { Spotify };
