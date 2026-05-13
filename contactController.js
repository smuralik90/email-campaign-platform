const pool = require("../config/db");

const fs = require("fs");

const csv = require("csv-parser");


// =========================
// ADD CONTACT
// =========================
const addContact = async (req, res) => {

  try {

    const {
      email,
      first_name,
      last_name,
      phone,
      status,
      source,
    } = req.body;

    const existing = await pool.query(
      "SELECT * FROM contacts WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {

      return res.status(400).json({
        message: "Contact already exists",
      });

    }

    const result = await pool.query(
      `
      INSERT INTO contacts
      (
        email,
        first_name,
        last_name,
        phone,
        status,
        source
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        email,
        first_name,
        last_name,
        phone || "",
        status || "active",
        source || "manual",
      ]
    );

    res.status(201).json({
      message: "Contact added successfully",
      contact: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// =========================
// GET CONTACTS
// =========================
const getContacts = async (req, res) => {

  try {

    const { search } = req.query;

    let query =
      "SELECT * FROM contacts";

    let values = [];

    if (search) {

      query += `
      WHERE
      email ILIKE $1
      OR first_name ILIKE $1
      OR last_name ILIKE $1
      `;

      values.push(`%${search}%`);

    }

    query += " ORDER BY id DESC";

    const result =
      await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// =========================
// GET SINGLE CONTACT
// =========================
const getContact = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM contacts WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// =========================
// DELETE CONTACT
// =========================
const deleteContact = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM contacts WHERE id=$1",
      [id]
    );

    res.json({
      message: "Contact deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// =========================
// IMPORT CSV
// =========================
const importCSV = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (data) => {

        results.push(data);

      })

      .on("end", async () => {

        let added = 0;

        let skipped = 0;

        for (const row of results) {

          const existing =
            await pool.query(
              "SELECT * FROM contacts WHERE email=$1",
              [row.email]
            );

          if (existing.rows.length > 0) {

            skipped++;

            continue;

          }

          await pool.query(
            `
            INSERT INTO contacts
            (
              email,
              first_name,
              last_name,
              phone,
              status,
              source
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            `,
            [
              row.email,
              row.first_name || "",
              row.last_name || "",
              row.phone || "",
              "active",
              "csv_import",
            ]
          );

          added++;

        }

        fs.unlinkSync(req.file.path);

        res.json({
          message: "CSV Imported Successfully",
          total: results.length,
          added,
          skipped,
        });

      });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};
const getContactEvents = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM email_events
      WHERE contact_id = $1
      ORDER BY occurred_at DESC
      `,
      [id]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

const bulkDeleteContacts =
async (req, res) => {

  try {

    const { ids } = req.body;

    await pool.query(
      `
      DELETE FROM contacts
      WHERE id = ANY($1)
      `,
      [ids]
    );

    res.json({
      message:
        "Contacts deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

const createSegment =
async (req, res) => {

  try {

    const { name, rules } =
      req.body;

    const result =
      await pool.query(
        `
        INSERT INTO segments
        (name, rules)
        VALUES ($1,$2)
        RETURNING *
        `,
        [name, rules]
      );

    res.status(201).json({
      message:
        "Segment created",
      segment:
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
  addContact,
  getContacts,
  getContact,
  deleteContact,
  importCSV,
  getContactEvents,
  bulkDeleteContacts,
  createSegment,
};