const weatherNow = async (city: any) => {
  const appId: string = `d35b71595a40920a3df089572ef115d9`;
  const weather: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appId}&units=metric`;
  const forecast: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;

  const resultDaily: Response = await fetch(weather);
  const resultHourly: Response = await fetch(forecast);

  const dataHourly: any = await resultDaily.json();
  const dataDaily: any = await resultHourly.json();

  const currentDate: Date = new Date();
  const currentDay: number = currentDate.getDate();
  const dayNames: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const currentDayFull: string = dayNames[currentDate.getDay() - 1];

  const monthNames: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthFull: string = monthNames[currentDate.getMonth()];

  const location: HTMLElement = document.querySelector(".main__city");
  const date: HTMLElement = document.querySelector(".main__date");
  const temp: HTMLElement = document.querySelector(".main__temp");
  const weatherType: HTMLElement = document.querySelector(".main__weather__type");
  const highest: HTMLElement = document.querySelector(".highest");
  const lowest: HTMLElement = document.querySelector(".lowest");
  const wind: HTMLElement = document.querySelector(".wind");
  const sunrise: HTMLElement = document.querySelector(".sunrise");
  const sunset: HTMLElement = document.querySelector(".sunset");
  const humidity: HTMLElement = document.querySelector(".humidity");
  const icon: HTMLElement = document.querySelector(".main__icon");
  const body: HTMLElement = document.querySelector("body");

  const sunsetDate: string = new Date(dataDaily.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
  const sunriseDate: string = new Date(dataDaily.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

  date.textContent = `${currentDayFull} ${currentDay} ${currentMonthFull}`;
  location.textContent = `${dataDaily.name}, ${dataHourly.city.country}`;
  temp.textContent = `${Math.round(dataDaily.main.temp)}°`;
  weatherType.textContent = dataDaily.weather[0].description;
  highest.textContent = `${Math.round(dataDaily.main.temp_max)}°`;
  lowest.textContent = `${Math.round(dataDaily.main.temp_min)}°`;
  wind.textContent = `${dataDaily.wind.speed.toFixed(1)}mph`;
  sunrise.textContent = sunriseDate;
  sunset.textContent = sunsetDate;
  humidity.textContent = `${dataDaily.main.humidity}%`;

  icon.innerHTML = `<img src="./images//icons/${dataDaily.weather[0].main.toLowerCase()}.png" class="main__weather__image">`;
  body.style.background = `url("./images/bg/${dataDaily.weather[0].main.toLowerCase()}_bg.jpg") no-repeat center center / cover`;

  const cardsTime: NodeListOf<HTMLElement> = document.querySelectorAll(".time");
  const cardTimeCalc = () => {
    let i: number;
    for (i = 0; i < cardsTime.length; i++) {
      const cardTimeValue: Date = new Date(dataHourly.list[i].dt * 1000);
      const hours: number = cardTimeValue.getHours();
      cardsTime[i].textContent = hours >= 12 ? hours + "pm" : hours + "am";
    }
  };
  cardTimeCalc();

  const cardsIcon: NodeListOf<HTMLElement> = document.querySelectorAll(".icon");
  const cardIconCalc = () => {
    let i: number;
    for (i = 0; i < cardsIcon.length; i++) {
      cardsIcon[i].innerHTML = `<img src="./images/icons/${dataHourly.list[i].weather[0].main.toLowerCase()}.png">`;
    }
  };
  cardIconCalc();

  const cardsTemp: NodeListOf<HTMLElement> = document.querySelectorAll(".temp");
  const cardTempCalc = () => {
    let i: number;
    for (i = 0; i < cardsTemp.length; i++) {
      cardsTemp[i].textContent = `${Math.round(dataHourly.list[i].main.temp)}°`;
    }
  };
  cardTempCalc();
};

const findLocation = () => {
  const success = async (position: any) => {
    const latitude: number = position.coords.latitude;
    const longitude: number = position.coords.longitude;
    const geoApiUrl: string = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const geoApiResult: Response = await fetch(geoApiUrl);
    const geoApiResponse: any = await geoApiResult.json();
    weatherNow(geoApiResponse.locality);
  };
  const error = () => {
    alert("unable to retrieve your position");
    weatherNow("Kyiv");
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

findLocation();

const form: HTMLFormElement = document.querySelector(".main__aside");
const scrollRow: HTMLElement = document.querySelector(".main__hourly__row");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData: FormData = new FormData(form);
  const city: FormDataEntryValue = formData.get("city__name");
  const citySearch = city.toString().trim();
  weatherNow(citySearch);
  const input: HTMLFormElement = document.querySelector(".main__search");
  input.value = "";
});

scrollRow.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollRow.scrollLeft += e.deltaY * 1.2;
});
