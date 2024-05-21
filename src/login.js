import { apiconnect, login } from "./code/methods.js"

document.body.onload = async () => {
    if (localStorage.cpy === undefined) {
        localStorage.cpy = JSON.stringify(Number(window.location.href.split('?cpy=')[1]))
    }
    if (localStorage.CurrentUser !== undefined) {
        window.location = `index.html`
    }
    console.log(await apiconnect('get', 'users'))
}

document.querySelector('main').onclick = (e) => {
    const target = e.target

    if (target.tagName === 'A') {
        e.preventDefault()
        document.querySelectorAll('div.log-div').forEach(div => div.removeAttribute('open'))
        document.querySelector(target.getAttribute('href')).setAttribute('open', '')
    }

    if (target.tagName === 'I') {
        switch (target.classList[1]) {
            case 'fa-eye':
                target.classList.remove('fa-eye')
                target.classList.add('fa-eye-slash')
                target.parentElement.querySelector('input[name="senha"]').type = 'text'
                break;

            case 'fa-eye-slash':
                target.classList.remove('fa-eye-slash')
                target.classList.add('fa-eye')
                target.parentElement.querySelector('input[name="senha"]').type = 'password'
                break;
        }
    }

    if (target.tagName === 'DIV' && target.classList[0] === 'open-pass') {
        if (target.hasAttribute('active')) {
            target.removeAttribute('active')
            document.querySelectorAll('.emp-inputs').forEach(div => {
                div.removeAttribute('open')
            })
            document.querySelectorAll('.cli-inputs').forEach(div => div.setAttribute('open', ''))
        } else {
            target.setAttribute('active', '')
            document.querySelectorAll('.emp-inputs').forEach(div => div.setAttribute('open', ''))
            document.querySelectorAll('.cli-inputs').forEach(div => div.removeAttribute('open', ''))
        }
    }

    if (target.tagName === 'BUTTON') {
        const form = target.parentElement.querySelectorAll('input')
        login(form, target.parentElement.getAttribute('type'))
    }
}

document.querySelectorAll('input').forEach(input => {
    input.onblur = (e) => {
        const target = e.target

        if (target.getAttribute('name') === 'cpf' && target.value.length === 11) {
            let cpfFormatado = target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
                function (regex, argumento1, argumento2, argumento3, argumento4) {
                    return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
                })

            target.value = cpfFormatado;
        }

        if (target.getAttribute('name') === 'telefone1' || target.getAttribute('name') === 'telefone2') {
            let telFormatado = target.value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/,
                function (regex, argumento1, argumento2, argumento3, argumento4) {
                    return `(${argumento1}) ${argumento2} ${argumento3}-${argumento4}`;
                })

            target.value = telFormatado;
        }
    }
})

