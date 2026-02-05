import { Router } from "express";
import * as RegisterController from "../controllers/RegisterController.js";
// middlewares フォルダの validator.js をインポート
import { validate, registerValidationRules } from "../middlewares/validator.js";

// Auth Router
const router = Router();

// ミドルウェア: なし
router.get("/", RegisterController.index);
router.post("/", registerValidationRules, validate, RegisterController.add);

export default router;