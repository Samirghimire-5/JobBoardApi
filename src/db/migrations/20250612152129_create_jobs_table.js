/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("jobs", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("company").notNullable();
    table.string("location").notNullable();
    table.text("description").notNullable();
    table
      .enum("type", ["full_time", "part_time", "contract", "internship"])
      .notNullable()
      .defaultTo("full_time");
    table.integer("posted_by").unsigned().notNullable();
    table.dateTime("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable("jobs", function (table) {
    table
      .foreign("posted_by")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("jobs");
};
