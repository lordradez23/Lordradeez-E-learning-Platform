import slugify from "slugify";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import prisma from "./db";

type ModelName = Prisma.ModelName;

type ModelDelegate = {
  findFirst: (args: { where: { slug: string } }) => Promise<{ slug: string } | null>;
};

type PrismaClientWithModels = PrismaClient & {
  [K in ModelName]: ModelDelegate;
};

const prismaClient = prisma as unknown as PrismaClientWithModels;

export async function generateSlug(model: ModelName, text: string): Promise<string> {
  let slug = slugify(text, {
    lower: true,
    strict: true,
    locale: "ar",
  });

  let counter = 1;
  const originalSlug = slug;

  while (true) {
    const exists = await prismaClient[model].findFirst({
      where: { slug },
    });

    if (!exists) break;
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
}
