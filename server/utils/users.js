[
  {
    id: "wqsdfasdfadf",
    name: "Andrew",
    room: "The Office fans",
  },
];

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room, url) {
    var user = { id, name, room, url };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var deletedUser = this.users.filter((user) => user.id === id);

    if (deletedUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return deletedUser[0];
  }

  getUser(id) {
    var user = this.users.filter((user) => user.id === id);
    return user[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user);
    return namesArray;
  }
}
module.exports = { Users };
