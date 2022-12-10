import api from "./classes/Api.js";
import ModalSignIn from './classes/sign-in.js';
import Appointment from './classes/appointment.js';
import AppointmentDantist from './classes/appointmentDantist.js';
import AppointmentCardiologist from './classes/appointmentCardiologist.js';
import AppointmentTherapist from './classes/appointmentTherapist.js';
import VisitCard from './classes/visitCard.js';
import findCurrentClass from './classes/findCurrentClass.js';
import './visitCardEvent.js';

const modalSignIn = new ModalSignIn;
const appointment = new Appointment;
appointment.render();
modalSignIn.render();

const form = document.querySelector(".filter__form");
const input = document.querySelector(".filter__input");
const selStatus = document.querySelector(".filter__select-one");
const selEmergency = document.querySelector(".filter__select-two");
const cleanBtn = document.querySelector(".filter__btn-clear");
let id;
document.addEventListener('DOMContentLoaded', checkLocalToken);
document.getElementById('main-sign-in').addEventListener('click', () => {
    showModalWindow();
});
document.querySelector('.btn__appointment').addEventListener('click', ()=>{
    if (document.querySelector('.btn__appointment').classList.contains('edit')) {
        editVisit(id);
        document.querySelector('.btn__appointment').classList.remove('edit')
    }
    else {
        postVisit();
    }
});
document.querySelector('.btn__sign-in').addEventListener('click', validateSignIn);
document.getElementById('doctors').addEventListener('change', addSpecificFields);
document.querySelector('.sign-in--close').addEventListener('click', closeSignIn);
document.querySelector('.sign-in__bg').addEventListener('click', e => {
    if (e.target.className === 'sign-in__bg') {
        closeSignIn()
    }
})
document.querySelector('.appointment--close').addEventListener('click', closeAppointmentModal)
document.querySelector('.appointment__bg').addEventListener('click', e => {
    if (e.target.className === 'appointment__bg') {
        closeAppointmentModal()
    }
})
document.querySelector('.cardsContainer').addEventListener('click', e => {
        if (e.target.classList.contains('visit-card--edit-button')) {
            document.querySelector('.btn__appointment').classList.add('edit')
            id = findCurrentClass(e.target).getAttribute('data-id');
            autoField(id);
            showModalWindow();
        }
    }
)

async function postVisit() {
    if (document.querySelector('.btn__appointment').classList.contains('edit')) return;
    let appointment = validateAppointmentData()
    if (!!appointment) {
        let response = await api.postRequest(appointment);
        closeAppointmentModal();
        new VisitCard(response).add(document.querySelector('.cardsContainer'));
        return response;
    }

}

async function editVisit(id) {
    let appointment = validateAppointmentData();
    if (!!appointment) {
        let response = await api.putRequest(id, appointment);
        closeAppointmentModal();
        new VisitCard(await response);
        return response;
    }
}

function validateAppointmentData() {
    const appointment = {};
    let valid = false;
    let doctor = document.getElementById('doctors').value.toLowerCase();
    let urgency = document.getElementById('urgency').value.toLowerCase();
    let comment = document.querySelector('textarea.modal').value;
    const error = document.getElementById('appointment--fail');
    const inputs = document.querySelectorAll('.modal__appointment input.modal');
    error.innerText = 'Required fields should be filled out';
    switch (true) {
        case doctor === 'choose a doctor':
            error.style.opacity = 1;
            error.innerText = 'Choose a doctor';
            valid = false;
            break
        case urgency === 'choose a priority':
            error.style.opacity = 1;
            error.innerText = 'Choose a priority level';
            valid = false;
            break
        case !valid:
            inputs.forEach(input => {
                let name = input.getAttribute('name')
                if (!input.value) {
                    error.style.opacity = '1';
                    valid = false
                } else {
                    appointment[name] = input.value;
                    error.style.opacity = '0'
                    valid = true
                }
                return valid
            })
            break
    }
    if (!!valid) {
        if (!!comment) {
            appointment.comment = comment;
        }
        appointment.doctor = doctor.toLowerCase();
        appointment.urgency = urgency.toLowerCase();
        appointment.status = 'open';
        return appointment;
    }
}

function addSpecificFields() {
    let place = document.querySelector('.other-fields');
    place.innerHTML = '';
    let doctor = typeof arguments[0] === 'string' ? arguments[0] : document.getElementById('doctors').value.toLowerCase()
    switch (doctor) {
        case 'dentist':
            const appointmentDantist = new AppointmentDantist;
            appointmentDantist.render(place);
            break
        case 'cardiologist':
            const appointmentCardiologist = new AppointmentCardiologist;
            appointmentCardiologist.render(place);
            break
        case 'therapist':
            const appointmentTherapist = new AppointmentTherapist;
            appointmentTherapist.render(place);
            break
    }
}

function closeAppointmentModal() {
    document.querySelector('.appointment__bg').style.display = 'none'
    const allInpust = document.querySelectorAll('.modal__appointment input.modal');
    allInpust.forEach(item => item.value = '');
    document.querySelector('.other-fields').innerHTML = '';
    document.getElementById('doctors').value = 'Choose a doctor';
    document.getElementById('urgency').value = 'Choose a priority';
    document.querySelector('textarea.modal').value = '';
    document.querySelector('.btn__appointment').classList.remove('edit')
}

function closeSignIn() {
    document.querySelector('.sign-in__bg').style.display = 'none';
    document.getElementById('sign-in--login').value = '';
    document.getElementById('sign-in--password').value = '';
    document.getElementById('sign-in--fail').style.opacity = 0;
}

function showModalWindow() {
    let btn = document.getElementById('main-sign-in').textContent;
    if (btn !== 'Appointment') {
        document.querySelector('.sign-in__bg').style.display = 'flex';
    } else {
        document.querySelector('.appointment__bg').style.display = 'flex';
        const error = document.getElementById('appointment--fail');
        error.style.opacity = '0';
        error.innerText = 'Required fields should be filled out';
    }
}

function hideSignInModal() {
    document.querySelector('.sign-in__bg').style.display = 'none'
    document.getElementById('main-sign-in').textContent = 'Appointment'
}

function validateSignIn() {
    const email = document.getElementById('sign-in--login').value.toLowerCase();
    const password = document.getElementById('sign-in--password');
    const signIn = {
        email,
        password: password.value
    }
    fetchLogin(signIn);
}

function fetchLogin({ email, password }) {
    api.postLogin({ email, password })
        .then(response => {
            if (!!response) {
                hideSignInModal()
                api.getUrlRequest()
                    .then(res => cardsRender(res))
                return response
            } else {
                document.getElementById('sign-in--fail').style.opacity = 1
                password = ''
            }
        })
}

function checkLocalToken() {
    if (!!localStorage.getItem('token')) {
        api.getRequestAll().then(res => cardsRender(res))
        document.getElementById('main-sign-in').textContent = 'Appointment'
    }
}

async function cardsRender(res) {
    document.querySelector('.cardsContainer').innerHTML = '';
    document.querySelector('.main__text').classList.remove('hidden')
    if (res.length !== 0) {
        res.forEach(cardInfo => {
            new VisitCard(cardInfo).add(document.querySelector('.cardsContainer'));
        })
        document.querySelector('.main__text').classList.add('hidden')
    }
}


document.querySelector('.cardsContainer').addEventListener('click', e => {
    if (e.target.classList.contains('visit-card--edit-button')) {
        document.querySelector('.btn__appointment').classList.add('edit')
        const id = findCurrentClass(e.target).getAttribute('data-id');
        showModalWindow();
        autoField(id);
        document.querySelector('.btn__appointment').addEventListener('click', () => {
            if (document.querySelector('.btn__appointment').classList.contains('edit')) {
                editVisit(id);
                document.querySelector('.btn__appointment').classList.remove('edit')

            }
        })
    }
}
)

function autoField(id) {
    let currentCard = document.querySelector(`[data-id = '${id}']`)
    addSpecificFields(currentCard.querySelector(`[data-field = doctor]`).innerText.toLowerCase());

    let allFields = currentCard.querySelectorAll('[data-field]');

    allFields.forEach(field => {
        const fieldName = field.getAttribute('data-field');
        let currentField = document.querySelector(`[name = ${fieldName}]`);
        if (!currentField) return;
        if (currentField.tagName === 'INPUT' || currentField.tagName === 'TEXTAREA') {
            currentField.value = field.innerText;
        }
        if (currentField.tagName === 'SELECT') {
            currentField.querySelector(`[selected]`).removeAttribute('selected');
            currentField.querySelector(`[value = ${field.innerText.toLowerCase()}]`).setAttribute('selected', '');
        }
    })
}


form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = {};
    if (input.value) {
        formData[input.name] = input.value.toLowerCase();
    }
    if (selStatus.value !== "Search by status") {
        formData[selStatus.name] = selStatus.value.toLowerCase();
    }
    if (selEmergency.value !== "The urgency of the visit") {
        formData[selEmergency.name] = selEmergency.value.toLowerCase();
    }
    api.getRequestAll()
       .then((response) => {
           filterCards(formData,response)
       });
});

cleanBtn.addEventListener("click", () => {
    input.value = "";
    selStatus.value = "Search by status";
    selEmergency.value = "The urgency of the visit";
    api.getRequestAll()
       .then(res => cardsRender(res))
});

function filterCards(formData, data) {
    const filtered = data.filter((card) => {
        let doctor = card.doctor.toLowerCase();
        let status = card.status.toLowerCase();
        let urgency = card.urgency.toLowerCase();
        let purpose = card.purpose.toLowerCase();
        if (formData.inputSearch && formData.filterStatus && formData.filterEmergency) {
            if ((doctor.toLowerCase().includes(formData.inputSearch) || (purpose.includes(formData.inputSearch)))
                && status.includes(formData.filterStatus)
                && urgency.includes(formData.filterEmergency)
            ) {
                return card;
            }
            return
        }
        if (formData.inputSearch && formData.filterStatus) {
            if ((doctor.includes(formData.inputSearch) || (purpose.includes(formData.inputSearch)))
                && status.includes(formData.filterStatus)
            ) {
                return card;
            }
            return
        }
        if (formData.inputSearch && formData.filterEmergency) {
            if ((doctor.includes(formData.inputSearch) || (purpose.includes(formData.inputSearch)))
                && urgency.includes(formData.filterEmergency)
            ) {
                return card;
            }
            return
        }
        if (formData.filterStatus && formData.filterEmergency) {
            if (status.includes(formData.filterStatus) && urgency.includes(formData.filterEmergency)
            ) {
                return card;
            }
            return
        }
        if (formData.inputSearch) {
            if ((doctor.includes(formData.inputSearch) || (purpose.includes(formData.inputSearch)))
            ) {
                return card;
            }
            return
        }
        if (formData.filterStatus) {
            if (status.includes(formData.filterStatus)
            ) {
                return card;
            }
            return
        }
        if (formData.filterEmergency) {
            if (urgency.includes(formData.filterEmergency)
            ) {
                return card;
            }
        }
    });
    cardsRender(filtered);
}