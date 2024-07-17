import Router from "express-promise-router";
import Controller from "../controllers/expense.controller.js";
import continuator from "../lib/continue.decorator.js";
import passport from "passport";
import "../lib/passport.config.js";

const expenseRouter = () => {
  //Creo una instancia del enrutador express-promise-router llamado router
  const router = Router();
  const controller = Controller();

  router.get(
    "/expense",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.getAll)
  );
  router.get(
    "/expense/:id",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.getById)
  );
  router.get(
    "/expense/group/:id",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.getByGroup)
  );
  router.get(
    "/expense/group/:id/user",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.getByGroupAndUser)
  );
  router.post(
    "/expense",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.create)
  );
  router.delete(
    "/expense/:id",
    passport.authenticate("jwt", { session: false }),
    continuator(controller.deleteById)
  );

  return router;
};

export default expenseRouter;
