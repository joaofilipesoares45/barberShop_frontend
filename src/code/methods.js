const apiconnect = async (type, path, body) => {
    const apiUrl = `http://127.0.0.1:5001/${path}`

    let headers
    switch (type) {
        case 'get':
            headers = {

            }
            break;
        case 'post':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(body)
            }
            break;
        case 'delete':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(body)
            }
            break
    }

    return await fetch(apiUrl, headers)
}

const login = async (form, type) => {
    apiconnect('get', 'users')
        .then(res => res.json())
        .then(data => {
            if (type === 'create-acount') {
                if (form[0].value.length !== 0 && form[1].value.length !== 0 && (form[2].value.length !== 0 || form[3].value.length !== 0) && form[4].value.length !== 0) {
                    newUser(form, data)
                }
            }

            if (type === 'login') {
                if (form[0].value.length !== 0) {
                    logUser(form, data)
                }
            }
        })
}

const newUser = async (form, listUsers) => {

    let exist = false
    listUsers.forEach(user => {
        if (user.email === form[1].value) {
            exist = true
        }
    });

    if (exist === false) {
        const user = {
            nome: form[0].value,
            email: form[1].value,
            tipo: 'cliente',
            cpf: '112.434.212.01',
            Telefone1: form[2].value,
            Telefone2: form[3].value
        }

        if (document.querySelector('.open-pass').hasAttribute('active')) {
            // user.cpf = form[4].value
            // user.senha = form[5].value
            user.tipo = 'empresa'
        }

        const date = new Date()

        const dateString = `${date.toLocaleDateString().split('/').reverse()[0]}-${date.toLocaleDateString().split('/').reverse()[1]}-${date.toLocaleDateString().split('/').reverse()[2]}`
        user.dataCadastro = dateString

        console.log(user);

        document.body.removeAttribute('load')
        apiconnect('post', 'new-user', user).then(() => {
            setTimeout(() => {
                document.body.setAttribute('load', '')
            }, 1500)
        })
    } else {
        document.querySelectorAll('main h4')[3].setAttribute('wrong', 'email já cadastrado!')
        setTimeout(() => {
            document.querySelectorAll('main h4')[3].removeAttribute('wrong')
        }, 5000)
    }
}

const logUser = async (form, listUsers) => {
    let user
    listUsers.forEach(element => {
        if (element.email === form[0].value) {
            user = element
        } else {
            document.querySelectorAll('main h4')[0].setAttribute('wrong', 'Usuário não existe!')
            setTimeout(() => {
                document.querySelectorAll('main h4')[0].removeAttribute('wrong')
            }, 5000)
        }
    })

    if (document.querySelector('.open-pass').hasAttribute('active')) {
        if (form[1].value === user.senha) {
            localStorage.CurrentUser = JSON.stringify(user)
            window.location = 'index.html'
        } else {
            document.querySelectorAll('main h4')[1].setAttribute('wrong', 'senha incorreta!')
            setTimeout(() => {
                document.querySelectorAll('main h4')[1].removeAttribute('wrong')
            }, 5000)
        }
    } else {
        localStorage.CurrentUser = JSON.stringify(user)
        window.location = 'index.html'
    }
}

const newService = async (form) => {
    let service
    if (form !== undefined) {
        service = {
            nome: form[0].value,
            valor: form[1].value,
            duracao: form[2].value,
            foto: form[3].value,
            idEmpresa: form[4].value,
        }
    }else{
        service = {
            nome: 'Corte social',
            valor: 18,
            duracao: 40,
            foto: 'foto.png',
            idEmpresa: 16,
        }
    }

    apiconnect('post', 'new-service', service)
}

export { login, apiconnect, newService }
