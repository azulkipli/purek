"use strict";

const UserSeeder = require("./UserSeeder");
const LinkSeeder = require("./LinkSeeder");

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    await UserSeeder.run();
    await LinkSeeder.run();
  }
}

module.exports = DatabaseSeeder;
