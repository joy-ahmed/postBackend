import { prisma } from "../../libs/prisma";
import type { Post } from "@prisma/client";
import type { Request, Response } from "express";

export const getPosts = async (
  req: Request,
  res: Response
): Promise<Post[]> => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//get single post
export const getSinglePost = async (
  req: Request,
  res: Response
): Promise<Post | null> => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id: id } });
    res.status(200).json(post);
    return post;
  } catch (error) {
    console.log(error);
    return {} as Post;
  }
};


//post a post
export const createPost = async (
  req: Request,
  res: Response
): Promise<Post | null> => {
  try {
    const { title, content, authorId } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(200).json(newPost);
    return newPost;
  } catch (error) {
    console.log(error);
    return {} as Post;
  }
};
