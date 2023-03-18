const QuizService = require('../services/quiz.service');
const { InvalidParamsError } = require('../exceptions/index.exception');
const { ValidationError } = require('../exceptions/index.exception');
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
          
          res.status(200).json({ data: quiz })
        } catch (error) {
          next(error);
        }
    }

    createQuiz = async (req, res, next) => {
      try {
        const { title, answer, explain } = req.body
        const { userId } = res.locals.user;
        
        if (req.file){
          const storage = multer.diskStorage({
            destination: function (cb) {
                const dir = '../uploads';
                if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                }
                cb(null, dir);
            },
            filename: function (file, cb) {
                cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
            }
            });
  
          const upload = multer({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 100 }, // 100MB
          }); 
  
          const fileInfo = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            resourceUrl: `http://${req.headers.host}/uploads/${req.file.filename}`
          }
          const {resourceUrl} = fileInfo
          await upload.single('img')
          await this.quizService.createImgUrl( resourceUrl );
        }

        await this.quizService.createQuiz( userId, title, answer, explain );
        return res.status(201).json({ 
          success:true,
          message: '성공적으로 등록되었습니다.' 
        });
  
      } catch (error) {
        next(error);
      }
  }
}

module.exports = QuizController;