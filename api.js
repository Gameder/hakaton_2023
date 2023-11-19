function auth(token) {
  let req = fetch('https://api.weeek.net/public/v1/user/me', {
  headers: {Authorization: 'Bearer ' + token}
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.success) {
        localStorage.setItem("token", token)
        return true
      }
      else {
        return false
      }
    })
    return req
}

function ifAuth(){
  if (localStorage.getItem("token") !== null) {
    return true
  }
  else {
    return false
  }
}

async function get_user() { 
  var out
  if (localStorage.getItem("token") !== null) {
    let token =localStorage.getItem("token")
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

async function getProjects() {
  if (ifAuth()) {
    let token = localStorage.getItem("token")
    let res = fetch('https://api.weeek.net/public/v1/tm/projects', {
      headers: {Authorization: 'Bearer ' + token}
        }).then(res =>  res.json()).then( json => {
      if (json.success === true) {
        return json.projects
      }
      console.log(json)
      }
    )
    return res
  } else {
    return "unauth"
  }
}

async function createTask(title, desc, day, projectId, type, priority) {
  let inp = {
    title: title,
    description: desc,
    projectId: projectId,
    type: type,
    priority: priority,
    day: day
  }
  let response = await fetch('https://api.weeek.net/public/v1/tm/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(inp)
  }).then(res => res.json());
  console.log(response)
  return response
  
}

async function closeTask(id) {
  let url = `https://api.weeek.net/public/v1/tm/tasks/${id}/complete`
  let resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then(res => console.log(res.json()))
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
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
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

export {auth, get_user, getTasks, ifAuth, getProjects, createTask, closeTask}