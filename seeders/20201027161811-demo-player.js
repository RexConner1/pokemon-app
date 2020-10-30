"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
          name: "Ash",
          rival: "Gary",
          pokemon: "Pikachu",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 5
        },
        {
          name: "Gary",
          rival: "Ash",
          pokemon: "Eevee",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 5
        },
        {
          name: "Red",
          rival: "Blue",
          pokemon: "Charmander",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 5
        },
        {
          name: "Blue",
          rival: "Red",
          pokemon: "Squirtle",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 5
        },
        {
          name: "Jessie",
          rival: "Ash",
          pokemon: "Ekans",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 1
        },
        {
          name: "James",
          rival: "Ash",
          pokemon: "Koffing",
          createdAt: new Date(),
          updatedAt: new Date(),
          teamId: 1
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Players', null, {});
  },
};