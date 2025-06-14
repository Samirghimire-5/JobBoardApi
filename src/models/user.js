const knex = require("../db/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || "job_seeker";
    this.created_at = user.created_at || new Date();
  }

  static async Register(user) {
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
        created_at: new Date(),
      });

      // console.log("New user registered:", newUser);

      return { status: 201, message: "User registered successfully" };
    } catch (error) {
      console.error("Error registering user:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  static async Login(credientials) {
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

      const token = jwt.sign({ id: doesUserExist.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return { status: 200, message: "Login successful", token };

    } catch (error) {
      console.error("Error logging in:", error);
      return { status: 500, message: "Internal server error" };
    }
  }
};
