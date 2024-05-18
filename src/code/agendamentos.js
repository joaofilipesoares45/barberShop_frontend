const getAgendamentos = (agendamentos, date) => {
    console.log(agendamentos);
    document.querySelector('.agend-div').setAttribute('day', date.join('/'))
}

export { getAgendamentos }