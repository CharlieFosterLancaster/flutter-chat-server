// path: /api/login

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, refreshToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validateFields,
  ],
  login
);

router.get("/refresh", validateJWT, refreshToken);

module.exports = router;
