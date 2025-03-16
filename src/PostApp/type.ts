import { Prisma } from "@prisma/client";

export type Post = Prisma.PostGetPayload<{}>

export type CreatePost = Prisma.PostUncheckedCreateInput

export type PostWithTagsComments = Prisma.PostGetPayload<{ include: { Tags: true, Coment: true } }>