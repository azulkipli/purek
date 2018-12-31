"use strict";

const User = use("App/Models/User");

// const { validateAll } = use("Validator");

class UserController {
  async list() {
    // const users = await User.all();
    const users = await User.query().fetch();

    return users;
  }

  async my_profile({ response, auth }) {
    const refreshTokens = await auth.listTokens();
    if (refreshTokens.length > 0) {
      try {
        let user = auth.user;
        const links = await user.links().fetch();
        return Object.assign(user, { links: links });
      } catch (error) {
        response.status(200).send({ success_msg: "You already logged out." });
      }
    } else {
      response.status(401).send({ error_msg: "Invalid authorization token." });
    }
  }
}

module.exports = UserController;
