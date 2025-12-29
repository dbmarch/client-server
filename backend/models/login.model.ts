import {Schema, model, type HydratedDocument, Model, Types} from 'mongoose';
import {type User} from './user.ts'

const loginSchema = new Schema<User> ({
   username: { type: String, required: true},
   password: { type: String, required: true},
   role:     { type: String}
});

export const Login = model<User>('User', loginSchema);
export type LoginDocument = HydratedDocument<User>;
