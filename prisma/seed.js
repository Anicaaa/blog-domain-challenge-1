const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
    data: [
      { username: "bob", email: "bob@mail.com" },
      { username: "ann", email: "ann@mail.com" },
    ],
  });

  console.log(`${createdUsers.count} users created`, createdUsers);

  // Add your code here

  const createdProfile = await prisma.profile.create({
    data: {
      userId: 1,
      picture: "https://profilePictureURL",
      biography:
        "Hi everyone, I'm Bob and, in this blog, I'll share my cooking tips",
    },
  });

  const createdPost = await prisma.post.create({
    data: {
      userId: 2,
      title: "How to make Tiramisù",
      published: true,
      url: "https://profilePictureURL",
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      postId: createdPost.id,
      content: "Ahsdbucyebchj",
    },
  });

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
