"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Follows", {
      from_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      to_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Follows");
  },
};
