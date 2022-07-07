interface colors_array { body: string, text: string }[];
interface colors_array extends Array<colors_array>{};

let config_object:{ library_id: string, name: string, rotation_speed: number, font: string , colors:colors_array, show_qr_code: boolean};
let event_array:any = [];
let layout_array:any = ["left","right","middle","top","bottom"];
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
  return "";
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

function choose_layout_index()
{
  return Math.floor(Math.random()* layout_array.length);
}


function progress_bar(color_index)
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

function get_heading_size(length)
{
  console.log(length);

  let size:string;
  switch(true) {
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

function random_color_index()
{

return Math.floor(Math.random()* config_object.colors.length);


}

function create_slide()
{

  let color_index = random_color_index();
  let layout_class = layout_array[choose_layout_index()];
  if(container != null)
  {
    
    container.innerHTML = "";
    container.className = "";
    
    let title_element:HTMLHeadingElement = document.createElement("h1");
    let description_element:HTMLElement = document.createElement("p");
    let duration_element:HTMLHeadingElement = document.createElement("h2");
    let date_element:HTMLHeadElement = document.createElement("h2");

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


    let title_text:Text = document.createTextNode(event_array[current_index].title);
    let description_text:Text = document.createTextNode(event_array[current_index].description);
    let duration_text:Text = document.createTextNode(`${event_array[current_index].length} minutes`);
    let date_text:Text = document.createTextNode(event_array[current_index].date);

    title_element.appendChild(title_text);
    description_element.appendChild(description_text);
    duration_element.appendChild(duration_text);
    date_element.appendChild(date_text);

    container.appendChild(title_element);
    container.appendChild(description_element);
    container.appendChild(duration_element);
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
    


    progress_bar(color_index);

    if(current_index < event_array.length - 1)
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
