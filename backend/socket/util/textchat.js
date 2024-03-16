const { v4: uuidv4 } = require("uuid");

const textChatUserSocketMap = {
  textChatUsers: [],
  setTextChatUsers: function (newUsersArray) {
    this.textChatUsers = newUsersArray;
  },
};

function createUniqueRoom() {
  return uuidv4(); // Simply return the generated UUID
}

function getRandomPerson(id) {
  const users = textChatUserSocketMap.textChatUsers.filter(user => user.socket.id !== id && user.room !== null);
  if (users.length === 0) return null; // Return null if there are no users after filtering
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex]; // Return a random user from the filtered list
}

function textChatactivateUser(socket, name, avatar, room) {
  const user = { socket, name , avatar, room};
  textChatUserSocketMap.setTextChatUsers([
    ...textChatUserSocketMap.textChatUsers.filter((u) => u.socket.id !== socket.id),
    user,
  ]);
  return user;
}

function textChatUserLeavesApp(id) {
  textChatUserSocketMap.setTextChatUsers(
    textChatUserSocketMap.textChatUsers.filter((u) => u.socket.id !== id)
  );
}

function textChatUserLeavesRoom(id) {
  // remove the id from the array
  textChatUserSocketMap.setTextChatUsers(
    textChatUserSocketMap.textChatUsers.filter((u) => u.socket.id !== id)
  );
}

function textChatUserRequeue(id) {
  // set the room attribute to null 
  textChatUserSocketMap.setTextChatUsers(
    textChatUserSocketMap.textChatUsers.map((u) => {
      if (u.socket.id === id) {
        return { ...u, room: null };
      }
      return u;
    })
  );
}

function textChatgetUser(id) {
  return textChatUserSocketMap.textChatUsers.find((u) => u.socket.id === id);
}

function textChatgetAllActiveRooms() {
  return Array.from(
    new Set(textChatUserSocketMap.textChatUsers.map((u) => u.room))
  );
}

const textChatgetReceiverSocketId = (receiverId) => {
  const user = textChatUserSocketMap.textChatUsers.find(
    (u) => u.socket.id === receiverId
  );
  return user ? user.socket.id : null; // Return null if the receiver ID is not found
};

function updateTextChatUser(room, id) {
  const updatedUsers = textChatUserSocketMap.textChatUsers.map(user => {
    if (user.socket.id === id) {
      return { ...user, room };
    }
    return user;
  });
  textChatUserSocketMap.setTextChatUsers(updatedUsers);
}

function findTextChatUser(room, id) {
  return textChatUserSocketMap.textChatUsers.find(u => u.room === room && u.socket.id !== id);
}

module.exports = {
  textChatactivateUser,
  textChatUserLeavesApp,
  textChatUserLeavesRoom,
  textChatUserRequeue,
  textChatgetUser,
  textChatgetAllActiveRooms,
  textChatgetReceiverSocketId,
  updateTextChatUser,
  createUniqueRoom,
  getRandomPerson,
  findTextChatUser // Include the findTextChatUser function in the exports
};
