"use strict";

const UserSeeder = require("../seedmodel/UserSeeder");
const LinkSeeder = require("../seedmodel/LinkSeeder");

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    await UserSeeder.run();
    await LinkSeeder.run();
  }
}

module.exports = DatabaseSeeder;
