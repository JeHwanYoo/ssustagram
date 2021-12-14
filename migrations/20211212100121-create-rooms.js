"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rooms", {
      room_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      a_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      b_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      messages: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Rooms");
  },
};
