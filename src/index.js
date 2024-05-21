import { apiconnect } from "./code/methods.js";

const getData = async () => {
    return await apiconnect('get', 'database')
        .then(data => {
            console.clear()
            document.body.setAttribute('load', '')
            return data
        }).catch(error => {
            getData()
            console.clear()
            console.log('Sem conexão ao servidor!')
        })
}

document.body.onload = () => {
    if (localStorage.CurrentUser === undefined) {
        window.location = `login.html`
    }else{
        if (JSON.parse(localStorage.CurrentUser).tipo !== 'cliente') {
            // document.body.removeChild(document.querySelector('#client-sect'))
        }
    }
    getData()
}

document.body.onclick = async (e) => {
    const target = e.target
    
    if (target.tagName === 'I' && target.id === 'log-out') {
        localStorage.removeItem('CurrentUser')
        window.location = `login.html?cpy=${localStorage.cpy}`
    }

    if (target.classList[1] === 'fa-trash') {
        const id = JSON.parse(localStorage.CurrentUser).id
        console.log(id);
        apiconnect('delete', 'remove-user', {id: id})
        localStorage.removeItem('CurrentUser')
        window.location = `login.html?cpy=${localStorage.cpy}`
    }
}