export default class VisitCard {
    #card;

    constructor({fullName, doctor, id, ...otherData}) {
        this.name = fullName;
        this.doctor = doctor;
        this.id = id;
        this.more = otherData;
        this.render();
    }

    render() {
        let offClass = '';
        if(this.more['status']==='done') offClass = 'off';
        let checkCard = document.querySelector(`[data-id = '${this.id}']`);
        if(checkCard){
            checkCard.innerHTML = "";
            this.#card = checkCard;
        }
        else{
            this.#card = document.createElement('div');
            this.#card.classList.add('visit-card');
            this.#card.setAttribute('data-id',this.id);
        }


        let html = `<div class="cardsMainInfoContainer">
                    <img src="./images/doctor.png" class="visit-card__big">
                    <svg  class="delete-icon" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px"
                         y="0px" width="122.879px" height="122.879px" viewBox="0 0 122.879 122.879" xml:space="preserve">
                        <g>
                            <path fill-rule="evenodd" clip-rule="evenodd" fill="#ff0000" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/>
                        </g>
                    </svg>
                    <svg class="checked-icon green ${offClass}" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        \t viewBox="0 0 507.2 507.2" style="enable-background:new 0 0 507.2 507.2;" xml:space="preserve">
                        <circle cx="253.6" cy="253.6" r="253.6"/>
                        <path d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
                        <g>
                        \t<path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                        \t\tc-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
                        \t<path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                        \t\tc-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
                        </g>
                    </svg>
                    <div class="visit-card--main-info">
                            <p>doctor:<span class="visit-card__main-text" data-field = "doctor">${this.doctor}</span></p>
                            <p>patient: <span class="visit-card__main-text" data-field = "fullName">${this.name}</span></p>
                        </div>
                    </div>
                    <ul class="cardsMoreInfoContainer hidden">`;
        for (const key in this.more) {
            html += `<li class="visit-card--addition">${key} : <span class = "visit-card--addition-info" data-field = ${key}>${this.more[key]}</li>`;
        }
        html += `</ul>
                    <button class="visit-card--button visit-card--more-button">More</button>
                    <button class="visit-card--button visit-card--edit-button">Edit</button>
                </div>`
        this.#card.innerHTML = html;
    }

    add(node) {
        node.append(this.#card);
    }
}