"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Images.init(
    {
      imgid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      files: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      hashtags: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Images",
      underscored: true,
    }
  );
  return Images;
};
