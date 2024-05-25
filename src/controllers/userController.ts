import { prisma } from "../../libs/prisma";
import type { User } from "@prisma/client";
import type { Request, Response } from "express";
import bcrypt  from "bcryptjs";


export const getUsers = async (
    req: Request,
    res: Response
): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

//create user
export const createUser = async (
    req: Request,
    res: Response
): Promise<User | null> => {
    try {
        const { email, password } = req.body;
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        res.status(200).json(user);
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}