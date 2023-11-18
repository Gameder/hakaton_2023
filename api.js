function auth(token) {
  let req = fetch('https://api.weeek.net/public/v1/user/me', {
  headers: {Authorization: 'Bearer ' + token}
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.success) {
        Cookies.set('token', token)
        return [true, json.user]
      }
      else {
        return false
      }
    })
}

function ifAuth(){
  if ("token" in Cookies.get()) {
    return true
  }
  else {
    return false
  }
}

function get_user() { 
  var out
  if ("token" in Cookies.get()) {
    let token = Cookies.get('token')
    let res = fetch('https://api.weeek.net/public/v1/user/me', {
      headers: {Authorization: 'Bearer ' + token}
        })
    out = res.then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
  ).then(res => (res.status, res.data)))
    // console.log(out.id, out.email)
    return out
  }
  else {
    return "No token in cookies. User might not be logged in."
  }
}

async function getTasks(projectId='', indate='') { 
  if (ifAuth()) {
    if (indate === "today") {
      var date = new Date()
      indate = ""
      indate += date.getDate() + "."
      indate += date.getMonth() + "."
      indate += date.getFullYear()
        }
    
    var url = "https://api.weeek.net/public/v1/tm/tasks"
    var to_add = [projectId, indate].join('&')
    if (to_add !== "") {
      url = url + "?" + to_add
    }
    console.log(url)
    let res = fetch(url, {
      headers: {Authorization: 'Bearer ' + Cookies.get('token')}
        }).then(res => res.json()).then(json => json.tasks)
    return res
  }
  else {
    return "No token in cookies. User might not be logged in."
  }
}

console.log("Hello World")

// import {Cookies} from '@types/js-cookie'

// module.exports = {auth, testcookies }
// module.exports.auth = auth
// module.exports.testcookies = testcookies

export {auth, get_user, getTasks, ifAuth}