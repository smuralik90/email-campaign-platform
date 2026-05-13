const pool = require("../config/db");


// CREATE TEMPLATE
const createTemplate =
async (req, res) => {

  try {

    const {
      name,
      category,
      design,
      html,
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO templates
        (
          name,
          category,
          design,
          html
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          name,
          category,
          design,
          html,
        ]
      );

    res.status(201).json({
      message:
        "Template created",
      template:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// GET ALL TEMPLATES
const getTemplates =
async (req, res) => {

  try {

    const {
      search = "",
      category = "",
    } = req.query;

    let query = `
      SELECT *
      FROM templates
      WHERE 1=1
    `;

    let values = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND name ILIKE $${values.length}
      `;
    }

    if (category) {

      values.push(category);

      query += `
        AND category = $${values.length}
      `;
    }

    query += `
      ORDER BY id DESC
    `;

    const result =
      await pool.query(
        query,
        values
      );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// GET SINGLE TEMPLATE
const getTemplate =
async (req, res) => {

  try {

    const { id } = req.params;

    const result =
      await pool.query(
        `
        SELECT *
        FROM templates
        WHERE id=$1
        `,
        [id]
      );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// DUPLICATE TEMPLATE
const duplicateTemplate =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const existing =
      await pool.query(
        `
        SELECT *
        FROM templates
        WHERE id=$1
        `,
        [id]
      );

    const template =
      existing.rows[0];

    const result =
      await pool.query(
        `
        INSERT INTO templates
        (
          name,
          category,
          design,
          html
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          template.name + " Copy",
          template.category,
          template.design,
          template.html,
        ]
      );

    res.json({
      message:
        "Template duplicated",
      template:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


module.exports = {
  createTemplate,
  getTemplates,
  getTemplate,
  duplicateTemplate,
};