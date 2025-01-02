import express , { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();
const port = 4000;


app.post('/create-user', async (req, res) => {
  const userData = req.body;

  if (!userData.email || !userData.name || userData.password ) {
    res.send({error: "You've left empty fields"});
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.Email,
      password: //password encrypted inshallah,// 
      }
  });

  res.send({ success: "Added " + user.name + " successfully"});
});

app.get({'/get-posts', async (req: void, res: Array | null ) => {

  const posts: Array = await prisma.post.findMany();

  res.send(posts);


}})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});