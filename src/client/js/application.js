/* Global Variables */
let baseURL =  `http://api.openweathermap.org/data/2.5/weather?zip=`
let apiKey = ",us&appid=f4c51fac335032b01346acc3abf36e19";
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const newZip=  document.getElementById('zip').value;
  console.log('newzip:'+newZip);
    const feelings=document.getElementById('feelings').value;
    console.log('you feel:'+feelings);
    //----------------------------------------------
    getWeather(baseURL, newZip, apiKey)
    .then(function(data){
      console.log(data);
        postData('/addWeather', { temp:data.main.temp, date:newDate,feelings:feelings ,city:data.name});
        console.log('the city is :'+data.name);
    })
       .then(
        updateUI()
      )
    }
   // ------get the url with the user zip--------------------------
    const getWeather = async (baseURL, zip, key)=>{
      const res = await fetch(baseURL+zip+key)
      try {
      const data = await res.json();
        return data;
      }  catch(error) {
        console.log("error", error);
      }
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
//------------------getData------------------------------------------
// Async GET
const getData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const Data = await request.json()
  return data;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
//--------------updateUI function--------------------------------------
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const c =allData[0].temp-273;
      var num = c.toFixed(2);
      console.log("this is the temp in c:"+num);
      document.getElementById('date').innerHTML = " Today is "+allData[0].date;
      document.getElementById('city').innerHTML = " in "+allData[0].city;
      document.getElementById('temp').innerHTML = " The tempreture is "+(num)+' °C';
      document.getElementById('content').innerHTML = " and you feel: "+allData[0].feelings;
  
    }catch(error){
      console.log("error", error);
    }
}
//----------------------------------------------------------
  
