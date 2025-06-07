const express = require("express");
const { register, login, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", protect, getUserProfile);

module.exports = router;
