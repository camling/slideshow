
interface colors_array { body: string, text: string }[];
interface colors_array extends Array<colors_array>{}

let config_object:{ library_id: string, name: string, rotation_speed: number, font: string , colors:colors_array, show_qr_code: boolean};
let event_array:any = [];
let current_index:number = 0;
let container = document.getElementById("container") as HTMLElement | null;

function get_current_events()
    {
      async function fetch_all_calendar_events() 
        {
          
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

   
function remove_tags(str:string) {
  if ((str===null) || (str===''))
  return false;
  else
  str = str.toString();
  return str.replace( /(<([^>]+)>)/ig, '');
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

function progress_bar()
{
  let progress_bar:HTMLElement = document.createElement("div");
  let progress_bar_fill:HTMLElement = document.createElement("span");

  progress_bar.classList.add("progress_bar");
  progress_bar_fill.classList.add("progress_bar_fill");
  progress_bar_fill.style.animation = `linear progress-bar ${config_object.rotation_speed}s`;

  progress_bar.appendChild(progress_bar_fill);

  if(container != null)
  {
    container.appendChild(progress_bar);
  }
 
}

function random_color_index()
{

return Math.floor(Math.random()* config_object.colors.length);


}

function create_slide()
{

  let color_index = random_color_index();
  if(container != null)
  {
    container.innerHTML = "";
    


    let title_element:HTMLHeadingElement = document.createElement("h1");
    let description_element:HTMLElement = document.createElement("p");
    let duration_element:HTMLHeadingElement = document.createElement("h2");

    container.classList.add("container");
    container.style.backgroundColor = config_object.colors[color_index].body;
    title_element.classList.add("event_title");
    title_element.style.color = config_object.colors[color_index].text;
    title_element.style.fontFamily = config_object.font;
   
    description_element.classList.add("event_description");
    description_element.style.color = config_object.colors[color_index].text;
    description_element.style.fontFamily = config_object.font;

    duration_element.classList.add("length");
    duration_element.style.color = config_object.colors[color_index].text;
    duration_element.style.fontFamily = config_object.font;


    let title_text:Text = document.createTextNode(event_array[current_index].title);
    let description_text:Text = document.createTextNode(event_array[current_index].description);
    let duration_text:Text = document.createTextNode(`${event_array[current_index].length} minutes`);

    title_element.appendChild(title_text);
    description_element.appendChild(description_text);
    duration_element.appendChild(duration_text);

    container.appendChild(title_element);
    container.appendChild(description_element);
    container.appendChild(duration_element);


    progress_bar();

    if(current_index < event_array.length)
    {
      current_index++;
    }
    else
    {
      current_index = 0;
    }

    setTimeout(create_slide,config_object.rotation_speed * 1000);

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
          let date:Date = new Date(event.EventStart);
          let display_date:string = format_date(date);
          let display_time:string = format_am_pm(date);
          event_array.push({"id":event.EventId, "title":event.Title, "description":remove_tags(event.Description),"date":display_date, "time":display_time, "image":event.Image, "image_alt":event.ImageAlt, "room":event.SpaceName, "link":create_link(event.EventId), "length":event.EventLength});
        });
      console.log(event_array);
      create_slide();
      });
});
