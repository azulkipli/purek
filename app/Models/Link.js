"use strict";

const Model = use("Model");

class Link extends Model {
  /**
   * return link click history
   *
   * @returns
   * @memberof Link
   */
  clicks() {
    return this.hasMany("App/Models/Click");
  }
}

module.exports = Link;
