const { User } = require("../db/models/user");

class Users {
  constructor() {
    this.users = [];
  }

  async addUser(id, name, room, url) {
    try {
      var user = new User({ id, name, room, url });
      const u = await user.save();
      return u;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async removeUser(id) {
    try {
      const u = await User.findOneAndDelete({ id });
      return u;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async getUser(id) {
    try {
      const u = await User.findOne({ id });
      return u;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async getUserList(room) {
    try {
      const users = await User.find({ room });
      return users;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
}
module.exports = { Users };
