import firebase from '../config/firebase'

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


    firebase.database()
      .ref('messages')
      .on('value', (snapshot) => {
        const messages = snapshot.val() || [];
        let newMessages = []
        Object.values(messages).forEach(msg => newMessages.push(msg));
        dispatch({
                type: types.ALL_CHAT_MESSAGES,
                payload: {
                  loading: false,
                  error: false,
                  result: handleMassages(newMessages)
                }
        })
      } )

    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => alert('OK'))


    // setTimeout (() => {
    //   // check for server error
    //   if (true) {
    //     let messages = [
    //         {
    //             id: '7',
    //             message: 'I think',
    //             user: {
    //                 name: 'Bob(me)',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
    //                 isMe: true,
    //             }
    //         },
    //        {
    //             id: '6',
    //             message: 'No problem!',
    //             user: {
    //                 name: 'Bob(me)',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
    //                 isMe: true,
    //             }
    //         },
    //         {
    //             id: '5',
    //             message: 'Yes!!!',
    //             user: {
    //                 name: 'Bob(me)',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
    //                 isMe: true,
    //             }
    //         },

    //         {
    //             id: '4',
    //             message: 'I want to tell you something)))',
    //             user: {
    //                 name: 'Kelly',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
    //                 isMe: false,
    //             }
    //         },

    //       {
    //             id: '3',
    //             message: 'How are you?',
    //             user: {
    //                 name: 'Kelly',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
    //                 isMe: false,
    //             }
    //         },

    //         {
    //             id: '2',
    //             message: 'Hi!!!',
    //             user: {
    //                 name: 'Bob(me)',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
    //                 isMe: true,
    //             }
    //         },

    //         {
    //             id: '1',
    //             message: 'Hello',
    //             user: {
    //                 name: 'Kelly',
    //                 avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
    //                 isMe: false,
    //             }
    //         },
    //        ]
    //     dispatch({
    //       type: types.ALL_CHAT_MESSAGES,
    //       payload: {
    //         loading: false,
    //         error: false,
    //         result: handleMassages(messages)
    //       }
    //     });
    //   } else {
    //     //error
    //     dispatch({
    //       type: types.ALL_CHAT_MESSAGES,
    //       payload: {
    //         loading: false,
    //         error: true
    //       }
    //     });
    //   }
    // }, 2000)
  },

  sendNewMessage: (message, messages) => async(dispatch, getState) => {
    const randomId = (Math.floor(Math.random() * 100) + 1).toString();
    const messageTest = {
      id: randomId ,
      message: message,
      sent_time: (new Date).getTime(),
      user: {
        name: "Bob(me)",
        avatar: "https://randomuser.me/api/portraits/thumb/men/54.jpg",
        isMe: true
      }
    };
    

        const newMsgRef = firebase
          .database()
          .ref("messages")
          .push();
        messageTest.id = newMsgRef.key;
        // alert("randomId -> " + randomId + "    idNew -> " + messageTest.id);
        newMsgRef.set(messageTest); 

        dispatch({
           type: types.ALL_CHAT_MESSAGES,
           payload: {
             loading: false,
             error: false,
             result: handleMassages([messageTest, ...messages])
           }
         });    
  },

  deleteAllMessages: () => async(dispatch, getState) => {
       dispatch({
         type: types.ALL_CHAT_MESSAGES,
         payload: {
           loading: true,
           error: false
         }
       });

   setTimeout(() => {
       dispatch({
         type: types.ALL_CHAT_MESSAGES,
         payload: {
           loading: false,
           error: false,
           result: []
         }
       });
   }, 1000);
  },

  selectMessage: (messageId, messages) => {
        let updatedMessages = messages.map(
          mes => (mes.id === messageId) ? {...mes, isSelected: !mes.isSelected} : mes
        )
       return {
         type: types.ALL_CHAT_MESSAGES,
         payload: {
           loading: false,
           error: false,
           result: [...updatedMessages]
         }
       };
  },

  deleteSelectedMessages: (messages) => async(dispatch, getState) => {
    let clearedArray = []
    for(let mes of messages) {
      if(!mes.isSelected) {
        clearedArray.push(mes)
      }
    }
    dispatch({
      type: types.ALL_CHAT_MESSAGES,
      payload: {
        loading: false,
        error: false,
        result: handleMassages(clearedArray)
      }
    });
  }
}

function handleMassages(messages) {
    messages.sort((a, b) => {
      return parseInt(b.sent_time) - parseInt(a.sent_time);
    })

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
