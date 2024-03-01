import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ["users", "posts", "comments"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [Azat, Ilgiz] = await User.create(
    {
      username: "azat",
      password: "imdown",
      token: crypto.randomUUID(),
    },
    {
      username: "ilgiz",
      password: "jaloh",
      token: crypto.randomUUID(),
    }
  );

  const [postAzat1, postAzat2, postIlgiz1, postIlgiz2] = await Post.create(
    {
      user: Azat,
      title: "Hello guys, i want to make a coming out...",
      description:
        "Hello everyone, thanks for your support. Yes, i was in clinic yesterday and they diagnosed me with a down syndrome... Im so upset!",
      image: "fixtures/cry.jpg",
      date: 1709120842921,
    },
    {
      user: Azat,
      title: "UPD.Some news",
      description:
        "Ok doctors said it was a mistake, my iq is just a bit low so they made mistake! Im healthy!",
      image: "fixtures/happy.avif",
      date: 1709320842921,
    },
    {
      user: Ilgiz,
      title: "Hey guys i just found some lifehack!",
      description:
        "Hey guys, so as i said, i found lifehack how to get a gf! First step is to rent a big house to celebrate your birthday, and then try to talk with her in room alone!",
      image: "fixtures/mustache.jpg",
      date: 1706320842921,
    },
    {
      user: Ilgiz,
      title: "Oh no!",
      description:
        "So i was doing everything like i found out, and eventually girl that i wanted to date, slapped me! wtf?!!! am i so ugly?!",
      image: "fixtures/cry2.jpg",
      date: 1709320842921,
    }
  );

  await Comment.create(
    {
      user: Ilgiz,
      postId: postAzat1,
      message: "Brother im very sorry for you...",
    },
    {
      user: Azat,
      postId: postAzat1,
      message: "Yeah me too... im really upset",
    },
    {
      user: Ilgiz,
      postId: postAzat2,
      message: "wow! really good news!",
    },
    {
      user: Azat,
      postId: postAzat2,
      message: "yeaaa!!!",
    },
    {
      user: Azat,
      postId: postIlgiz1,
      message: "Seems like very good plan!",
    },
    {
      user: Ilgiz,
      postId: postIlgiz1,
      message: "I hope it works!",
    },
    {
      user: Azat,
      postId: postIlgiz2,
      message: "Damn! That's rough buddy!",
    },
    {
      user: Ilgiz,
      postId: postIlgiz2,
      message: "It still hurts!",
    }
  );

  await db.close();
};

void run();
