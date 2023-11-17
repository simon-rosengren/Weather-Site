//---------
//Variables
//---------

//Document Variables
let city = document.querySelector(".city");
let temp = document.querySelector(".weather");
let condition = document.querySelector(".condition");
let lastUpdate = document.querySelector(".lastUpdate");
let updateBtnEl = document.querySelector(".update");

//API Variables
const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=Stockholm";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a75947f78dmsh644e6275398ebd3p192e2cjsn7b551dc5b4ac",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

//---------
//Functions
//---------

//Get Data from API and returns it as a json
async function getData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

//Function for button press
function handleUpdateBtn() {
  let currentTime = getTime("digital");

  let data = getData();

  data.then((data) => {
    city.innerHTML = data.location.name;
    temp.innerHTML = `It is ${data.current.temp_c} °C degrees outside`;
    condition.innerHTML = data.current.condition.text;
    lastUpdate.innerHTML = `Last updated: ${currentTime}`;
  });

  updateBackground();
}

//Updates background image based on time of day
function updateBackground() {
  if (getTime("hours") > 20 || getTime("hours") < 5) {
    document.body.style.backgroundImage = "url(assets/night.png)";
  } else if (getTime("hours") > 15) {
    document.body.style.backgroundImage = "url(assets/evening.png";
  } else if (getTime("hours") > 9) {
    document.body.style.backgroundImage = "url(assets/day.png";
  } else {
    document.body.style.backgroundImage = "url(assets/morning.png";
  }
}

//Returns hours if parameter is hours and
//in digital format if parameter is digital
function getTime(type) {
  const now = new Date();
  let time;

  if (type === "digital") {
    time =
      now.getHours() +
      ":" +
      (now.getMinutes() < 10 ? "0" : "") +
      now.getMinutes();
  } else if (type === "hours") {
    time = now.getHours();
  }

  return time;
}

//Run it on reload to update data
handleUpdateBtn();

//---------------
//Event Listeners
//---------------
updateBtnEl.addEventListener("click", handleUpdateBtn);
