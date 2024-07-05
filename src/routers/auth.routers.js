import Router from "express-promise-router";
import ControllerAuth from "../controllers/auth.controller.js";
import continuator from "../lib/continue.decorator.js";

const AuthRouter = () => {
  //Creo una instancia del enrutador express-promise-router llamado router
  const router = Router();
  const controllerAuth = ControllerAuth();

  router.post("/auth/login", continuator(controllerAuth.login));

  return router;
};

export default AuthRouter;
