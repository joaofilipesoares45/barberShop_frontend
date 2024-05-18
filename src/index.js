import { apiconnect, newService } from "./code/methods.js";

let database 
const getData = async () => {
    apiconnect('get', 'database')
        .then(res => res.json())
        .then(data => {
            document.body.setAttribute('load', '')
            database = data
            console.log(data);
        }).catch(error => {
            getData()
            console.clear()
            console.log('Sem conexão ao servidor!')
        })
}

document.body.onload = () => {
    if (localStorage.CurrentUser === undefined) {
        window.location = 'login.html'
    }else{
        if (JSON.parse(localStorage.CurrentUser).tipo !== 'cliente') {
            document.body.removeChild(document.querySelector('#client-sect'))
        }
    }
    getData()
}

document.body.onclick = async (e) => {
    const target = e.target
    
    if (target.tagName === 'I' && target.id === 'log-out') {
        localStorage.removeItem('CurrentUser')
        window.location = 'index.html'
    }
}