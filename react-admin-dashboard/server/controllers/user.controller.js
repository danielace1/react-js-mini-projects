const { readJsonFile, writeJsonFile } = require("../utils/fileUtils");

const getAllUsers = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const users = data.users || [];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedUsers = users.slice((page - 1) * limit, page * limit);
    const totalUsers = users.length;

    res.json({
      data: paginatedUsers,
      total: totalUsers,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
};
const getUserById = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const users = data.users || [];
    const user = users.find((u) => u.id == req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Error reading database file");
  }
};

const createUser = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const users = data.users || [];

    const newUser = req.body;
    newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push(newUser);
    data.users = users;

    await writeJsonFile("db.json", data);

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error writing to JSON file:", err);
    res.status(500).send("Error writing to database file");
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const users = data.users || [];

    const userIndex = users.findIndex((u) => u.id == req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    await writeJsonFile("db.json", { ...data, users });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const users = data.users || [];

    const userIndex = users.findIndex((u) => u.id == req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    users.splice(userIndex, 1);

    await writeJsonFile("db.json", { users });

    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
