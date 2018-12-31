"use strict";

const Click = use("App/Models/Click");
const Link = use("App/Models/Link");
const User = use("App/Models/User");
const { validate, validateAll } = use("Validator");
const ipToCountry = require("@risan/ip-to-country");

class ClickController {
  // add click
  async add({ request, response, auth }) {
    const { short_url } = request.only(["short_url"]);
    // Validate request
    const rules = {
      short_url: "required"
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      // build custom error string
      const messages = validation.messages();
      let error_msg = [];
      if (messages.length > 0) {
        error_msg = messages.map(item => {
          return item.field + " " + item.message;
        });
      }
      response.status(400).send({
        error_msg: error_msg
      });
    } else {
      // process request for creating new click
      const req_ip = request.ip();
      const headers = request.headers();
      console.log("headers", headers);
      let check_ip = "";
      let link_id = 0;
      let link_clicks = 0;

      try {
        // check link clicked
        const link = await Link.query()
          .where("short_url", short_url)
          .first();

        link_id = link.id;
        link_clicks = link.click_count;

        if (req_ip === "127.0.0.1") check_ip = link.ip;

        let click = {
          referer_host: request.hostname(),
          user_agent: headers["user-agent"],
          link_id: link_id,
          ip: check_ip
        };

        // get country name from ip address
        const ip_ToCountry = await ipToCountry(check_ip);
        console.log("ip_ToCountry", ip_ToCountry);

        if (ip_ToCountry) {
          const ipCountry = ip_ToCountry.name;
          Object.assign(click, { country: ipCountry });
        }
        const created_click = await Click.create(click);
        const update_link_click = await Link.query()
          .where("id", link_id)
          .update({ click_count: link_clicks + 1 });
        // send response
        response
          .status(200)
          .send({ success_msg: "Click URL success.", created_click, update_link_click });
      } catch (error) {
        response.status(400).send({
          error_msg: error.toString()
        });
      }
    }
  }
}

module.exports = ClickController;
