const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    test route
// @access  Private
// @Notes It goes through the auth middleware first then it finds the ID and adds it to req.user
router.get('/', auth, async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select('-password'); //the -password says not to get the password
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Password is required ').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'Invalid Credentials' }] });
      }

      // return webtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
