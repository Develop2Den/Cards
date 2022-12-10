"use strict"
import api from "./classes/Api.js";
import VisitCard from './classes/visitCard.js';
import findCurrentClass from './classes/findCurrentClass.js';

document.querySelector('.cardsContainer').addEventListener('click', e => {

    if (e.target.classList.contains('cardsContainer')) return;
    const id = findCurrentClass(e.target).getAttribute('data-id');

    //more info
    if (e.target.classList.contains('visit-card--more-button')) {
        const currentCard = document.querySelector(`[data-id= '${id}']`);
        if (!currentCard) return;
        currentCard.querySelector('.cardsMoreInfoContainer').classList.toggle('hidden');
        const moreBtn = currentCard.querySelector('.visit-card--more-button');
        moreBtn.innerText = moreBtn.innerText.toLowerCase() === 'more' ? 'Less' : 'More'
    }
    //delete card
    if (findCurrentClass(e.target,'delete-icon',5)) {
        api.deleteRequest(id).then(rez => {
            if (rez === 200) {
                document.querySelector(`[data-id = '${id}']`).remove();
            }
        })
    }
    //change status
    if (findCurrentClass(e.target,'checked-icon',5)) {
        let currentCard = document.querySelector(`[data-id = '${id}']`);
        let allFields = currentCard.querySelectorAll('[data-field]');
        let appointment = {};
        allFields.forEach(field => {
            appointment[field.getAttribute('data-field')] = field.innerText;
        })
        appointment['status'] = appointment['status'] === "done" ? "open" : "done";
        appointment['id'] = id;
        api.putRequest(id, appointment)
            .then(response=>{
                new VisitCard(response);
                let checkIcon = currentCard.querySelector('.checked-icon');
                if(appointment['status']==='done'){
                    if(checkIcon.classList.contains('green'))
                    checkIcon.classList.replace('green','off')
                }
                else{
                    if(checkIcon.classList.contains('off'))
                        checkIcon.classList.replace('off','green')
                }
            });
    }
})
