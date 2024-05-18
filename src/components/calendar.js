import { getAgendamentos } from "../code/agendamentos.js"
import { apiconnect } from "../code/methods.js"

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

const getFebDays = (year) => {
    return (isLeapYear(year) ? 29 : 28)
}

let calendar = document.querySelector('.calendar-div')
let month_picker = document.querySelector('#month-picker')
const month_names = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
let calendar_header_year = document.querySelector('.calendar-header #year')

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    calendar_days.innerHTML = ''

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()
    month_picker.innerHtml = month_names[month]
    calendar_header_year.innerHTML = year


    let first_day = new Date(year, month, 1)

    let delay = 10
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {

            delay += 10
            setTimeout(() => {
                day.setAttribute('active', '')
            }, delay)

            day.setAttribute('date', `${(i - first_day.getDay() + 1).toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}`)


            day.innerHTML = i - first_day.getDay() + 1

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');

                apiconnect('get', 'database').then(res => res.json())
                    .then(data => {
                        getAgendamentos(data.agenda, `${(i - first_day.getDay() + 1).toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}`.split('-'))
                    })
            }
        }
        calendar_days.appendChild(day)
    }
}

let currDate = new Date()
let curr_month = currDate.getMonth()
let curr_year = currDate.getFullYear()

month_picker.innerHTML = month_names[curr_month]
let month_list = document.querySelector('.month-list')
month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.id = index
    month_list.appendChild(month)
})

document.querySelector('body').addEventListener('click', (e) => {
    const target = e.target

    if (target.id === 'month-picker') {
        month_list.setAttribute('open', '')

    } else {
        month_list.removeAttribute('open')
    }

    if (target.parentElement.classList[0] === 'month-list') {
        month_picker.innerHTML = month_names[target.id]
        curr_month = Number(target.id)
        generateCalendar(curr_month, curr_year)
    }

    if (target.parentElement.classList[0] === 'year-picker' && target.tagName === 'I') {
        switch (target.classList[1]) {
            case 'fa-chevron-left':
                --curr_year
                break;
            case 'fa-chevron-right':
                ++curr_year
                break;
        }
        generateCalendar(curr_month, curr_year)
    }

    if (target.tagName === 'DIV' && target.parentElement.classList[0] === 'calendar-days') {
        document.querySelectorAll('.calendar-days div').forEach(div => div.removeAttribute('selected'))
        target.setAttribute('selected', '')

        const date = target.getAttribute('date').split('-');
        let dateConvert = target.getAttribute('date').split('-')
        dateConvert = dateConvert.reverse()

        calendar.removeAttribute('load')
        apiconnect('get', 'database').then(res => res.json())
            .then(data => {
                calendar.setAttribute('load', '')
                getAgendamentos(data.agenda, date)
            })
    }
})

try {
    generateCalendar(curr_month, curr_year)
} catch (error) {
    
}
