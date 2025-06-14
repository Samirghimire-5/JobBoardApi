const knex = require("../db/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class User {
  // Uncomment the constructor if you want to create an instance function and initialize user properties
  // constructor(user) {
  //   this.id = user.id;
  //   this.name = user.name;
  //   this.email = user.email;
  //   this.password = user.password;
  //   this.role = user.role || "job_seeker";
  // }

  static async register(user) {
    try {
      const { name, email, password, role } = user;

      const existingUser = await knex("users").where({ email }).first();
      if (existingUser) {
        return { message: "User already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await knex("users").insert({
        name,
        email,
        password: hashedPassword,
        role: role || "job_seeker",
      });

      if (!newUser) {
        return { status: 500, message: "Failed to register user" };
      }
      // console.log("New user registered:", newUser);

      return { status: 201, message: "User registered successfully" };
    } catch (error) {
      console.error("Error registering user:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async login(credientials) {
    try {
      const { email, password } = credientials;

      const doesUserExist = await knex("users").where({ email }).first();
      if (!doesUserExist) {
        return { status: 404, message: "User not found" };
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        doesUserExist.password
      );

      if (!isPasswordMatch) {
        return { status: 401, message: "Invalid credentials" };
      }

      const token = jwt.sign({ id: doesUserExist.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      return { status: 200, message: "Login successful", token };

    } catch (error) {
      console.error("Error logging in:", error);
      return { status: 500, message: "Internal server error" };
    }
  }
};
