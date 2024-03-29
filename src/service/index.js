import Axios from 'axios';
import Vue from 'vue'

const api = Axios.create({
  baseURL: 'https://leaf-backend.onrender.com/api'
})

const api2 = Axios.create({
  baseURL: 'https://ws.apicep.com/cep/'
})

const logout = () => {
  localStorage.clear()
  window.location.reload()
}

Object.defineProperty(api, 'logout', {
  get() {
    return logout
  }
})

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("application-token");

    const headers = {
      "Authorization": `Bearer ${token}`
    };
    config.headers = headers;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    api.logout()
  }
  return Promise.reject(error);
});


Vue.use({
  install(Vue) {
    Vue.prototype.$axios = api
    Vue.prototype.$axios2 = api2
  }
})
