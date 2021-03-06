"use strict";

const Model = use("Model");
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * Hide some fields here
   *
   * @readonly
   * @static
   * @memberof User
   */
  static get hidden() {
    return ["password"];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  /**
   * return user's links
   *
   * @returns
   * @memberof User
   */
  links() {
    return this.hasMany("App/Models/Link");
  }
}

module.exports = User;
