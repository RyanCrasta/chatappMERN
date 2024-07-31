export const getSender = (loggedUser, users) => {
  const user = users.find((u) => u._id !== loggedUser._id);
  return user;
};

export const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, message, index, userId) => {
  if (messages[index].sender._id === userId) {
    return "auto";
  } else if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id !== message.sender._id &&
    messages[index].sender._id !== userId
  ) {
    return "0px";
  } else if (
    index < messages.length - 1 &&
    messages[index].sender._id !== userId &&
    messages[index + 1].sender._id === message.sender._id
  ) {
    return "36px";
  }
};

export const isSameUser = (messages, message, index) => {
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
};
