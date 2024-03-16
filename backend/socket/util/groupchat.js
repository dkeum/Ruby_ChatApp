const userSocketMap = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

function buildMsg(name, message) {
  return JSON.stringify({
    name,
    message,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  });
}

function buildMsgWithAvatar(name, message, avatar) {
  return JSON.stringify({
    name,
    message,
    avatar,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  });
}

function activateUser(id, name, room) {
  const user = { id, name, room };
  userSocketMap.setUsers([
    ...userSocketMap.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
}

function userLeavesApp(id) {
  userSocketMap.setUsers(userSocketMap.users.filter((user) => user.id !== id));
}

function getUser(id) {
  return userSocketMap.users.find((user) => user.id === id);
}

function getUsersinRoom(room) {
  return userSocketMap.users.find((user) => user.room === room);
}

function getAllActiveRooms() {
  return Array.from(new Set(userSocketMap.users.map((user) => user.room)));
}

const getReceiverSocketId = (receiverId) => {
  const user = userSocketMap.users.find((user) => user.id === receiverId);
  if (user) {
    return user.id;
  } else {
    return null; // Return null if the receiver ID is not found
  }
};

module.exports = {
  buildMsg,
  buildMsgWithAvatar,
  activateUser,
  userLeavesApp,
  getUser,
  getUsersinRoom,
  getAllActiveRooms,
  getReceiverSocketId,
};
