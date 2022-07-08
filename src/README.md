# Public Library Events Slideshow
A TypeScript based slideshow of events using the the Evanced Signups calender API

## Installation / Usage

- Download build folder
- Add files to your webserver
- Update the main.json file with your information.  Library name / library ID  EX: https://YOURLIBRARYID.evanced.info/signup
- Go to your servers URL and let the browser run

## main.json Example
{
    "name" : "Amling Public Library", 
    "library_id" : "yourlibraryid",
    "rotation_speed" : 30,
    "font" : "Open Sans, Arial, Helvetica, sans-serif",
    "logo": "Library_Logo.jpeg",
    "alert" : "This is an alert!",
    "show_qr_code": true,
    "colors" : [
        {"body": "#2f7278", "text": "white"},
        {"body": "#97cc39", "text": "white"},
        {"body": "#97cc39", "text": "black"}
        ]
}

## Contributors

Chris Amling
