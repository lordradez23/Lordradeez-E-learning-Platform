import { generateSlug } from "../src/lib/slugify";
import { PrismaClient } from "../src/generated/prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.learningItem.deleteMany();
  await prisma.courseLearning.deleteMany();
  await prisma.courseRating.deleteMany();
  await prisma.course.deleteMany();
  await prisma.news.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
    
  await prisma.user.createMany({
    data: Array.from({ length: 50 }, () => ({
      fullname: faker.person.fullName(),
      username: faker.internet.displayName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatarUrl: faker.image.avatar(),
      university: faker.company.name(),
    })),
  });
  await prisma.category.createMany({
    data: [
      { title: "Development", slug: await generateSlug("Category", "Development"), iconName: "BookPlus" },
      { title: "Marketing", slug: await generateSlug("Category", "Marketing"), iconName: "ChartCandlestick" },
      { title: "Music", slug: await generateSlug("Category", "Music"), iconName: "Music" },
    ],
  });
  const instructors = await Promise.all(
    Array.from({ length: 20 }, async () => {
      const name = faker.person.fullName();
      return {
        name,
        slug: await generateSlug("Instructor", name),
        avatarUrl: faker.image.avatar(),
        headline: faker.person.jobTitle(),
        summary: faker.lorem.sentences(4),
        bio: faker.lorem.paragraphs(),
        totalStudents: faker.number.int(1000),
        totalReviews: faker.number.int(10000),
        linkedinUrl: faker.internet.url(),
        facebookUrl: faker.internet.url(),
        twitterUrl: faker.internet.url(),
        youtubeUrl: faker.internet.url(),
        websiteUrl: faker.internet.url(),
      };
    })
  );
  await prisma.instructor.createMany({
    data: instructors,
  });
  const categoryIds = (await prisma.category.findMany()).map((c) => c.id);
  const instructorIds = (await prisma.instructor.findMany()).map((i) => i.id);
  const courses = await Promise.all(
    Array.from({ length: 80 }, async () => {
      const title = faker.lorem.words(4);
      return {
        title,
        price: faker.number.float({ min: 50, max: 200, multipleOf: 1 }),
        slug: await generateSlug("Course", title),
        description: faker.lorem.sentences(3),
        detailDescription: faker.lorem.paragraphs(5),
        imageUrl:
          "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: faker.helpers.arrayElement(categoryIds),
        instructorId: faker.helpers.arrayElement(instructorIds),
        duration: "3 Months",
        lectures: faker.number.int({ min: 50, max: 200 }),
        translation: "English",
        badgeBg: `bg-blue-500`,
        ratingCount: faker.number.float({ min: 3, max: 5, multipleOf: 0.1 }),
        ratingTotal: faker.number.int({ min: 30, max: 300 }),
      };
    })
  );
  await prisma.course.createMany({
    data: courses,
  });
  const courseIds = (await prisma.course.findMany()).map((c) => c.id);
  const userIds = (await prisma.user.findMany()).map((c) => c.id);
  const news = await Promise.all(
    Array.from({ length: 25 }, async () => {
      const title = faker.lorem.words(4);
      return {
        title,
        slug: await generateSlug("Course", title),
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1661770132071-026114fffb61?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: faker.helpers.arrayElement(categoryIds),
        description: faker.lorem.sentences(3),
        reads: faker.number.int({ min: 50, max: 200 }),
        badgeBg: `bg-${faker.color.human()}-500`,
      };
    })
  );
  await prisma.news.createMany({
    data: news,
  });
  await prisma.review.createMany({
    data: Array.from({ length: 100 }, () => ({
      userId: faker.helpers.arrayElement(userIds),
      courseId: faker.helpers.arrayElement(courseIds),
      rating: faker.number.float({ min: 3, max: 5, multipleOf: 0.1 }),
      review: faker.lorem.sentences(4),
    })),
  });
  await prisma.courseLearning.createMany({
    data: Array.from({ length: 100 }, () => ({
      courseId: faker.helpers.arrayElement(courseIds),
      title: faker.lorem.words(4),
      description: faker.lorem.sentences(3),
    })),
  });
  const learningIds = (await prisma.courseLearning.findMany()).map((c) => c.id);
  await prisma.learningItem.createMany({
    data: Array.from({ length: 100 }, () => ({
      learningId: faker.helpers.arrayElement(learningIds),
      item: faker.lorem.words(4),
    })),
  });
  await prisma.chapter.createMany({
    data: Array.from({ length: 100 }, () => ({
      courseId: faker.helpers.arrayElement(courseIds),
      topic: faker.lorem.words(3),
      duration: faker.number.int({ min: 1, max: 20 }) + " mins",
    })),
  });

  const chapterIds = (await prisma.chapter.findMany()).map((c) => c.id);
  const lesson = await Promise.all(
    Array.from({ length: 250 }, async () => {
      const title = faker.lorem.words(3);
      return {
        title,
        slug: await generateSlug("Lesson", title),
        chapterId: faker.helpers.arrayElement(chapterIds),
        duration: faker.number.int({ min: 1, max: 20 }) + " mins",
        video: "https://www.youtube.com/watch?v=qfPUMV9J5yw",
      };
    })
  );
  await prisma.lesson.createMany({
    data: lesson,
  });
  await prisma.enrollment.createMany({
    data: Array.from({ length: 300 }, () => ({
      userId: faker.helpers.arrayElement(userIds),
      courseId: faker.helpers.arrayElement(courseIds),
      progress: 20,
      finishedLessons: 9,
    })),
  });
  await prisma.courseRating.createMany({
    data: courseIds.map((courseId) => ({
      courseId,
      average: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
      totalReviews: 200,
      stars5: 160,
      stars4: 20,
      stars3: 10,
      stars2: 5,
      stars1: 5,
    })),
  });
  await prisma.comment.createMany({
    data: Array.from({ length: 200 }, () => ({
      content: faker.lorem.sentences(3),
      userId: faker.helpers.arrayElement(userIds),
      courseId: faker.helpers.arrayElement(courseIds),
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
