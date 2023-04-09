import { Request, Response, response } from 'express'
import User, { IUser } from "../models/user_models";


export const userLogin = (req: Request, res: Response): void => {
    const { login, pass } = req.body;

    User.findOne({ login: login })
    .then((user: IUser | null) => {
        if (!user) {
            return res.status(404).send({ error: "Not found!" });
        }
        user.comparePassword(pass, function (err: Error, isMatch: boolean) {
            if (err) throw err;
            if (isMatch) {
                req.session.userId = user._id;
                return res.json({ ok: true });
            }
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

export const userRegister = async (req: Request, res: Response): Promise<Response> => {
    const { login, pass } = req.body;

    let existingUser = await User.findOne({ login: login });
    if (existingUser) {
        return res.status(500).json({ error: "User already exist!" })
    }
    let user: IUser = new User({
        login: login,
        pass: pass,
    });

    return user
        .save()
        .then(() => res.json({ ok: true }))
        .catch(() => res.status(500).json({ error: "Failed to create user!" }))
};

export const userLogout = (req: Request, res: Response): void => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
};
