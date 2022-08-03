var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
[];
;
var config_object;
var event_array = [];
var layout_array = ["left", "right", "top", "bottom"];
var current_index = 0;
var container = document.getElementById("container");
var video_container = document.querySelector('video');
var reset = false;
var r = document.querySelector(':root');
function url_join_event_types(id) {
    return 'eventsTypes=' + id + '&';
}
function url_join_locations(id) {
    return 'locations=' + id + '&';
}
function url_join_age_groups(id) {
    return 'ageGroups=' + id + '&';
}
function get_current_events() {
    function fetch_all_calendar_events() {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, message, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://".concat(config_object.library_id, ".evanced.info/api/signup/eventlist?\n            ").concat(config_object.start_date ? 'startDate=' + config_object.start_date + '&' : '', "\n            ").concat(config_object.end_date ? 'endDate=' + config_object.end_date + '&' : '', "\n            ").concat(config_object.event_type_ids ? config_object.event_type_ids.map(url_join_event_types).join('') : '', "\n            ").concat(config_object.locations ? config_object.locations.map(url_join_locations).join('') : '', "\n            ").concat(config_object.age_groups ? config_object.age_groups.map(url_join_age_groups).join('') : '', "\n            isOngoingVisible=").concat(config_object.is_ongoing, "&isSpacesReservationVisible=false&onlyRegistrationEnabled=false&onlyFeaturedEvents=").concat(config_object.only_featured_events);
                        console.log(url);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            message = "An error has occurred: ".concat(response.status);
                            throw new Error(message);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        events = _a.sent();
                        return [2 /*return*/, events];
                }
            });
        });
    }
    var all_events = fetch_all_calendar_events();
    return all_events;
}
function remove_tags(str) {
    if ((str === null) || (str === ''))
        return "";
    else {
        str = str.replace(/\&nbsp;/g, '');
        str = str.replace(/(<([^>]+)>)/ig, '');
        return str;
    }
}
function add_minutes(date, time) {
    var hours = 0;
    var minutes = 0;
    if (time > 59) {
        hours = Math.floor(time / 60);
        minutes = time - (hours * 60);
        date.setMinutes(date.getMinutes() + minutes);
        date.setHours(date.getHours() + hours);
        return date;
    }
    else {
        minutes = time;
        date.setMinutes(date.getMinutes() + minutes);
        console.log("Hours: ".concat(hours));
        console.log("Minutes: ".concat(minutes));
        return date;
    }
}
function format_am_pm(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function format_date(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var display_date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return display_date;
}
function create_link(id) {
    return "https://".concat(config_object.library_id, ".evanced.info/signup/EventDetails?EventId=").concat(id);
}
function get_random_array_index(array) {
    return Math.floor(Math.random() * array.length);
}
function progress_bar(color_index) {
    var progress_bar = document.createElement("div");
    var progress_bar_fill = document.createElement("span");
    progress_bar.classList.add("progress_bar");
    progress_bar_fill.classList.add("progress_bar_fill");
    progress_bar_fill.style.animation = "linear progress-bar ".concat(config_object.rotation_speed, "s");
    progress_bar_fill.style.backgroundColor = config_object.colors[color_index].text;
    progress_bar.appendChild(progress_bar_fill);
    if (container != null) {
        container.appendChild(progress_bar);
    }
}
function get_heading_size(length) {
    console.log(length);
    var size;
    switch (true) {
        case (length < 30):
            size = "6rem";
            break;
        case (length < 50):
            size = "5rem";
            break;
        case (length < 75):
            size = "4rem";
            break;
        default:
            size = "3rem";
    }
    return size;
}
function get_description_size(length) {
    console.log("Length: " + length);
    var size;
    switch (true) {
        case (length < 50):
            size = "3em";
            break;
        case (length < 100):
            size = "2.5em";
            break;
        case (length < 650):
            size = "2em";
            break;
        default:
            size = "1.3em";
    }
    return size;
}
function random_color_index() {
    return Math.floor(Math.random() * config_object.colors.length);
}
function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}
function create_slide() {
    if (reset === true)
        location.reload();
    var color_index = random_color_index();
    var layout_class = layout_array[get_random_array_index(layout_array)];
    if (container != null) {
        r.style.setProperty('--main', hexToRgbA(config_object.colors[color_index].body, 0.5));
        r.style.setProperty('--secondary', config_object.colors[color_index].text);
        container.innerHTML = "";
        container.className = "";
        var sidebar_element = document.createElement("div");
        var main_element = document.createElement("div");
        var title_element = document.createElement("h1");
        var description_element = document.createElement("div");
        var duration_element = document.createElement("h2");
        var time_element = document.createElement("div");
        var start_time_element = document.createElement("h2");
        var end_time_element = document.createElement("h2");
        var date_element = document.createElement("h2");
        container.classList.add("container");
        container.classList.add(layout_class);
        container.style.backgroundColor = hexToRgbA(config_object.colors[color_index].body, 0.5);
        container.style.height = config_object.alert === "" ? "100vh" : "85vh";
        sidebar_element.classList.add("sidebar");
        main_element.classList.add("main_slide");
        title_element.classList.add("event_title");
        title_element.style.color = config_object.colors[color_index].text;
        title_element.style.fontFamily = config_object.font;
        title_element.style.fontSize = get_heading_size(event_array[current_index].title.length);
        //console.log(get_heading_size(event_array[current_index].title.length));
        description_element.classList.add("event_description");
        description_element.style.color = config_object.colors[color_index].text;
        description_element.style.fontFamily = config_object.font;
        description_element.style.fontSize = get_description_size(event_array[current_index].description.length);
        duration_element.classList.add("length");
        duration_element.style.fontFamily = config_object.font;
        time_element.classList.add("time");
        start_time_element.classList.add("start_time");
        start_time_element.style.fontFamily = config_object.font;
        end_time_element.classList.add("end_time");
        end_time_element.style.fontFamily = config_object.font;
        date_element.classList.add("date");
        date_element.style.fontFamily = config_object.font;
        var title_text = document.createTextNode(event_array[current_index].title);
        var description_text = event_array[current_index].description;
        var duration_text = document.createTextNode("".concat(event_array[current_index].length, " minutes"));
        var start_time_text = document.createTextNode(event_array[current_index].time);
        var end_time_text = document.createTextNode(format_am_pm(add_minutes(event_array[current_index].date_object, event_array[current_index].length)));
        var date_text = document.createTextNode(event_array[current_index].date);
        title_element.appendChild(title_text);
        description_element.innerHTML = description_text;
        duration_element.appendChild(duration_text);
        start_time_element.appendChild(start_time_text);
        end_time_element.appendChild(end_time_text);
        date_element.appendChild(date_text);
        if (config_object.logo !== "") {
            try {
                var url = new URL(config_object.logo);
            }
            catch (_) {
                console.error("".concat(config_object.logo, " is a malformed logo url. Please update it in the main.json file."));
                return false;
            }
            var logo_element = document.createElement("img");
            logo_element.src = config_object.logo;
            logo_element.classList.add("logo_image");
            sidebar_element.appendChild(logo_element);
        }
        main_element.appendChild(title_element);
        if (event_array[current_index].image !== "") {
            console.log(event_array[current_index].image);
            var image_element = document.createElement("img");
            image_element.src = event_array[current_index].image;
            image_element.alt = event_array[current_index].image_alt;
            image_element.classList.add("event_image");
            main_element.appendChild(image_element);
        }
        main_element.appendChild(description_element);
        sidebar_element.appendChild(duration_element);
        sidebar_element.appendChild(time_element);
        time_element.appendChild(start_time_element);
        time_element.appendChild(end_time_element);
        sidebar_element.appendChild(date_element);
        container.appendChild(sidebar_element);
        container.appendChild(main_element);
        if (config_object.show_qr_code === true) {
            var qr_element = document.createElement("div");
            qr_element.classList.add("qr_code");
            sidebar_element.appendChild(qr_element);
            // @ts-ignore
            new QRCode(qr_element, {
                text: event_array[current_index].link,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                // @ts-ignore
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        progress_bar(color_index);
        if (current_index < event_array.length - 1) {
            current_index++;
        }
        else {
            current_index = 0;
            reset = true;
        }
        setTimeout(create_slide, config_object.rotation_speed * 1000);
    }
}
// Get config information
fetch("./main.json")
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    console.log(data);
    config_object = data;
    if (video_container != null) {
        video_container.defaultPlaybackRate = 0.2;
        video_container.play();
    }
    console.log(config_object.library_id);
    if (config_object.alert !== "") {
        var alert_element = document.createElement("h1");
        var alert_text = document.createTextNode(config_object.alert);
        alert_element.classList.add("alert");
        alert_element.appendChild(alert_text);
        if (container != null) {
            container.before(alert_element);
        }
    }
    get_current_events().then(function (events) {
        events.forEach(function (event) {
            var date = new Date(event.EventStart);
            var display_date = format_date(date);
            var display_start_time = format_am_pm(date);
            event_array.push({ "id": event.EventId, "title": event.Title, "description": event.Description, "date_object": date, "date": display_date, "time": display_start_time, "image": event.Image, "image_alt": event.ImageAlt, "room": event.SpaceName, "link": create_link(event.EventId), "length": event.EventLength });
        });
        console.log(event_array);
        create_slide();
    });
});
