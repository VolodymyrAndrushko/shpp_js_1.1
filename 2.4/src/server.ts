import express from 'express';
import cors from "cors"


const bodyParser = require("body-parser");
const app = express();

const port = process.env.port || 3005;

const items = require('./routers/router_v1')

app.use(express.static("static"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", items);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

