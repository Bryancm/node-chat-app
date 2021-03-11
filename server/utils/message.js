const moment = require("moment");
const { Message } = require("../db/models/message");

var generateMessage = async (from, text, userId, url, room) => {
  try {
    const message = new Message({
      from,
      text,
      createdAt: moment().valueOf(),
      userId,
      url,
      room,
    });
    const m = await message.save();
    return m;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getMessageList = async (room) => {
  try {
    const messages = await Message.find({ room });
    return messages;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = { generateMessage, getMessageList };
