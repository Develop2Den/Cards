export default class Appointment {
    bgAppointment = document.createElement('div');
    container = document.createElement('div');
    title = document.createElement('h2');
    selectsWrapper = document.createElement('div');
    doctorsList = document.createElement('select');
    doctors = ['Cardiologist', 'Dentist', 'Therapist'];
    urgencyList = document.createElement('select');
    urgency = ['Low', 'Normal', 'High'];
    labelFullName = document.createElement('label');
    inputFullName = document.createElement('input');
    labelPurpose = document.createElement('label');
    inputPurpose = document.createElement('input');
    labelDescription = document.createElement('label');
    inputDescription = document.createElement('input');
    comment = document.createElement('textarea');
    btnClose = document.createElement('i');
    error = document.createElement('p');
    btnAppointment = document.createElement('button');
    otherFields = document.createElement('div');

    createContainer() {
        this.bgAppointment.classList.add('appointment__bg');
        this.container.classList.add('modal__appointment');
    }
    createTitle() {
        this.title.innerText = 'Book your appointment';
        this.title.classList.add('modal-title');
    }
    createDoctorsList() {
        this.doctorsList.classList.add('modal');
        this.doctorsList.id = 'doctors';
        this.doctorsList.setAttribute('name','doctor');
        this.doctorsList.innerHTML = '<option selected disabled>Choose a doctor</option>';
        this.doctorsList.innerHTML += this.doctors.map(item => `<option value="${item.toLowerCase()}">${item}</option>`);
    }
    createUrgencyList() {
        this.urgencyList.classList.add('modal');
        this.urgencyList.id = 'urgency';
        this.urgencyList.setAttribute('name','urgency');
        this.urgencyList.innerHTML = '<option selected disabled>Choose a priority</option>';
        this.urgencyList.innerHTML += this.urgency.map(item => `<option value="${item.toLowerCase()}">${item}</option>`);
    }
    createSelects() {
        this.createDoctorsList();
        this.createUrgencyList();
        this.selectsWrapper.classList.add('selects-wrapper');
        this.selectsWrapper.append(this.doctorsList, this.urgencyList);
    }
    createIputs() {
        this.labelFullName.setAttribute('for', 'fullName');
        this.labelFullName.innerHTML = 'Full Name <span>*</span>';
        this.labelFullName.classList.add('modal');
        this.inputFullName.placeholder = 'Enter your full name';
        this.inputFullName.type = 'text';
        this.inputFullName.name = 'fullName';
        this.inputFullName.id = 'fullName';
        this.inputFullName.classList.add('modal');

        this.labelPurpose.setAttribute('for', 'purpose');
        this.labelPurpose.innerHTML = 'Purpose of visit <span>*</span>';
        this.labelPurpose.classList.add('modal');
        this.inputPurpose.placeholder = 'Purpose of your visit';
        this.inputPurpose.type = 'text';
        this.inputPurpose.name = 'purpose';
        this.inputPurpose.id = 'purpose';
        this.inputPurpose.classList.add('modal');

        this.labelDescription.setAttribute('for', 'description');
        this.labelDescription.innerHTML = 'Visit Description <span>*</span>';
        this.labelDescription.classList.add('modal');
        this.inputDescription.placeholder = 'Description of your visit';
        this.inputDescription.type = 'text';
        this.inputDescription.name = 'description';
        this.inputDescription.id = 'description';
        this.inputDescription.classList.add('modal');
    }
    createComment() {
        this.comment.placeholder = 'Comment';
        this.comment.rows = '3';
        this.comment.classList.add('modal');
        this.comment.setAttribute('name','comment');
    }
    createBtnClose() {
        this.btnClose.innerHTML = '&#10006;';
        this.btnClose.classList.add('appointment--close');
    }
    createError() {
        this.error.innerText = 'Required fields should be filled out';
        this.error.id = 'appointment--fail';
    }
    createBtnAppointment() {
        this.btnAppointment.innerText = 'Appointment';
        this.btnAppointment.classList.add('btn__appointment');
    }
    createOtherFields() {
        this.otherFields.classList.add('other-fields', 'modal')
    }
    render() {
        this.createContainer();
        this.createTitle();
        this.createSelects();
        this.createIputs();
        this.createOtherFields();
        this.createComment();
        this.createBtnClose();
        this.createError();
        this.createBtnAppointment();

        this.container.append(this.title,
            this.selectsWrapper,
            this.labelFullName,
            this.inputFullName,
            this.labelPurpose,
            this.inputPurpose,
            this.labelDescription,
            this.inputDescription,
            this.otherFields,
            this.comment,
            this.btnClose,
            this.error,
            this.btnAppointment);
        this.bgAppointment.append(this.container)
        document.body.append(this.bgAppointment);
    }
}
