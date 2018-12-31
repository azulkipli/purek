"use strict";

const Click = use("App/Models/Click");
const Link = use("App/Models/Link");
const User = use("App/Models/User");
// node modules
const Chance = require("chance");
const chance = new Chance();

class SeedController {
  async seed_all({ request }) {
    const keyword = request.input("rahasia");
    if (keyword === "aingazul") {
      // check record each table
      const user = await User.query().first();
      const link = await Link.query().first();
      const click = await Click.query().first();
      // execute seed
      if (user === null && link === null && click === null) {
        let usersData = [];
        let linksData = [];
        let clicksData = [];
        for (let i = 0; i < 10; i++) {
          const fname = chance.first();
          usersData.push({
            user_name: fname.toLowerCase(),
            full_name: fname + " " + chance.last(),
            mobile_phone: chance.phone({ mobile: true }),
            email: chance.email(),
            password: chance.ip()
          });
        }
        const created_users = await User.createMany(usersData);
        return { success_msg: "User seeded", created_users };
      } else {
        return "execute seed batal";
      }
    } else {
      return "ga boleh akses dong";
    }
  }
}

module.exports = SeedController;
