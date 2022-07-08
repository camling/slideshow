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
var layout_array = ["left", "right", "middle", "top", "bottom"];
var current_index = 0;
var container = document.getElementById("container");
function get_current_events() {
    function fetch_all_calendar_events() {
        return __awaiter(this, void 0, void 0, function () {
            var response, message, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(config_object.library_id, ".evanced.info/api/signup/eventlist?isOngoingVisible=true&isSpacesReservationVisible=false&onlyRegistrationEnabled=false&onlyFeaturedEvents=false"))];
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
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
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
function choose_layout_index() {
    return Math.floor(Math.random() * layout_array.length);
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
        case (length < 20):
            size = "5em";
            break;
        case (length < 30):
            size = "4em";
            break;
        case (length < 50):
            size = "3em";
            break;
        default:
            size = "2.5em";
    }
    return size;
}
function random_color_index() {
    return Math.floor(Math.random() * config_object.colors.length);
}
function create_slide() {
    var color_index = random_color_index();
    var layout_class = layout_array[choose_layout_index()];
    if (container != null) {
        container.innerHTML = "";
        container.className = "";
        var title_element = document.createElement("h1");
        var description_element = document.createElement("p");
        var duration_element = document.createElement("h2");
        var date_element = document.createElement("h2");
        container.classList.add("container");
        container.classList.add(layout_class);
        container.style.backgroundColor = config_object.colors[color_index].body;
        title_element.classList.add("event_title");
        title_element.style.color = config_object.colors[color_index].text;
        title_element.style.fontFamily = config_object.font;
        title_element.style.fontSize = get_heading_size(event_array[current_index].title.length);
        console.log(get_heading_size(event_array[current_index].title.length));
        description_element.classList.add("event_description");
        description_element.style.color = config_object.colors[color_index].text;
        description_element.style.fontFamily = config_object.font;
        duration_element.classList.add("length");
        duration_element.style.color = config_object.colors[color_index].text;
        duration_element.style.fontFamily = config_object.font;
        date_element.classList.add("date");
        date_element.style.color = config_object.colors[color_index].text;
        date_element.style.fontFamily = config_object.font;
        var title_text = document.createTextNode(event_array[current_index].title);
        var description_text = document.createTextNode(event_array[current_index].description);
        var duration_text = document.createTextNode("".concat(event_array[current_index].length, " minutes"));
        var date_text = document.createTextNode(event_array[current_index].date);
        title_element.appendChild(title_text);
        description_element.appendChild(description_text);
        duration_element.appendChild(duration_text);
        date_element.appendChild(date_text);
        container.appendChild(title_element);
        container.appendChild(description_element);
        container.appendChild(duration_element);
        container.appendChild(date_element);
        if (config_object.show_qr_code === true) {
            var qr_element = document.createElement("div");
            qr_element.classList.add("qr_code");
            container.appendChild(qr_element);
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
        if (event_array[current_index].image !== "") {
            console.log(event_array[current_index].image);
            var image_element = document.createElement("img");
            image_element.src = event_array[current_index].image;
            image_element.alt = event_array[current_index].image_alt;
            image_element.classList.add("event_image");
            container.appendChild(image_element);
        }
        progress_bar(color_index);
        if (current_index < event_array.length - 1) {
            current_index++;
        }
        else {
            current_index = 0;
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
            var display_time = format_am_pm(date);
            event_array.push({ "id": event.EventId, "title": event.Title, "description": remove_tags(event.Description), "date": display_date, "time": display_time, "image": event.Image, "image_alt": event.ImageAlt, "room": event.SpaceName, "link": create_link(event.EventId), "length": event.EventLength });
        });
        console.log(event_array);
        create_slide();
    });
});
