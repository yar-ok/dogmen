export const types = { GET_USERS: "GET_USERS" };

export const actionCreators = { 
  getAllUsers: (page, users) => async (dispatch, getState) => {
           let url = `https://randomuser.me/api/?seed=${1}&page=${page}&results=20`;
           dispatch({
             type: types.GET_USERS,
             payload: {
               result: users,
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
                   result: page === 1 ? res.results : [...users, ...res.results],
                   loading: false,
                   error: res.error || null
                 }
               });
             })
             .catch(error => {
               dispatch({
                 type: types.GET_USERS,
                 payload: {
                   result: users,
                   loading: false,
                   error: true
                 }
               });
             });
         },
         updateUsersStore: (rowData, rowMap, users) => async(dispatch, getState) => {
           setTimeout(() => {
            	const newData = [...users];
              const prevIndex = users.findIndex(item => item.email === rowData.item.email);
              newData.splice(prevIndex, 1);
              dispatch({
                type: types.GET_USERS,
                payload: {
                  result: newData,
                  loading: false,
                  error: null
                }
              });
           }, 250)
         } };
