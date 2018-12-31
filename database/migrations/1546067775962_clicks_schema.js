"use strict";

const Schema = use("Schema");

class ClicksSchema extends Schema {
  up() {
    this.create("clicks", table => {
      table.increments();
      table.string("ip").index("ip");
      table.string("country").defaultTo("");
      table.string("referer").defaultTo("");
      table
        .string("referer_host")
        .index("referer_host")
        .nullable();
      table.text("user_agent").nullable();
      table
        .integer("link_id")
        .index("link_id")
        .unsigned();
      table
        .foreign("link_id")
        .references("id")
        .inTable("links")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("clicks");
  }
}

module.exports = ClicksSchema;
