import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMs: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false,
};

const MONGO_USERNAME = process.env.DB_USER || "";
const MONGO_PASSWORD = process.env.DB_PW || "";
const MONGO_CONNECT_STRING = process.env.DB_CONNECTION_STRING || "";

const MONGO = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: MONGO_CONNECT_STRING,
};

const config = {
    mongo: MONGO,
};

export default config;
