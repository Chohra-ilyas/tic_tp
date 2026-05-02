// src/controller/analysisController.ts
import {Request, Response} from "express";
import {computeSwot} from "../services/analysisService.js";

export const getSwotAnalysis = (req: Request, res: Response) => {
    try {
        const {text} = req.body;

        if (!text || typeof text !== "string") {
            return res
                .status(400)
                .json({error: "A valid text description is required for analysis."});
        }

        const result = computeSwot(text);
        return res.status(200).json(result);
    } catch (error: any) {
        console.error("Analysis Failure:", error);
        return res.status(500).json({
            error: "Internal Analysis Error",
            details: error.message,
        });
    }
};
