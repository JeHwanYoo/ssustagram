"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rooms.init(
    {
      room_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      a_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      b_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      messages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rooms",
      underscored: true,
    }
  );
  return Rooms;
};
