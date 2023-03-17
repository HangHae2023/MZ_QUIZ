'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizAnswerHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.QuizPost, {
        targetKey: 'quizId',
        foreignKey: 'quizId',
        onDelete: 'CASCADE',
      });
    }
  }
  QuizAnswerHistory.init(
    {
      historyId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      quizId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      answer: {
        allowNull: false, // NOT NULL
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
      modelName: 'QuizAnswerHistory',
      uniqueKeys: {
        quizHistoryKey: {
          fields: ['userId', 'quizId'],
        },
      },
    }
  );
  return QuizAnswerHistory;
};
