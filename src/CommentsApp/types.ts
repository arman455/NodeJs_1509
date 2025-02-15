import { Prisma } from "@prisma/client";

export type Comment = Prisma.ComentGetPayload<{}>

export type CreateComment = Prisma.ComentUncheckedCreateInput