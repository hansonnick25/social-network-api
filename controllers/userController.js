const { User, Thought } = require('../models')

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-__v')
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { users: req.params.username },
      { $pull: { users: req.params.username } },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId })
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    await Thought.deleteMany({ username: user.username })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
}
