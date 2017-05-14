function $ (obj) {
    return document.querySelector(obj);
}
var date = $("time"),
    address = $("#address"),
    icon = $(".iconfont"),
    lowTemp = $("#lowTemp"),
    highTemp = $("#highTemp"),
    detailWeather = $("#detailWeather"),
    windDirect = $("#windDirect"),
    windPower = $("#windPower");
var httpRequest = new XMLHttpRequest();
var url = "http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a1";
if (httpRequest != null) {
    httpRequest.open("GET", url, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            console.log("success");
            writeData();
        } else {
            console.log("wrong! status is " + httpRequest.status);
        }
    }
}
function writeData () {
    var data = JSON.parse(httpRequest.responseText);
    var day = new Date(data.list[0].dt * 1000);
    var week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    date.innerHTML = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate() + "  " + week[day.getDay()];
    address.innerHTML = data.city.name;
    switch(data.list[0].weather[0].main) {
        case "Clear":
            icon.className = "iconfont icon-weather0";
            break;
        case "Clouds":
            icon.className = "iconfont icon-duoyun";
            break;
        case "Rain":
            icon.className = "iconfont icon-yu";
            break;
    }
}
