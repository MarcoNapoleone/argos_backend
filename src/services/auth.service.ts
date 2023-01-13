import {getHashedPassword, verifyPassword} from "../utils/password";
import jwt from "jsonwebtoken";
import {create, findOne} from "./users.service";

export async function login(params: { email: string, password: string }) {

  const user = await findOne("email", params.email)

  if (!user) return {result: false, token: {}}

  if (!await verifyPassword(params.password, user.password)) return {result: false, token: {}}

  const payload = {
    sub: user.uuid,
  }
  return {
    result: true,
    token: jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`
      }
    ),
    user: {
      uuid: user.uuid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role
    }
  }


}

export async function register(params: { email: string, password: string, name: string, surname: string }) {

  const user = await findOne("email", params.email)
  if (user) return false

  const hashedPassword = await getHashedPassword(params.password)
  await create({...params, password: hashedPassword})
  return true;

}

