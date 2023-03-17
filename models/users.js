'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 한 회원은 여러 쿼즈를 낼 수 있다.
      this.hasMany(models.QuizPost, {
        sourceKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // QuizPost 모델의 userId 컬럼이 외래키로 사용할 수 있도록 연결
      });

      this.hasMany(models.QuizComment, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.QuizAnswerHistory, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.QuizLike, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.CommentLike, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false, // NOT NULL
        unique: true,
        type: DataTypes.STRING,
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
      modelName: 'Users',
    }
  );
  return Users;
};
