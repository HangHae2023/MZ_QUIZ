const QuizService = require('../services/quiz.service');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

class QuizController {
  constructor() {
    this.quizService = new QuizService(); 
  }

    getAllQuiz = async (req, res, next) => {
        try {
          const quiz = await this.quizService.getAllQuiz();
          
          res.status(200).json({allQuizs: quiz })
        } catch (error) {
          next(error);
        }
    }

    getQuiz = async (req, res, next) => {
      try {
        const { quizId } = req.params;

        const quiz = await this.quizService.getQuiz(quizId);
        
        res.status(200).json({quiz: quiz })
      } catch (error) {
        next(error);
      }
  }

    createQuiz = async (req, res, next) => {
      try {
        const { title, answer, explain } = req.body
        const { userId } = res.locals.user;
        
        await this.quizService.createQuiz( userId, title, answer, explain );
        return res.status(201).json({ 
          success:true,
          message: '성공적으로 등록되었습니다.' 
        });
  
      } catch (error) {
        next(error);
      }
    }

    updateQuiz = async (req, res, next) => {
      try {  
        const { title, answer, explain } = req.body
        const { userId } = res.locals.user;
        const { quizId } = req.params;
      
      await this.quizService.updateQuiz( userId, quizId, title, answer, explain );
      return res.status(200).json({
        success:true,
        message: '게시글을 수정하였습니다.' });
      } catch (error) {
        next(error);
      }
    }

    deleteQuiz = async (req, res, next) => {
      try {  
        const { userId } = res.locals.user;
        const { quizId } = req.params;
      
      await this.quizService.deleteQuiz( userId, quizId );
      return res.status(200).json({
        success:true,
        message: '게시글을 삭제하였습니다.' });
      } catch (error) {
        next(error);
      }
    }
    checkAnswer = async (req, res, next) => {
      try {  
        const { answer } = req.body

      const check = await this.quizService.checkAnswer( answer )
      const collect = "정답 입니다."
      const wrong = "오답 입니다."
      if (check) {
        return res.status(200).json({
          success:true,
          message: collect });
      } else {
        return res.status(200).json({
          success:true,
          message: wrong });
      }
      } catch (error) {
        next(error);
      }
    }
}


        // if (req.file){
        //   const storage = multer.diskStorage({
        //     destination: function (cb) {
        //         const dir = '../uploads';
        //         if (!fs.existsSync(dir)) {
        //         fs.mkdirSync(dir);
        //         }
        //         cb(null, dir);
        //     },
        //     filename: function (file, cb) {
        //         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        //     }
        //     });
  
        //   const upload = multer({
        //     storage: storage,
        //     limits: { fileSize: 1024 * 1024 * 100 }, // 100MB
        //   }); 
  
        //   const fileInfo = {
        //     filename: req.file.filename,
        //     originalname: req.file.originalname,
        //     size: req.file.size,
        //     mimetype: req.file.mimetype,
        //     resourceUrl: `http://${req.headers.host}/uploads/${req.file.filename}`
        //   }
        //   const {resourceUrl} = fileInfo
        //   await upload.single('img')
        //   await this.quizService.createImgUrl( resourceUrl );
        // }
module.exports = QuizController;