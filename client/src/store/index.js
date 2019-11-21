import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/server'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    detailPage: false,
    searching: '',
    question: [],
    singleQuestion: {
      article: {
        _id: '',
        title: '',
        user: {
          name: '',
          email: ''
        },
        upVote: [],
        downVote: [],
        description: '',
        createdAt: new Date()
      }
    },
    comments: [],
    userQuestion: []
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_QUESTION(state, payload) {
      state.question = payload
    },
    SHOW_DETAIL(state, payload) {
      state.detailPage = payload
    },
    SEARCH_ARTICLE(state, payload) {
      state.searching = payload
    },
    FETCH_DETAIL(state, payload) {
      state.singleQuestion = payload
    },
    SET_COMMENT(state, payload) {
      state.comments = payload
    },
    SET_USER_QUESTION(state, payload) {
      state.userQuestion = payload
    }
  },
  actions: {
    MARK_ANSWER({ commit }, payload) {
      return axios({
        url: `/articles/answer/${payload.params}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          id: payload.comment
        }
      })
    },
    UPVOTE(context, payload) {
      axios({
        url: `/articles/upvote/${payload.id}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          to: payload.email
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    DOWNVOTE(context, payload) {
      axios({
        url: `/articles/downvote/${payload}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    CREATE_COMMENT({ commit }, payload) {
      return axios({
        url: '/comments',
        method: 'POST',
        headers: {
          token: payload.token
        },
        data: {
          article: payload.article,
          description: payload.description
        }
      })
    },
    FIND_USER({ commit }) {
      return axios({
        url: `/users/${localStorage.getItem('token')}`,
        method: 'GET'
      })
    },
    FIND_USER_QUESTION({ commit }) {
      return axios({
        url: '/articles/users',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    FETCH_COMMENT({ commit }, payload) {
      axios({
        url: '/comments/' + payload,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('SET_COMMENT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    FETCH_DETAIL_QUESTION({ commit, dispatch }, payload) {
      axios({
        url: `/articles/${payload}`,
        method: 'GET'
      })
        .then(({ data }) => {
          router.push(`/article/${payload}`);
          commit('FETCH_DETAIL', data)
          commit('SHOW_DETAIL', true)
          dispatch('FETCH_COMMENT', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    FETCH_QUESTION({ commit }, payload) {
      let newest = ''
      if (payload == 'new') newest = '?date=newest'
      axios({
        url: `/articles${newest}`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    CREATE_QUESTION({ commit }, payload) {
      return axios({
        url: '/articles',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
    },
    DELETE_QUESTION({ commit }, payload) {
      axios({
        url: `/articles/${payload}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('success delete data')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
