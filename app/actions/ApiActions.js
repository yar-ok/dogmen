export const types = { GET_USERS: "GET_USERS" };

export const actionCreators = {
    getAllUsers: (page) => async(dispatch, getState) => {
        let url = `https://randomuser.me/api/?seed=${1}&page=${page}&results=20`;
        dispatch({
            type: types.GET_USERS,
            payload: {
                loading: true,
                error: false
            }
        });

        if (getState.users !== undefined) {
            alert("Size -> " + getState.users.length);
        }
         fetch(url)
            .then(res => res.json())
            .then(res => {
              dispatch({
                type: types.GET_USERS,
                payload: {
                  result:
                    page === 1
                      ? res.results
                      : [...getState.users, res.results],
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
    }
}