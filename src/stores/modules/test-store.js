export default {
 state : {
    storeUser: 'hello người ae'
  },
  
   getters : {
    getStoreUser(state) {
      return state.storeUser
    },
  },
  
   mutations : {
    setStoreUser: function (state, newStoreUser) {
      state.storeUser = newStoreUser
    },
  }
}