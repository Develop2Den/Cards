// np --  обычное давление
// bmi --  индекс массы тела
// cd --  перенесенные заболевания сердечно-сосудистой системы

import Appointment from "./appointment.js";

export default class AppointmentDantist extends Appointment {
    label_NP = document.createElement('label');
    input_NP = document.createElement('input');
    label_BMI = document.createElement('label');
    input_BMI = document.createElement('input');
    label_CD = document.createElement('label');
    input_CD = document.createElement('input');
    label_AGE = document.createElement('label');
    input_AGE = document.createElement('input');
    createNP() {
        this.label_NP.setAttribute('for', 'np');
        this.label_NP.classList.add('modal');
        this.label_NP.innerHTML = 'Normal pressure <span>*</span>';

        this.input_NP.placeholder = 'Enter your normal pressure';
        this.input_NP.type = 'number';
        this.input_NP.name = 'np';
        this.input_NP.classList.add('modal');
    }
    createBMI() {
        this.label_BMI.setAttribute('for', 'bmi');
        this.label_BMI.classList.add('modal');
        this.label_BMI.innerHTML = 'Body mass index <span>*</span>';

        this.input_BMI.placeholder = 'Enter your BMI';
        this.input_BMI.type = 'number';
        this.input_BMI.name = 'bmi';
        this.input_BMI.classList.add('modal');
    }
    createCD() {
        this.label_CD.setAttribute('for', 'cd');
        this.label_CD.classList.add('modal');
        this.label_CD.innerHTML = 'Cardiovascular disease <span>*</span>';

        this.input_CD.placeholder = 'Enter your cardiovascular disease';
        this.input_CD.type = 'text';
        this.input_CD.name = 'cd';
        this.input_CD.classList.add('modal');
    }
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
        this.createNP();
        this.createBMI();
        this.createCD();
        this.createAGE();

        place.append(this.label_NP,
            this.input_NP,
            this.label_BMI,
            this.input_BMI,
            this.label_CD,
            this.input_CD,
            this.label_AGE,
            this.input_AGE)
    }
}


