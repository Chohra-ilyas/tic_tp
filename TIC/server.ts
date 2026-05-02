import express from "express";
import cors from "cors";
import {AppDataSource} from "./db.js";
import examRoutes from "./routes/examRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import teacherRoutes from "./routes/teacherRoute.js";
import saleRoutes from "./routes/saleRoute.js";
import departmentRoutes from "./routes/departmentRoute.js";
import moduleRoutes from "./routes/moduleRoute.js";
import alertRoutes from "./routes/alertRoute.js";
import analysisRouter from "./routes/analysisRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/exams", examRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/sales", saleRoutes);
app.use("/departments", departmentRoutes);
app.use("/modules", moduleRoutes);
app.use("/alerts", alertRoutes);
app.use("/analysis", analysisRouter);

// Replace your previous debug log with this:
console.log("Checking routers...");
app._router ? console.log("Router stack found") : console.log("Router stack NOT found yet");

// This will print the actual paths to your terminal
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

AppDataSource.initialize()
    .then(() => {
        console.log("TypeORM connected to PostgreSQL ✅");

        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => {
        console.error("DB connection error ❌", err);
    });
