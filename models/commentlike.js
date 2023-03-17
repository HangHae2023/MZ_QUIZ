'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
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

      this.belongsTo(models.QuizComment, {
        targetKey: 'commentId',
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
      });
    }
  }
  CommentLike.init(
    {
      likeId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      commentId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      userId: {
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
      modelName: 'CommentLike',
      uniqueKeys: {
        quizCommentLikeKey: {
          fields: ['commentId', 'userId'],
        },
      },
    }
  );
  return CommentLike;
};
