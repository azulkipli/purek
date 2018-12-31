"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use("Factory");

// blueprint for User
Factory.blueprint("App/Models/User", faker => {
  const fname = faker.first();
  return {
    user_name: fname.toLowerCase(),
    full_name: fname + " " + faker.last(),
    mobile_phone: faker.phone({ mobile: true }),
    email: faker.email(),
    password: faker.ip()
  };
});

// blueprint for Link
Factory.blueprint("App/Models/Link", faker => {
  return {
    long_url: faker.avatar(),
    short_url: faker.string({
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      length: 6
    }),
    is_custom: faker.bool(),
    user_id: faker.integer({ min: 1, max: 8 }),
    ip: faker.ip()
  };
});
