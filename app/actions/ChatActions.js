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
                id: '2',
                message: 'Hello',
                user: {
                    name: 'Kelly',
                    isMe: false,
                }
            },
            // {
            //     id: '1',
            //     message: 'Hi!!!',
            //     user: {
            //         name: 'Alex',
            //         isMe: true,
            //     }
            // },
            // {
            //     id: '2',
            //     message: 'How are you?',
            //     user: {
            //         name: 'Kelly',
            //         isMe: false,
            //     }
            // }
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