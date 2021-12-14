"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Follows", {
      fields: ["from_id"],
      type: "foreign key",
      name: "fk_follows_from",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Follows", {
      fields: ["to_id"],
      type: "foreign key",
      name: "fk_follows_to",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Images", {
      fields: ["userid"],
      type: "foreign key",
      name: "fk_images",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Rooms", {
      fields: ["a_id"],
      type: "foreign key",
      name: "fk_rooms_a",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Rooms", {
      fields: ["b_id"],
      type: "foreign key",
      name: "fk_rooms_b",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("EmailAuths", {
      fields: ["userid"],
      type: "foreign key",
      name: "fk_email_auths",
      references: {
        table: "accounts",
        field: "userid",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
