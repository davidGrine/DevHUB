'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      _id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: '_id',
        },
      },

      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: '_id',
        },
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_roles')
  },
}