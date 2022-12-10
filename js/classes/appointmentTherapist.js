import Appointment from "./appointment.js";

export default class AppointmentTherapist extends Appointment {
    label_AGE = document.createElement('label');
    input_AGE = document.createElement('input');
    
    createAGE() {
        this.label_AGE.setAttribute('for', 'age');
        this.label_AGE.classList.add('modal');
        this.label_AGE.innerHTML = 'Age <span>*</span>';

        this.input_AGE.placeholder = 'Enter your age';
        this.input_AGE.type = 'number';
        this.input_AGE.name = 'age';
        this.input_AGE.classList.add('modal');
    }
    render(place) {
        this.createAGE();

        place.append(this.label_AGE, this.input_AGE);
    }
}