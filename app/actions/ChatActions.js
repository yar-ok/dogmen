import firebase from '../config/firebase'
import moment from "moment";

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
      message.sentTime = getValidatedData(message.sent_time)
    }
    return messages;
};

function getValidatedData(startDate) {
  let endDate = new Date();
  if (true) {
    let different = parseInt(endDate.getTime() - startDate);
    let secondsInMilli = 1000;
    let minutesInMilli = secondsInMilli * 60;
    let hoursInMilli = minutesInMilli * 60;
    let daysInMilli = hoursInMilli * 24;

    let elapsedDays = Math.floor(different / daysInMilli);
    different = different % daysInMilli;

    let elapsedHours = Math.floor(different / hoursInMilli);
    different = different % hoursInMilli;

    let elapsedMinutes = Math.floor(different / minutesInMilli);
    different = different % minutesInMilli;

    let elapsedSeconds = Math.floor(different / secondsInMilli);

    let result = 0;
    if (elapsedDays > 23) {
      let date = new Date(startDate);
      result = moment(date).format("DD MMMM YYYY hh:mm");
    } else if (elapsedDays > 0) {
      result =
        elapsedDays +
        " days " +
        elapsedHours +
        " h " +
        elapsedMinutes +
        " min ago";
    } else if (elapsedHours > 0) {
      result =
        elapsedHours +
        " h " +
        elapsedMinutes +
        " min " +
        elapsedSeconds +
        " sec ago";
    } else if (elapsedMinutes > 0) {
      result = elapsedMinutes + " min " + elapsedSeconds + " sec ago";
    } else if (elapsedSeconds === 0) {
      result = "just now";
    } else {
      result = elapsedSeconds + " sec ago";
    }

    return result;
  }
  return "----";
}
