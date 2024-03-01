import jwt from 'jsonwebtoken'
import { IUser } from './interfaces'

const signToken = (user: any) => {
    return jwt.sign(user, process.env.JSON_TOKEN as string, {
        expiresIn: '3d'
    })
}

export { signToken }