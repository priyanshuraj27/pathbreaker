import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
// console.log("app.js");
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

 app.use(express.json({limit : "16kb"}));
 app.use(urlencoded({extended : true}));
 app.use(express.static('public'));
 app.use(cookieParser());
 

// Routes import 
import UserRouter from './routes/user.routes.js';
import blogRouter from "./routes/blog.routes.js";
import studyMaterialRouter from "./routes/studyMaterial.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
import flashcardRouter from './routes/flashcard.routes.js';
import QuizRouter from './routes/quiz.routes.js';
// routes declaration
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/study-materials", studyMaterialRouter);
app.use("/api/v1/mentors", mentorRouter);
app.use("/api/v1/flashcards", flashcardRouter);
app.use("/api/v1/quizzes", QuizRouter);
export {app};
