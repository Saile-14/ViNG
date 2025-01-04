import express , { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";




const app = express();
const prisma = new PrismaClient();
const port = 4000;

app.use(express.json());
app.use(cors());

const verifyToken = (req:Request, res:Response, next: NextFunction ) => {

  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {

      if (error) {
          res.send({ error: "You session has expired or does not exist." });
          return;
      } else {
          req.userId = decoded.userId;
          next();
      }

  });

};


app.post('/create-user', async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData.email || !userData.name || userData.password ) {
    res.send({error: "You've left empty fields"});
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password//password encrypted inshallah,// 
      }
  });

  res.send({ success: "Added " + user.name + " successfully"});
});

app.get('/get-posts', async (req: Request, res: Response ) => {

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.send(posts);
  } catch (error) {
    res.status(500).send({error: "Failed to fetch posts"})  
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});