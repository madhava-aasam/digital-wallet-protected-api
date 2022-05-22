import dotenv from 'dotenv';

dotenv.config();

const MONGO_CLUSTER = process.env.CLUSTER || 'walletcluster';
const MONGO_DATABASE = process.env.DATABASE || 'digitalwalletdb';
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'walletuser';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'bXhOS35rySQEb0mn';

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3090;

const MONGO = {
    connectionString: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.ipfq0.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

const OPEN_API = {
    url: 'http://localhost:3080/api'
}

const AUTH = {
    jwtTokenSecret: process.env.TOKEN_SECRET || 'sngpR0pep82jGRU76T926LFSYheQ9olh'
}

const config = {
    mongo: MONGO,
    server: SERVER,
    openApi: OPEN_API,
    auth: AUTH
};

export default config;
