const User = require("../models/User");
const bcrypt = require("bcrypt");
const { EncodeToken } = require("../utils/tokenHelper");

// Create User
exports.register = async (req, res) => {
  try {
    let { name, email, password, phoneNumber } = req.body;
    let user = await User.create({ name, email, password, phoneNumber });

    res.status(200).json({
      success: true,
      message: "User created Successfully",
      result: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong",
    });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not found",
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      let token = EncodeToken(user.email, user._id);

      let option = {
        maxAge: process.env.Cookie_Expire_time,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      //Set Cookie
      res.cookie("token", token, option);

      res.status(200).json({
        success: true,
        message: "Login success",
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong",
    });
  }
};

// Get user
exports.user = async (req, res) => {
  try {
    let email = req.headers.email;

    let matchStage = {
      $match: { email },
    };

    let project = {
      $project: {
        password: 0,
      },
    };

    let result = await User.aggregate([matchStage, project]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong",
    });
  }
};

// User logout
exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: true,
      message: "Logout success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong",
    });
  }
};

//User Update
exports.update = async (req, res) => {
  try {
    let { name, email, password, phoneNumber } = req.body;
    let userId = req.headers._id;

    let updatedData = { name, email, phoneNumber };

    if (password) {
      let hashPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashPassword;
    }

    let result = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Update Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong",
    });
  }
};
