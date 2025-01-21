import express , { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import emailValidator from "email-validator";
import passwordValidator from 'password-validator';




const app = express();
const prisma = new PrismaClient();
const schema = new passwordValidator();
const port = 4000;

app.use(express.json());
app.use(cors());

interface CustomRequest extends Request {
  userId?: number;
}



const verifyToken = (req:CustomRequest, res:Response, next: NextFunction ): void  => {

  const token = req.headers["x-access-token"];

  if (!token || Array.isArray(token)) {
    res.status(401).send({error: 'No Token Provided'});
    return;
  }

  

  jwt.verify(token, "supersecretstring", (error, decoded) => {

      if (error) {
          res.status(401).send({ error: "Your session has expired or does not exist." });
          return;
      } else if (decoded && typeof decoded !== "string" && "userId" in decoded) {
        req.userId = (decoded as jwt.JwtPayload).userId;
        next();
      } else {
          res.send({error: "Could not authenticate session"})
          return;

  }});

};

app.get('/current-user', verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true }
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/create-user', async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData.email || !userData.name || !userData.password ) {
    res.send({error: "You've left empty fields"});
    return;
  }

  const emailValid = emailValidator.validate(userData.email);
  if (!emailValid) {
      res.send({ error: "The email you submitted is not valid." });
      return;
  }
  

  const emailExists = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (emailExists) {
    res.send({ error: "An account with this email already exists." });
    return;
  }

  schema
        .is().min(8)                                    
        .is().max(100)                                  
        .has().uppercase()                              
        .has().lowercase()                              
        .has().digits(2)                                
        .has().not().spaces(); 

  
  const passwordValid = schema.validate(userData.password);

  if (!passwordValid) {
    res.send({ error: "Your password is not safe, please include 8 characters with upper and lower case letters, and numbers." });
    return;
}


  try {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    const user = await prisma.user.create({
        data: {
            email: userData.email,
            password: hashedPassword,
            name: userData.name
        }
    });
  } catch (error) {
      console.log(error);
      res.send({ error: "Something went wrong. Please try again later." });
      return;
  }
  res.send({ success: "Added user successfully"});
});

app.patch('/update-user/:userId', verifyToken, async (req: CustomRequest , res: Response) => {

    const userId = parseInt(req.params.postId);
    const userData = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.send({ error: 'User not found' })
      return;
    }

    if (user.id !== req.userId) {
      res.send({ error: 'You do not have permission to edit this user' });
      return;
    }

    if (userData.password) {
      
      schema
      .is().min(8)                                    
      .is().max(100)                                  
      .has().uppercase()                              
      .has().lowercase()                              
      .has().digits(2)                                
      .has().not().spaces(); 


        const passwordValid = schema.validate(userData.password);

        if (!passwordValid) {
          res.send({ error: "Your password is not safe, please include 8 characters with upper and lower case letters, and numbers." });
          return;
        }

          const hashedPassword = bcrypt.hashSync(userData.password, 10);

          const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
              name: userData.name || undefined,
              password: hashedPassword || undefined
            },
          });
          res.send({ success: "Updated " + updatedUser.name })
          return;
        }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name || undefined,
      },
    });

  res.send({ success: "Updated " + updatedUser.name })
  return;
});

app.delete('/delete-user/:userId', verifyToken, async (req: CustomRequest, res: Response) => {

  const userId = parseInt(req.params.userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.send({ error: "User not found "});
    return;
  }

  if (user.id !== req.userId) {
    res.send({ error: 'You do not have permission to edit this user' });
    return;
  }


  const deletedUser = await prisma.user.delete({
    where: { id: userId }
  });

  res.send({ success: "Deleted " + deletedUser.name + " from user list." });
  return;
});


app.post('/login', async (req:Request, res:Response) => {
    const loginData = req.body;

    if (!loginData.email || !loginData.password) {
      res.status(400).send({error: "You've left empty fields!"});
      return;
    }

    const user = await prisma.user.findUnique({
      where: {email: loginData.email}
    });

    if (!user) {
      res.status(404).send({error:"No user found with that email."});
      return;
    }

    const passwordValid = await bcrypt.compare(loginData.password, user.password);

    if (!passwordValid) {
      res.status(401).send({error: "password for that email is invalid."});
      return;
    }

    res.status(200).send({
      token: jwt.sign({ userId: user.id }, 'supersecretstring', { expiresIn: "1h" }),
      user
  });
});



app.get('/get-posts', verifyToken, async (req: CustomRequest, res: Response ) => {


  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.send(posts);
 
  } catch (error) {
    res.status(500).send({error: "Failed to fetch posts"});  
  }
});

app.get('/get-user-posts', verifyToken, async (req: CustomRequest, res: Response) => {


    try {
      const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        where: { userId: req.userId},
      });

      res.status(200).send(posts)
    } catch (error) {
      res.status(400).send({error: "Could not posts from this specific user"})
    }

    
});

app.post('/create-post', verifyToken, async (req: CustomRequest, res: Response) => {
  
  if (!req.userId) {
    res.status(401).send({error: "Unauthorized"})
    return;
  }

  const { title, content } = req.body as {
    title: string,
    content: string,
  };

  if (!title || !content ) {
    res.status(201).send({
      error: "Title and content is required!"
    });
    return;
  }

  const newPost = await prisma.post.create({
    data: {
      title: title,
      content: content,
      userId: req.userId,
    }
  });
  res.status(201).send(newPost);
  return;
});

app.patch('/update-post/:postId', verifyToken, async (req: CustomRequest , res: Response) => {

  const postId = parseInt(req.params.postId);
    const postData = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      res.send({ error: 'Post not found' })
      return;
    }

    if (post.userId !== req.userId) {
      res.send({ error: 'You do not have permission to edit this post' });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: postData.title || undefined,
        content: postData.content || undefined,
      },
    });

  res.send({ success: "Updated " + updatedPost.title })
  return;
});


app.delete('/delete-post/:postId', verifyToken, async (req: CustomRequest, res: Response) => {

  const postId = parseInt(req.params.postId);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    res.send({ error: "Post not found"});
    return;
  }

  if (post.userId !== req.userId) {
    res.send({ error: 'You do not have permission to delete this user' });
    return;
  }


  const deletedPost = await prisma.post.delete({
    where: { id: postId }
  });

  res.send({ success: "Deleted " + deletedPost.title});
  return;
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});