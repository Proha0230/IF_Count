import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    Count : 0,
    PerCount: 0.00001,
    InvestProcent: 0,
    TokenID: null,
    eMessage: null,
    rMessage: null,
    playerMail: null,
    menuOpen: false,
    arrayWithObjectUpgradesBtn: null,
    arrayWithObjectInvestBtn: null,
    loading: null,
    ObjectAllPlayer: null,
    ObjectOnePlayer: null
  },
  getters: {
    dollarCount(state){
      return state.Count
    },
    TokenIDAuth(state){
      return state.TokenID
    },
    PerCountInv(state){
      return state.PerCount + (state.PerCount * state.InvestProcent)
    }

  },
  mutations: {
  
  dollarPerClick(state){
    state.Count += (state.PerCount + (state.PerCount * state.InvestProcent))
  },
  
  async SaveProgress (state) {
    const str = JSON.stringify({
      Count: state.Count,
      PerCount: state.PerCount,
      playerMail: state.playerMail,
      InvestProcent: state.InvestProcent,
      UpgradesBtn: state.arrayWithObjectUpgradesBtn,
      PlayerId: state.TokenID,
      InvestBtn: state.arrayWithObjectInvestBtn,

    })
    await axios.patch(`https://if-count-default-rtdb.firebaseio.com/DataPlayer/${state.TokenID}.json`, str)
  },
  
  async LoadingRait (state){
    try{
    const {data} = await axios.get(`https://if-count-default-rtdb.firebaseio.com/DataPlayer.json`)
    state.ObjectAllPlayer = data
    } catch(e){}
    },
  
  async LoadOnePlayer (state, id){
    try{
    const {data} = await axios.get(`https://if-count-default-rtdb.firebaseio.com/DataPlayer/${id}.json`)
    state.ObjectOnePlayer = data
    } catch(e){}
    },

  },
  actions: {

  async Logout({state, commit}) {
    commit('SaveProgress')
    state.TokenID = null
    state.playerMail = null
    state.Count = 0
    state.PerCount = 0.00001
    state.menuOpen = false
    state.arrayWithObjectUpgradesBtn = null
    state.loading = null
    state.InvestProcent = 0
    state.arrayWithObjectInvestBtn = null

  }

  },
  modules: {
  }
})
