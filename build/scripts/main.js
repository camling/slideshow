"use strict";
[];
let config_object;
let event_array = [];
let current_index = 0;
let container = document.getElementById("container");
function get_current_events() {
    async function fetch_all_calendar_events() {
        const response = await fetch(`https://${config_object.library_id}.evanced.info/api/signup/eventlist?isOngoingVisible=true&isSpacesReservationVisible=false&onlyRegistrationEnabled=false&onlyFeaturedEvents=false`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const events = await response.json();
        return events;
    }
    let all_events = fetch_all_calendar_events();
    return all_events;
}
function remove_tags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}
function format_am_pm(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function format_date(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let display_date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return display_date;
}
function create_link(id) {
    return `https://${config_object.library_id}.evanced.info/signup/EventDetails?EventId=${id}`;
}
function progress_bar() {
    let progress_bar = document.createElement("div");
    let progress_bar_fill = document.createElement("span");
    progress_bar.classList.add("progress_bar");
    progress_bar_fill.classList.add("progress_bar_fill");
    progress_bar_fill.style.animation = `linear progress-bar ${config_object.rotation_speed}s`;
    progress_bar.appendChild(progress_bar_fill);
    if (container != null) {
        container.appendChild(progress_bar);
    }
}
function random_color_index() {
    return Math.floor(Math.random() * config_object.colors.length);
}
function create_slide() {
    let color_index = random_color_index();
    if (container != null) {
        container.innerHTML = "";
        let title_element = document.createElement("h1");
        let description_element = document.createElement("p");
        container.classList.add("container");
        container.style.backgroundColor = config_object.colors[color_index].body;
        title_element.classList.add("event_title");
        title_element.style.color = config_object.colors[color_index].text;
        description_element.classList.add("event_description");
        description_element.style.color = config_object.colors[color_index].text;
        let title_text = document.createTextNode(event_array[current_index].title);
        let description_text = document.createTextNode(event_array[current_index].description);
        title_element.appendChild(title_text);
        description_element.appendChild(description_text);
        container.appendChild(title_element);
        container.appendChild(description_element);
        progress_bar();
        if (current_index < event_array.length) {
            current_index++;
        }
        else {
            current_index = 0;
        }
        setTimeout(create_slide, config_object.rotation_speed * 1000);
    }
}
fetch("./main.json")
    .then(response => {
    return response.json();
})
    .then(data => {
    console.log(data);
    config_object = data;
    console.log(config_object.library_id);
    get_current_events().then(events => {
        events.forEach(event => {
            let date = new Date(event.EventStart);
            let display_date = format_date(date);
            let display_time = format_am_pm(date);
            event_array.push({ "id": event.EventId, "title": event.Title, "description": remove_tags(event.Description), "date": display_date, "time": display_time, "image": event.Image, "image_alt": event.ImageAlt, "room": event.SpaceName, "link": create_link(event.EventId), "length": event.EventLength });
        });
        console.log(event_array);
        create_slide();
    });
});
//# sourceMappingURL=main.js.map