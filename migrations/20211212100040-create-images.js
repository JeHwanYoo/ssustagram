"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Images", {
      imgid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userid: {
        type: Sequelize.STRING,
      },
      files: {
        type: Sequelize.JSON,
      },
      text: {
        type: Sequelize.TEXT,
      },
      hashtags: {
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
    await queryInterface.dropTable("Images");
  },
};
