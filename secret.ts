// require("dotenv").config({ path: ".env" });

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const gitHubclientId = process.env.GITHUB_CLIENT_ID || "";
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET || "";


export {
    serverUrl,
    googleClientId,
    googleClientSecret,
    gitHubclientId,
    gitHubClientSecret,
}