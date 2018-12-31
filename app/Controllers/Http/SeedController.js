"use strict";

const Click = use("App/Models/Click");
const Link = use("App/Models/Link");
const User = use("App/Models/User");
// node modules
const Chance = require("chance");
const chance = new Chance();

const Database = use("Database");

class SeedController {
  /**
   * empty all table via route, must have auth later
   * then move route definition to middleware auth group.
   *
   * @param {*} { auth }
   * @returns
   * @memberof SeedController
   */
  async empty_all({ auth }) {
    const check_0 = await Database.raw("SET FOREIGN_KEY_CHECKS = 0");
    const tbl_links = await Database.raw("TRUNCATE table links");
    const tbl_users = await Database.raw("TRUNCATE table users");
    const tbl_clicks = await Database.raw("TRUNCATE table clicks");
    const tbl_tokens = await Database.raw("TRUNCATE table tokens");
    const check_1 = await Database.raw("SET FOREIGN_KEY_CHECKS = 1");
    return { check_0, tbl_links, tbl_users, tbl_clicks, tbl_tokens, check_1 };
  }

  /**
   * for generate sample data via route
   *
   * @param {*} { request }
   * @returns
   * @memberof SeedController
   */
  async seed_all({ request, response }) {
    const { rahasia, user_data_count, link_data_count } = request.only([
      "rahasia",
      "user_data_count",
      "link_data_count"
    ]);

    const user_count = parseInt(user_data_count);
    const link_count = parseInt(link_data_count);

    if (rahasia === "aingazul" && user_count > 0 && link_count > 0) {
      // check record each table
      const user = await User.query().first();
      const link = await Link.query().first();
      const click = await Click.query().first();
      // execute seed
      if (user === null && link === null && click === null) {
        let users_data = [];
        let links_data = [];
        // let click_data = [];
        // generate users_data
        for (let i = 1; i <= user_count; i++) {
          const fName = chance.first();
          const firstname = fName.toLowerCase();
          users_data.push({
            user_name: firstname,
            full_name: fName + " " + chance.last(),
            mobile_phone: chance.phone({ mobile: true }),
            email: chance.email(),
            password: firstname
          });
        }
        // generate links_data
        for (let l = 1; l < link_count; l++) {
          links_data.push({
            long_url: chance.avatar(),
            short_url: chance.string({
              pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
              length: 6
            }),
            is_custom: chance.bool(),
            user_id: chance.integer({ min: 1, max: user_count }),
            ip: chance.ip()
          });
        }
        // save users_data
        const created_users = await User.createMany(users_data);
        // save links_data
        const created_links = await Link.createMany(links_data);
        // return response
        return { success_msg: "Table seeded", created_users, created_links };
      } else {
        response.status(400).send("Table has records");
      }
    } else {
      response.status(401).send("No access allowed");
    }
  }
}

module.exports = SeedController;
