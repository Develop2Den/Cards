import Appointment from "./appointment.js";

export default class AppointmentDantist extends Appointment {
    labelLastVisit = document.createElement('label');
    inputLastVisit = document.createElement('input');
    createLastVisit(){
        this.labelLastVisit.innerHTML = 'Date of last visit <span>*</span>';
        this.labelLastVisit.setAttribute('for', 'lastVisit');
        this.labelLastVisit.classList.add('modal');

        this.inputLastVisit.type = 'date';
        this.inputLastVisit.name = 'lastVisit';
        this.inputLastVisit.classList.add('modal');
    }
    render(place){
        this.createLastVisit();

        place.append(this.labelLastVisit, this.inputLastVisit)
    }
}

