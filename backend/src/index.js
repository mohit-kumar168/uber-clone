import { app } from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error connection to the database: ", error);
            throw error;
        });
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed: ", error);
    });

app.get("/", (req, res) => {
    res.send("Hello World!");
});
