import express, {NextFunction, Request, Response} from "express";
import {AuthController} from "../controllers/auth.controller";
import {body, validationResult} from "express-validator";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {validationMessage} from "../handlers/http/validationMessage";

const authRouter = express.Router();

/*
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error("confirm password does not match");
      }
      return true;
    }),
  ],
 */

/* POST users/login - login user */
authRouter.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Provide a valid email address'),
    body('password')
      .not().isEmpty()
      .withMessage('Password cannot be empty'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "authentication",
          message: validationMessage(req)
        })
      );
    }

    try {
      const {email, password} = req.body;
      const controller = new AuthController();
      const {result, token, user} = await controller.login({email, password})

      if (!result) {
        res.status(401).json(
          formattedResponse({
            status: 401,
            object: "authentication",
            message: "Invalid username or password."
          })
        );
        return;
      }

      res.status(200).json({
        status: 200,
        message: "User login complete.",
        token,
        user
      });

    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          object: "authentication",
          message: `There was an error while login.`
        }))
    }

  });

/* POST users/register - register user */
authRouter.post('/register',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Provide a valid email address'),
    body('password')
      .isStrongPassword()
      .withMessage('Password must be at least 8 characters long and contain at least one uppercase, lowercase, number and special character.'),
    body('name')
      .not().isEmpty()
      .withMessage('Name cannot be empty'),
    body('surname')
      .not().isEmpty()
      .withMessage('Surname cannot be empty'),
  ],
  async (req: Request, res: Response) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "authentication",
          message: validationMessage(req)
        })
      );
    }

    try {
      const {email, password, name, surname} = req.body;
      const controller = new AuthController();


      const result = await controller.register({email, password, name, surname});

      if (!result) {
        return res.status(200).json(
          formattedResponse({
            status: 200,
            object: "authentication",
            message: `User already registered.`
          })
        );
      }

      res.status(201).json(
        formattedResponse({
          status: 201,
          object: "authentication",
          message: `User registration complete.`
        })
      );

    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          object: "authentication",
          message: `There was an error while registering.`
        }))
    }

  });

export default authRouter;