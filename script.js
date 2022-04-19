var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
var weatherNow = function (city) {
  return __awaiter(_this, void 0, void 0, function () {
    var appId,
      weather,
      forecast,
      resultDaily,
      resultHourly,
      dataHourly,
      dataDaily,
      currentDate,
      currentDay,
      dayNames,
      currentDayFull,
      monthNames,
      currentMonthFull,
      location,
      date,
      temp,
      weatherType,
      highest,
      lowest,
      wind,
      sunrise,
      sunset,
      humidity,
      icon,
      main,
      body,
      sunsetDate,
      sunriseDate,
      cardsTime,
      cardTimeCalc,
      cardsIcon,
      cardIconCalc,
      cardsTemp,
      cardTempCalc;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          appId = "d35b71595a40920a3df089572ef115d9";
          weather = "https://api.openweathermap.org/data/2.5/forecast?q="
            .concat(city, "&appid=")
            .concat(appId, "&units=metric");
          forecast = "https://api.openweathermap.org/data/2.5/weather?q="
            .concat(city, "&appid=")
            .concat(appId, "&units=metric");
          return [4 /*yield*/, fetch(weather)];
        case 1:
          resultDaily = _a.sent();
          return [4 /*yield*/, fetch(forecast)];
        case 2:
          resultHourly = _a.sent();
          return [4 /*yield*/, resultDaily.json()];
        case 3:
          dataHourly = _a.sent();
          return [4 /*yield*/, resultHourly.json()];
        case 4:
          dataDaily = _a.sent();
          console.log(dataDaily);
          console.log(dataHourly);
          currentDate = new Date();
          currentDay = currentDate.getDate();
          dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          currentDayFull = dayNames[currentDate.getDay() - 1];
          monthNames = [
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
          currentMonthFull = monthNames[currentDate.getMonth()];
          location = document.querySelector(".main__city");
          date = document.querySelector(".main__date");
          temp = document.querySelector(".main__temp");
          weatherType = document.querySelector(".main__weather__type");
          highest = document.querySelector(".highest");
          lowest = document.querySelector(".lowest");
          wind = document.querySelector(".wind");
          sunrise = document.querySelector(".sunrise");
          sunset = document.querySelector(".sunset");
          humidity = document.querySelector(".humidity");
          icon = document.querySelector(".main__icon");
          main = document.querySelector(".main");
          body = document.querySelector("body");
          sunsetDate = new Date(dataDaily.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
          sunriseDate = new Date(dataDaily.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
          date.textContent = "".concat(currentDayFull, " ").concat(currentDay, " ").concat(currentMonthFull);
          location.textContent = "".concat(dataDaily.name, ", ").concat(dataHourly.city.country);
          temp.textContent = "".concat(Math.round(dataDaily.main.temp), "\u00B0");
          weatherType.textContent = dataDaily.weather[0].description;
          highest.textContent = "".concat(Math.round(dataDaily.main.temp_max), "\u00B0");
          lowest.textContent = "".concat(Math.round(dataDaily.main.temp_min), "\u00B0");
          wind.textContent = "".concat(dataDaily.wind.speed.toFixed(1), "mph");
          sunrise.textContent = sunriseDate;
          sunset.textContent = sunsetDate;
          humidity.textContent = "".concat(dataDaily.main.humidity, "%");
          icon.innerHTML = '<img src="./images//icons/'.concat(
            dataDaily.weather[0].main.toLowerCase(),
            '.png" class="main__weather__image">'
          );
          body.style.background = 'url("./images/bg/'.concat(
            dataDaily.weather[0].main.toLowerCase(),
            '_bg.jpg") no-repeat center center / cover'
          );
          cardsTime = document.querySelectorAll(".time");
          cardTimeCalc = function () {
            var i;
            for (i = 0; i < cardsTime.length; i++) {
              var cardTimeValue = new Date(dataHourly.list[i].dt * 1000);
              var hours = cardTimeValue.getHours();
              cardsTime[i].textContent = hours >= 12 ? hours + "pm" : hours + "am";
            }
          };
          cardTimeCalc();
          cardsIcon = document.querySelectorAll(".icon");
          cardIconCalc = function () {
            var i;
            for (i = 0; i < cardsIcon.length; i++) {
              cardsIcon[i].innerHTML = '<img src="./images/icons/'.concat(
                dataHourly.list[i].weather[0].main.toLowerCase(),
                '.png">'
              );
            }
          };
          cardIconCalc();
          cardsTemp = document.querySelectorAll(".temp");
          cardTempCalc = function () {
            var i;
            for (i = 0; i < cardsTemp.length; i++) {
              cardsTemp[i].textContent = "".concat(Math.round(dataHourly.list[i].main.temp), "\u00B0");
            }
          };
          cardTempCalc();
          return [2 /*return*/];
      }
    });
  });
};
weatherNow("Kyiv");
var form = document.querySelector(".main__aside");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(form);
  var citySearch = formData.get("city__name");
  weatherNow(citySearch);
  var input = document.querySelector(".main__search");
  input.value = "";
  // showAnim();
});
// const showAnim = () => {
//   const mainDaily: HTMLElement = document.querySelector(".main__current");
//   const mainHourly: HTMLElement = document.querySelector(".main__hourly");
//   mainDaily.classList.add("loaded");
//   // setTimeout(() => {
//   //   mainDaily.classList.remove("loaded");
//   // }, 1000);
//   setTimeout(() => {
//     mainHourly.classList.add("loaded");
//   }, 500);
//   // setTimeout(() => {
//   //   mainHourly.classList.remove("loaded");
//   // }, 1500);
// };
var scrollRow = document.querySelector(".main__hourly__row");
scrollRow.addEventListener("wheel", function (e) {
  e.preventDefault();
  scrollRow.scrollLeft += e.deltaY / 3;
});
// showAnim();
