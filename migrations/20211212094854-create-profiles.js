"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      userid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  },
};
