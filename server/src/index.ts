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
  userId?: string;
}

const verifyToken = (req:CustomRequest, res:Response, next: NextFunction ): void  => {

  const token = req.headers["x-access-token"];

  if (!token || Array.isArray(token)) {
    res.send({error: 'No Token Provided'});
    return;
  }

  

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {

      if (error) {
          res.send({ error: "You session has expired or does not exist." });
          return;
      } else if (decoded && typeof decoded !== "string" && "userId" in decoded) {
        req.userId = (decoded as jwt.JwtPayload).userId;
        next();
      } else {
          res.send({error: "Could not authenticate session"})
          return;

  }});

};


app.post('/create-user', async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData.email || !userData.name || userData.password ) {
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
            fullName: userData.fullName
        }
    });
  } catch (error) {
      console.log(error);
      res.send({ error: "Something went wrong. Please try again later." });
      return;
  }
  res.send({ success: "Added user successfully"});
});


app.post('/login', async (req:Request, res:Response) => {
    const loginData = req.body;

    if (!loginData.email || !loginData.password) {
      res.send({error: "You've left empty fields!"});
      return;
    }

    const user = await prisma.user.findUnique({
      where: {email: loginData.email}
    });

    if (!user) {
      res.send({error:"No user found with that email."});
      return;
    }

    const passwordValid = await bcrypt.compare(loginData.password, user.password);

    if (!passwordValid) {
      res.send({error: "password for that email is invalid."});
      return;
    }

    delete user.password;

    res.send({
      token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, { expiresIn: "1h" }),
      user
  });
});



app.get('/get-posts', verifyToken, async (req: Request, res: Response ) => {

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});