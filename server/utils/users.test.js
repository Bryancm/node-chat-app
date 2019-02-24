const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Bryan",
        room: "Node Course"
      },
      {
        id: "2",
        name: "Andrew",
        room: "React Course"
      },
      {
        id: "3",
        name: "Mike",
        room: "Node Course"
      }
    ];
  });
  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Bryan",
      room: "The office fans"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove user", () => {
    var deletedUser = users.removeUser('1')
    expect(deletedUser.id).toEqual('1');
    expect(users.users.length).toBe(2)
  });

  it("should not remove user", () => {
    var deletedUser = users.removeUser('123')
    expect(deletedUser).toEqual(undefined);
  });

  it("should find user", () => {
    var user = users.getUser('2')
    expect(user).toEqual(users.users[1]);
  });

  it("should not find user", () => {
    var user = users.getUser('123')
    expect(user).toEqual(undefined);
  });

  it("should return names for node course", () => {
    var userList = users.getUserList('Node Course')
    
    expect(userList).toEqual(['Bryan','Mike']);
  });

  it("should return names for react course", () => {
    var userList = users.getUserList('React Course')
    
    expect(userList).toEqual(['Andrew']);
  });

});
