const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
  
      const { name, email, password, role } = req.body;
  
      // Check existing user
      const userExists = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
  
      if (userExists.rows.length > 0) {
  
        return res.status(400).json({
          message: "User already exists",
        });
  
      }
  
      // Generate salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash password
      const password_hash = await bcrypt.hash(
        password,
        salt
      );
  
      // Insert user into database
      const newUser = await pool.query(
        `INSERT INTO users
        (name, email, password_hash, role)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [name, email, password_hash, role]
      );
  
      res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0],
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server error",
      });
  
    }
  };
  const login = async (req, res) => {

    try {
  
      const { email, password } = req.body;
  
      // Find user
      const userResult = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
  
      // User not found
      if (userResult.rows.length === 0) {
  
        return res.status(400).json({
          message: "Invalid credentials",
        });
  
      }
  
      const user = userResult.rows[0];
  
      // Compare password
      const isMatch = await bcrypt.compare(
        password,
        user.password_hash
      );
  
      // Wrong password
      if (!isMatch) {
  
        return res.status(400).json({
          message: "Invalid credentials",
        });
  
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
  
      res.json({
        message: "Login successful",
        token,
        user,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server error",
      });
  
    }
  };
  module.exports = {
    register,
    login,
  };