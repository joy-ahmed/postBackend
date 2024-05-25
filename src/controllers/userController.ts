import { prisma } from "../../libs/prisma";
import type { User } from "@prisma/client";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
};

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
        password: hashedPassword,
      },
    });
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//get single user
export const getSingleUser = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: id } });
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//delete user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id: id } });
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//login user and set cookie
export const loginUser = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const { email, password } = req.body;
    //find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return null;
    }
    //compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return null;
    }   

    //generate token
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
    //set cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//logout user
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

