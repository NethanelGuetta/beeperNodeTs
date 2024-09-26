import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface User {
  id: string,
  email: string,
  password: string
}

export const users: User[] = [
  { id: uuidv4(), email: "Hello@gmail.com", password: "1234" },
  { id: uuidv4(), email: "Hello@gmail.com", password: "1234" },
  { id: uuidv4(), email: "Hello@gmail.com", password: "1234" },
];

users.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json(users);
});

app.post("/user", async (req: Request, res: Response) => {
  // משכתי את המשתנים שאני רוצה מהאובייקט בקשה
  const { email, password } = req.body;
  // יצרתי מתמש חדש
  const newUser: User = { id: uuidv4(), email, password: bcrypt.hash(password) };

  users.push(newUser);
  // מחזיר הודעה למשתמש שהוא הצליח
  res.status(201).json("User created successfully");
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    res.send("User is connected");
  } else {
    res.status(401).send("Incorrect password. GET OUT");
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
