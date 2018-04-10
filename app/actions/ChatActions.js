export const types = {
    ALL_CHAT_MESSAGES: 'ALL_CHAT_MESSAGES'
}

export const actionCreators = {
  getAllChatMessages: () => async(dispatch, getState) => {
    dispatch({
      type: types.ALL_CHAT_MESSAGES,
      payload: {
        loading: true,
        error: false
      }
    });
    setTimeout (() => {
      // check for server error
      if (true) {
        let messages = [
            {
                id: '7',
                message: 'I think',
                user: {
                    name: 'Bob(me)',
                    avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
                    isMe: true,
                }
            },
           {
                id: '6',
                message: 'No problem!',
                user: {
                    name: 'Bob(me)',
                    avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
                    isMe: true,
                }
            },
            {
                id: '5',
                message: 'Yes!!!',
                user: {
                    name: 'Bob(me)',
                    avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
                    isMe: true,
                }
            },

            {
                id: '4',
                message: 'I want to tell you something)))',
                user: {
                    name: 'Kelly',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
                    isMe: false,
                }
            },
            
          {
                id: '3',
                message: 'How are you?',
                user: {
                    name: 'Kelly',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
                    isMe: false,
                }
            },
            
            {
                id: '2',
                message: 'Hi!!!',
                user: {
                    name: 'Bob(me)',
                    avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
                    isMe: true,
                }
            },

            {
                id: '1',
                message: 'Hello',
                user: {
                    name: 'Kelly',
                    avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
                    isMe: false,
                }
            },
           ]
        dispatch({
          type: types.ALL_CHAT_MESSAGES,
          payload: {
            loading: false,
            error: false,
            result: handleMassages(messages)
          }
        });
      } else {
        //error
        dispatch({
          type: types.ALL_CHAT_MESSAGES,
          payload: {
            loading: false,
            error: true
          }
        });
      }
    }, 1000)
  },
}

function handleMassages(messages) {
    let length = messages.length
    for (let i = 0; i < length; i++) {
      let isLastUserMessage = false;
      let message = messages[i];

      if(length === 1) {
        isLastUserMessage = true;
      } if (i === length - 1) {
        isLastUserMessage = true;
      } else {
        let nextMessage = messages[i + 1];
        isLastUserMessage = nextMessage.user.isMe !== message.user.isMe;
      }

      message.isLastUserMessage = isLastUserMessage;
    }
    return messages;
};

// function handleMassages(messages) {
//     let length = messages.length
//     for(let i = length - 1; i >= 0; i--) {
//         let isLastUserMessage = false
//         let message = messages[i]
    
//         if(i === length - 1) {
//             isLastUserMessage = true;
//         } else if(i === 0) {
//             let nextMessage = messages[i + 1]
//             isLastUserMessage = nextMessage.user.isMe !== message.user.isMe;
//         } else {
//             let nextMessage = messages[i + 1];
//             isLastUserMessage = nextMessage.user.isMe !== message.user.isMe;
//         }

//         message.isLastUserMessage = isLastUserMessage;
//     }
//     return messages;
// };
