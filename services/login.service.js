const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');


class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  userLogin = async (userId, password) => {
    
    //try{
    const user = await this.loginRepository.findByIDPW(userId, password);
    if (!user) {
        throw new ValidationError('아이디 또는 패스워드를 확인해주세요.' );
    }

    return ({success:true, message:'로그인에 성공했습니다'});;
    //} catch(err) {throw new ValidationError('로그인')}
  }

  generateToken(userId){
    

    const token = jwt.sign(
      { userId },
      'Secret Key',
      { expiresIn: '1m' },
    );
  
    return token;
  }
}

module.exports = LoginService;