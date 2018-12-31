"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");

const prfx = "api/v1";

Route.get("/", () => {
  return { app: "Purek API", version: "v0.1.0" };
});

// Click
Route.group(() => {
  Route.post("add", "ClickController.add");
}).prefix(prfx + "/click");

// Link
Route.group(() => {
  Route.post("add", "LinkController.add");
  Route.post("edit", "LinkController.edit");
  Route.post("delete", "LinkController.delete");
}).prefix(prfx + "/link");

// Mix route for anonymous user throttle
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("refresh_token", "AuthController.refreshToken");
  Route.post("token_user", "AuthController.tokenUser");
}).prefix(prfx);
// .middleware("throttle:1,1");

// Mix route for anonymous user without throttle
Route.group(() => {
  Route.get("users", "UserController.list");
  Route.get("links", "LinkController.list");
  Route.post("seed_all", "SeedController.seed_all");
  Route.post("empty_all", "SeedController.empty_all");
}).prefix(prfx);

// Mix route for authorized user
Route.group(() => {
  Route.get("my_links", "LinkController.my_links");
  Route.get("my_profile", "UserController.my_profile");
  Route.post("logout", "AuthController.revokeToken");
  Route.post("revoke_token", "AuthController.revokeToken");
  // Route.post("empty_all", "SeedController.empty_all");
})
  .prefix(prfx)
  .middleware("auth");
