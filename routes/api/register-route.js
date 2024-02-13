const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('register');
});

// router.post('/', (req, res) => {        // works without auth
//   // create a new user
//   User.create({
//     username: req.body.username,
//     password: req.body.password,
//  })
//    .then((userData) => res.status(200).json(userData))
//    .catch((err) => res.status(500).json(err));
// });

// Register a new user
// router.post('/', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//       const existingUser = await User.findOne({ where: { username } });

//       if (existingUser) {
//         return res.status(400).json({ error: 'Username already in use' });
//       }

//       const hashedPassword = await bcrypt.hash(
//         password,
//         saltRounds,
//         async (err, hash) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//           }
//           return hash;
//         }
//       );
//       const newUser = await User.create({
//         username,
//         password: hashedPassword,
//       });

//       // Log the user in after registration if needed
//       req.login(newUser, (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         return res.json(newUser);
//         // redirect to home/dashboard???? here??????????????????????????????????????
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      try {
        const newUser = await User.create({
          username,
          password: hashedPassword,
        });

        // Log the user in after registration if needed
        return req.login(newUser, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          return res.json(newUser);
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
