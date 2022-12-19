import express from 'express'
import path from 'path'
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import moment from "moment-timezone";
import router from './router/api'

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router)
const accessLogStream1D = createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

morgan.token("date", (req, res, tz: any) => {
  return moment().tz(tz).format();
});

morgan.token("request", (req: any, res) => {
  return JSON.stringify(req.body)
})

morgan.format(
  "myformat",
  '[:date[Asia/Seoul]] ":method :url" :status :req[body] :request :res[content-length] - :response-time ms '
);

app.use(morgan("myformat", { stream: accessLogStream1D }));


app.listen(port, () => {
  console.log("App is started...")
})

