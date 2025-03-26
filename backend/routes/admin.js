// const express = require('express');
// const Meal = require('../models/meal');
// const { validateAdminCredentials } = require('../middleware/auth');
// const router = express.Router();

// router.get('/', validateAdminCredentials, async (req, res) => {
//   try {
//     const meals = await Meal.find();
//     res.json({ message: 'Admin access granted', meals });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const Meal = require("../models/meal");
const { validateAdminJWT } = require("../middleware/auth");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    console.log('it works')
      return res.redirect("/"); // Redirect to home page if no token
  }
  next();
});

// Protected admin route - Requires JWT
router.get("/meals", validateAdminJWT, async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json({ message: "Admin access granted", meals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
