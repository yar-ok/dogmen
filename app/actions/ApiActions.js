export const types = { GET_USERS: "GET_USERS" };

export const actionCreators = {
    getAllUsers: () => async(dispatch, getState) => {
        let url = `https://randomuser.me/api/?seed=${1}&page=${1}&results=20`;
        dispatch({
            type: types.GET_USERS,
            payload: {
                loading: true,
                error: false
            }
        });

        fetch(url)
          .then(res => res.json())
          .then(res => {
              dispatch({
                type: types.GET_USERS,
                payload: {
                    result: res.results,
                    loading: false,
                    error: res.error || null,
                }
              });
          })
          .catch(error => {
            dispatch({
              type: types.GET_USERS,
              payload: {
                loading: false,
                error: true
              }
            });
          });;
    }
}