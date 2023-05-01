import express from "express";

import * as path from "path";

import { adminRoute } from "./routes/adminRoute";
import { userRoute } from "./routes/adminRoute";

const app = express();
const port = 8000;

app.use('/', express.static(path.join(__dirname, "../frontend")));

function logUrl(req: express.Request, res: express.Response, next: () => void) {
    console.log(new Date().toUTCString(), req.originalUrl);
    next();
}

app.use(logUrl);
app.use('/', userRoute)
app.use("/admin", adminRoute)

app.listen(port, ()=>{
    console.log(`Server listening at port http://localhost:${port}`)
});