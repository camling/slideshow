"use strict";
let config_object;
let event_array = [];
function get_current_events() {
    async function fetchAllCalendarEvents() {
        const response = await fetch(`https://${config_object.library_id}.evanced.info/api/signup/eventlist?isOngoingVisible=true&isSpacesReservationVisible=false&onlyRegistrationEnabled=false&onlyFeaturedEvents=false`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const events = await response.json();
        return events;
    }
    let all_events = fetchAllCalendarEvents();
    return all_events;
}
function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}
function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let display_date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return display_date;
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
            let display_date = formatDate(date);
            let display_time = formatAMPM(date);
            event_array.push({ "id": event.EventId, "title": event.Title, "date": display_date, "time": display_time });
        });
        console.log(event_array);
    });
});
//# sourceMappingURL=main.js.map