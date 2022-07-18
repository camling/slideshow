interface colors_array { body: string, text: string }[];
interface colors_array extends Array<colors_array>{};

let config_object:{ library_id: string, name: string, rotation_speed: number, logo: string, font: string, 
  colors:colors_array, show_qr_code: boolean, alert: string, event_type_ids:[], start_date:string, end_date:string, 
  locations:[], age_groups:[],is_ongoing:boolean, only_featured_events:boolean};
let event_array:any = [];
let layout_array:any = ["left","right","middle","top","bottom"];
let current_index:number = 0;
const container = document.getElementById("container") as HTMLElement | null;
const video_container = document.querySelector('video') as HTMLVideoElement | null;
let reset = false;
const r:any = document.querySelector(':root');


function url_join_event_types(id:number)
{
  return 'eventsTypes='+id+'&';
}

function url_join_locations(id:number)
{
  return 'locations='+id+'&';
}

function url_join_age_groups(id:number)
{
  return 'ageGroups='+id+'&';
}

function get_current_events()
    {
      async function fetch_all_calendar_events() 
        {
            let url = `https://${config_object.library_id}.evanced.info/api/signup/eventlist?
            ${config_object.start_date ? 'startDate='+config_object.start_date+'&' : ''}
            ${config_object.end_date ? 'endDate='+config_object.end_date+'&' : ''}
            ${config_object.event_type_ids ? config_object.event_type_ids.map(url_join_event_types).join('') : ''}
            ${config_object.locations ? config_object.locations.map(url_join_locations).join('') : ''}
            ${config_object.age_groups ? config_object.age_groups.map(url_join_age_groups).join('') : ''}
            isOngoingVisible=${config_object.is_ongoing}&isSpacesReservationVisible=false&onlyRegistrationEnabled=false&onlyFeaturedEvents=${config_object.only_featured_events}`;
            console.log(url);
            const response = await fetch(url);
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

   
function remove_tags(str:string) {
  if ((str===null) || (str===''))
  return "";
  else
  {
    str = str.replace(/\&nbsp;/g, '');
    str = str.replace( /(<([^>]+)>)/ig, '');
    return str;
  }
  
}

function add_minutes(date:Date, time:number )
{
	let hours = 0;
  let minutes = 0;
	
  if(time > 59)
  {
    hours = Math.floor(time / 60);
    minutes = time - (hours * 60);
    date.setMinutes(date.getMinutes() + minutes);
    date.setHours(date.getHours() + hours);
    return date;
  }
  else
  {
    minutes = time;
    date.setMinutes(date.getMinutes() + minutes);
    console.log(`Hours: ${hours}`);
    console.log(`Minutes: ${minutes}`);
    return date;
  }
  
}

function format_am_pm(date:Date) {
  let hours:number = date.getHours();
  let minutes:number | string = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


function format_date(date:Date)
{
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let display_date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  return display_date;
}

function create_link(id:number)
{
  return `https://${config_object.library_id}.evanced.info/signup/EventDetails?EventId=${id}`;
}

function get_random_array_index(array):number
{
  return Math.floor(Math.random()* array.length);
}


function progress_bar(color_index:number)
{
  let progress_bar:HTMLElement = document.createElement("div");
  let progress_bar_fill:HTMLElement = document.createElement("span");

  progress_bar.classList.add("progress_bar");
  progress_bar_fill.classList.add("progress_bar_fill");
  progress_bar_fill.style.animation = `linear progress-bar ${config_object.rotation_speed}s`;
  progress_bar_fill.style.backgroundColor = config_object.colors[color_index].text;

  progress_bar.appendChild(progress_bar_fill);

  if(container != null)
  {
    container.appendChild(progress_bar);
  }
 
}

function get_heading_size(length:number):string
{
  console.log(length);

  let size:string;
  switch(true) {
    case (length < 30):
     size = "5em";
      break;
    case (length < 50):
      size = "4em";
      break;
    case (length < 75):
      size = "3em";
        break;  
    default:
      size = "2.5em";
  }
  return size;
}

function get_description_size(length:number):string
{
  console.log(length);

  let size:string;
  switch(true) {
    case (length < 50):
     size = "3em";
      break;
    case (length < 100):
      size = "2.5em";
      break;
    case (length < 250):
      size = "2em";
        break;  
    default:
      size = "1.5em";
  }
  return size;
}

function random_color_index()
{
return Math.floor(Math.random()* config_object.colors.length);
}

function hexToRgbA(hex:string, alpha:number){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
  }
  throw new Error('Bad Hex');
}




function create_slide()
{
  if(reset === true) location.reload();

  let color_index = random_color_index();
  let layout_class = layout_array[get_random_array_index(layout_array)];
  if(container != null)
  {
    
    r.style.setProperty('--main', hexToRgbA(config_object.colors[color_index].body, 0.5));
    r.style.setProperty('--secondary', config_object.colors[color_index].text);
    container.innerHTML = "";
    container.className = "";

    
    let title_element:HTMLHeadingElement = document.createElement("h1");
    let description_element:HTMLElement = document.createElement("div");
    let duration_element:HTMLHeadingElement = document.createElement("h2");
    let start_time_element:HTMLHeadingElement = document.createElement("h2");
    let end_time_element:HTMLHeadElement = document.createElement("h2");
    let date_element:HTMLHeadElement = document.createElement("h2");
    

    container.classList.add("container");
    container.classList.add(layout_class);
    container.style.backgroundColor = hexToRgbA(config_object.colors[color_index].body, 0.5);
    container.style.height = config_object.alert === "" ? "100vh" : "85vh";
    
    title_element.classList.add("event_title");
    title_element.style.color = config_object.colors[color_index].text;
    title_element.style.fontFamily = config_object.font;
    title_element.style.fontSize = get_heading_size(event_array[current_index].title.length);
    //console.log(get_heading_size(event_array[current_index].title.length));
   
    description_element.classList.add("event_description");
    description_element.style.color = config_object.colors[color_index].text;
    description_element.style.fontFamily = config_object.font;
    description_element.style.fontSize = get_description_size(event_array[current_index].description.length)

    duration_element.classList.add("length");
    duration_element.style.color = config_object.colors[color_index].text;
    duration_element.style.fontFamily = config_object.font;

    start_time_element.classList.add("time");
    start_time_element.style.color = config_object.colors[color_index].text;
    start_time_element.style.fontFamily = config_object.font;

    end_time_element.classList.add("end_time");
    end_time_element.style.color = config_object.colors[color_index].text;
    end_time_element.style.fontFamily = config_object.font;

    date_element.classList.add("date");
    date_element.style.color = config_object.colors[color_index].text;
    date_element.style.fontFamily = config_object.font;

    

    let title_text:Text = document.createTextNode(event_array[current_index].title);
    let description_text = event_array[current_index].description;
    let duration_text:Text = document.createTextNode(`${event_array[current_index].length} minutes`);
    let start_time_text:Text = document.createTextNode(event_array[current_index].time);
    let end_time_text:Text = document.createTextNode(format_am_pm(add_minutes(event_array[current_index].date_object, event_array[current_index].length)));
    let date_text:Text = document.createTextNode(event_array[current_index].date);

    title_element.appendChild(title_text);
    description_element.innerHTML = description_text;
    duration_element.appendChild(duration_text);
    start_time_element.appendChild(start_time_text);
    end_time_element.appendChild(end_time_text);
    date_element.appendChild(date_text);

    container.appendChild(title_element);
    container.appendChild(description_element);
    container.appendChild(duration_element);
    container.appendChild(start_time_element);
    container.appendChild(end_time_element);
    container.appendChild(date_element);
    
    
    
    if(config_object.show_qr_code === true)
    {

    let qr_element = document.createElement("div");
    qr_element.classList.add("qr_code");
    container.appendChild(qr_element);
     // @ts-ignore
        new QRCode(qr_element, {
          text: event_array[current_index].link,
          width: 200,
          height: 200,
          colorDark : "#000000",
          colorLight : "#ffffff",
          // @ts-ignore
          correctLevel : QRCode.CorrectLevel.H
        });
      
    }
   
    if(event_array[current_index].image !== "")
    {
      console.log(event_array[current_index].image);
      let image_element:HTMLImageElement = document.createElement("img");
      image_element.src = event_array[current_index].image;
      image_element.alt = event_array[current_index].image_alt;
      image_element.classList.add("event_image");
      container.appendChild(image_element);
    }

    if(config_object.logo !== "")
    {
      try {
        let url = new URL(config_object.logo);
      } catch (_) {
        console.error(`${config_object.logo} is a malformed logo url. Please update it in the main.json file.`);
        return false;  
      }

      let logo_element:HTMLImageElement = document.createElement("img");
        logo_element.src = config_object.logo;
        logo_element.classList.add("logo_image");
        container.appendChild(logo_element);
     
      }
    


    progress_bar(color_index);

    if(current_index < event_array.length - 1)
    {
      current_index++;
    }
    else
    {
      current_index = 0;
      reset = true;
    }

    setTimeout(create_slide,config_object.rotation_speed * 1000);

  }
  

}

// Get config information
fetch("./main.json")
.then(response => {
   return response.json();
})
.then(data => {
    console.log(data);
    config_object = data;
    
      if(video_container != null)
      {
      video_container.defaultPlaybackRate = 0.2;
      video_container.play();
      }
    
    
    
    console.log(config_object.library_id);

    if(config_object.alert !== "")
    {
      
      let alert_element:HTMLHeadingElement = document.createElement("h1");
      let alert_text:Text = document.createTextNode(config_object.alert);
      
      alert_element.classList.add("alert");
      alert_element.appendChild(alert_text);
      if(container != null)
      {
        container.before(alert_element);
      }
      
    }

    get_current_events().then(events => {
      
        events.forEach(event => {
          let date:Date = new Date(event.EventStart);
          let display_date:string = format_date(date);
          let display_start_time:string = format_am_pm(date);
          event_array.push({"id":event.EventId, "title":event.Title, "description":event.Description, "date_object": date, "date":display_date, "time":display_start_time, "image":event.Image, "image_alt":event.ImageAlt, "room":event.SpaceName, "link":create_link(event.EventId), "length":event.EventLength});
        });
      console.log(event_array);
      create_slide();
      });
});
