export const types = { GET_USERS: "GET_USERS" };

export const actionCreators = {
    getAllUsers: (page, users) => async(dispatch, getState) => {
        let url = `https://randomuser.me/api/?seed=${1}&page=${page}&results=20`;
        dispatch({
            type: types.GET_USERS,
            payload: {
              result: users,
                loading: true,
                error: false
            }
        });

//------------------
        // if (page > 1) {
        //   return
        // }
        //------------------
        setTimeout (() => {
       fetch(url)
            .then(res => res.json())
            .then(res => {
              dispatch({
                type: types.GET_USERS,
                payload: {
                  result: [...users, ...res.results],
                  loading: false,
                  error: res.error || null
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
          }, 2000);
    }
}
