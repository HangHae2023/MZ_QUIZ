'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // 현재 모델의 userId가 외래키로 가진다.
        onDelete: 'CASCADE',
      });

      this.hasMany(models.QuizComment, {
        sourceKey: 'quizId',
        foreignKey: 'quizId',
      });

      this.hasMany(models.QuizLike, {
        sourceKey: 'quizId',
        foreignKey: 'quizId',
      });

      this.hasMany(models.QuizAnswerHistory, {
        sourceKey: 'quizId',
        foreignKey: 'quizId',
      });
    }
  }
  QuizPost.init(
    {
      quizId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        unique: true,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      answer: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      explain: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      resourceUrl: {
        allowNull: true, // NOT NULL
        type: DataTypes.STRING,
        defaultValue:
          'https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/sparta-supporters.png',
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'QuizPost',
    }
  );
  return QuizPost;
};
