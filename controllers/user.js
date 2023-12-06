const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.getAllUser = (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) =>
      res.status(404).json({ message: "User not found", error: err.message }),
    );
};

exports.singinUser = (req, res) => {
  const { email, password } = req.body; // Assuming email and password are sent in the request body

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (password === user.password) return res.json({ id: user._id });
      else res.status(401).json({ message: "Incorrect password!" });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error finding user", error: err.message }),
    );
};
// exports.signinUser = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email })
//     .then(async (user) => {
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       try {
//         const match = await bcrypt.compare(password, user.password);

//         if (match) {
//           return res.json({ id: user._id });
//         } else {
//           return res.status(401).json({ message: "Incorrect password!" });
//         }
//       } catch (err) {
//         return res.status(500).json({ message: "Error comparing passwords", error: err.message });
//       }
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "Error finding user", error: err.message }),
//     );
// };

exports.postCreateUser = (req, res) => {
  User.create(req.body)
    .then((data) => res.json({ message: "User added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add user", error: err.message }),
    );
};

// exports.postCreateUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Create a new user if the email doesn't exist
//     const newUser = await User.create({ email, password });

//     return res.json({ message: 'User added successfully', data: newUser });
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to add user', error: error.message });
//   }
// };
// exports.postCreateUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

//     // Create a new user with the hashed password
//     const newUser = await User.create({ email, password: hashedPassword });

//     return res.json({ message: 'User added successfully', data: newUser });
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to add user', error: error.message });
//   }
// };
exports.postCreateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

    // Create a new user with the hashed password
    const newUser = await User.create({ email, password: hashedPassword });

    return res.json({ message: 'User added successfully', data: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};

exports.putUpdateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update user", error: err.message }),
    );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => res.json({ message: "user deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message }),
    );
};
