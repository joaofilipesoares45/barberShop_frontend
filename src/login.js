import { login } from "./code/methods.js"

document.body.onload = () => {
    if (localStorage.CurrentUser !== undefined) {
        window.location = 'index.html'
    }
}

document.querySelector('main').onclick = (e) => {
    const target = e.target

    if (target.tagName === 'A') {
        document.querySelectorAll('div.log-div').forEach(div => div.removeAttribute('open'))
        document.querySelector(target.getAttribute('href')).setAttribute('open', '')
    }

    if (target.tagName === 'I') {
        switch (target.classList[1]) {
            case 'fa-eye':
                target.classList.remove('fa-eye')
                target.classList.add('fa-eye-slash')
                target.parentElement.querySelector('input').type = 'text'
                break;

            case 'fa-eye-slash':
                target.classList.remove('fa-eye-slash')
                target.classList.add('fa-eye')
                target.parentElement.querySelector('input').type = 'password'
                break;
        }
    }

    if (target.tagName === 'DIV' && target.classList[0] === 'open-pass') {
        if (target.hasAttribute('active')) {
            target.removeAttribute('active')
            document.querySelectorAll('.input-div').forEach(div => {
                div.removeAttribute('open')
                div.querySelector('input').value = ''
            })
        } else {
            target.setAttribute('active', '')
            document.querySelectorAll('.input-div').forEach(div => div.setAttribute('open', ''))
        }
    }

    if (target.tagName === 'BUTTON') {
        const form = target.parentElement.querySelectorAll('input')
        login(form, target.parentElement.getAttribute('type'))
    }

}

