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
                id: '1',
                message: 'Hello',
                user: {
                    name: 'Kelly',
                    isMe: false,
                }
            },
            {
                id: '2',
                message: 'Hi!!!',
                user: {
                    name: 'Alex',
                    isMe: true,
                }
            },
            {
                id: '3',
                message: 'How are you?',
                user: {
                    name: 'Kelly',
                    isMe: false,
                }
            },
            {
                id: '4',
                message: 'I want to tell you something)))',
                user: {
                    name: 'Kelly',
                    isMe: false,
                }
            }

        ]
        dispatch({
          type: types.ALL_CHAT_MESSAGES,
          payload: {
            loading: false,
            error: false,
            result: messages
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
    }, 2000)
  }
}