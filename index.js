//require -נקרא commonJS modules\
//import es6 modules

import express from "express";
import jewelleryRouter from "./routes/jewellery.js"
import orderRouter from "./routes/orders.js"
import userRouter from "./routes/user.js"
import { connectToDB } from "./db/connectToDb.js"
import { config } from "dotenv";
import cors from "cors";
import { errorHandling } from "./middlwares/errorHandling.js";


const app = express();


app.use(cors())
app.use(express.json());

connectToDB();
config();



app.use("/api/user", userRouter);
app.use("/api/jewellery", jewelleryRouter);
app.use("/api/order", orderRouter);

app.use(errorHandling)

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
 