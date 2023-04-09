import mongoose, { Schema, Document, Callback } from "mongoose";
import bcrypt from "bcrypt";

const SALT_FACTOR: number = 13;

export interface IUser extends Document {
    comparePassword(
        pass: string,
        arg1: (err: Error, isMatch: boolean) => void): void;
    login: string;
    password: string;
    items: [];
}

const User: Schema = new mongoose.Schema({
    login: { type: "string", required: true, unique: true },
    pass: { type: "string", required: true },
    items: { type: "array" }
});

User.pre("save", function (next): void {
    let user = this;

    if (!user.isModified("pass")) {
        return next();
    }

    bcrypt.genSalt(
        SALT_FACTOR,
        function (err: Error | undefined, salt: string) {
            if (err) {
                return next(err)
            }

            bcrypt.hash(
                user.pass,
                salt,
                function (err: Error | undefined, hash: string) {
                    if (err) {
                        return next(err);
                    }
                    user.pass = hash;
                    next();
                }
            )
        }
    )
})

User.methods.comparePassword = function (candidatePass: string,cb: Callback){
    bcrypt.compare(
        candidatePass,
        this.pass,
        function(err:Error|undefined, isMatch: boolean){
            if(err) {
                return cb(err,null);
            }
            cb(null, isMatch)
        }
    )
}

export default mongoose.model<IUser>("User",User);