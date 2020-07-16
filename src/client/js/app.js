
/* Global Variables */

const user = "eaboalsoud";
const geoNamesURL = "http://api.geonames.org/searchJSON?name=" + city + "&maxRows=1&username=" + user

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(event){
  event.preventDefault()
    let today = new Date().getTime();
    console.log('today is:'+today);

    let city=  document.getElementById('city').value;
    console.log('city:'+city);
    let startDate =document.getElementById('departing').value;
    console.log('departing:'+startDate);
    let endDate =document.getElementById('returning').value;
    console.log('returning:'+endDate);

    //----------------------------------------------
    
    getGeoData("http://api.geonames.org/searchJSON?name=" + city + "&maxRows=1&username=" + user)
    .then(function (geoResult) {
      postData('http://localhost:8081/travelApp', {
        'latitude': geoResult[0],
        'longitude': geoResult[1],
        'country': geoResult[2],
      })
     });
    }
   //----------------post the Data---------------------------------------
// Async POST
const postData = async ( url = "", data = {} )=>{
  // console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
//------------------function to get data from geonames------------------------------------------

const getGeoData = async (geoNamesURL) => {
  const response = await fetch(geoNamesURL);
  try {
    let geodata = await response.json();
    const lat = geodata.geonames[0].lat;
    const lng = geodata.geonames[0].lng;
    const country = geodata.geonames[0].name;

    const geoResult = [lat, lng, country];
    return geoResult;
  } catch (error) {
    console.log(' Error:', error);
  }
}
//--------------updateUI function--------------------------------------

//----------------------------------------------------------
  
export {performAction}