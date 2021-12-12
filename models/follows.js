"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follows.init(
    {
      from_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      to_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Follows",
      underscored: true,
    }
  );
  return Follows;
};
