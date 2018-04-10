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
                user: {
                    name: 'Alex'
                }
            },
            {
                id: '2',
                user: {
                    name: 'Kelly'
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