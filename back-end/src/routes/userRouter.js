const { Router } = require("express");
const { create, getAll, getById } = require("../controllers/user").default;
const { validateToken } = require("../middlewares/tokenValidation");

export const userRouter = Router();

userRouter.post("/", create);
userRouter.get("/", validateToken, getAll);
userRouter.get("/:id", validateToken, getById);
