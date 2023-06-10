import express, { Router, Request, Response } from 'express';
const {createUser} = require('../passport/helper')
const passport = require("passport");
require("../passport/index")(passport);

const router: Router = express.Router();

// Get all participants
router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  async(req:any, res, next) => {
    try{
    const user = await createUser(req.user?.email, req.user?.password, req.body.name);
    res.json({
      user: user,
    });
  }
  
  catch(err:any){
    console.log(err)
    res.status(400).json({ error: err.message });
  }
}
);

router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),
  (req:any, res, next) => {
    res.json({ user: req.user });
  }
);
export { router as authrouter };
