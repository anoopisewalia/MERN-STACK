import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Helper: Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

// ==================== USER LOGIN ====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);

      console.log("✅ User logged in successfully:");
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   User ID: ${user._id}`);
      console.log("------------------------------------------------");

      res.json({ success: true, token });
    } else {
      console.log(`❌ Failed login attempt for email: ${email} (wrong password)`);
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Login error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

// ==================== USER REGISTER ====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      console.log(`❌ Registration failed: Email already exists - ${email}`);
      return res.json({ success: false, message: "User already exists with this email" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    console.log("✅ New user registered successfully:");
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   User ID: ${user._id}`);
    console.log("------------------------------------------------");

    res.json({ success: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: "Error creating account" });
  }
};

// ==================== ADMIN LOGIN ====================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

      console.log("✅ Admin logged in successfully");
      console.log(`   Admin Email: ${email}`);
      console.log("------------------------------------------------");

      res.json({ success: true, token });
    } else {
      console.log("❌ Failed admin login attempt");
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.log("Admin login error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

// ==================== USER LOGOUT ====================
const logoutUser = async (req, res) => {
  try {
    // Note: With JWT, logout is typically handled on the frontend by removing the token.
    // This endpoint is optional but useful for logging and future extensions (e.g., token blacklisting).

    // If you have auth middleware, you can access req.userId or decoded token
    const userId = req.userId || "unknown"; // req.userId comes from auth middleware (if used)

    console.log("✅ User logged out successfully");
    console.log(`   User ID: ${userId}`);
    console.log("------------------------------------------------");

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.json({ success: false, message: "Logout failed" });
  }
};

export { loginUser, registerUser, adminLogin, logoutUser };