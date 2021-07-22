var menu_btn_toggle = false;
var active_id = "";
var active_theme = "";

//Onload function
function initialFunction() {
  openTabs("Home");
  menu_btn_pressed();
  activeTheme();
}

//Opening and closing drop-down menu
function menu_btn_pressed() {
  this.menu_btn_toggle = !this.menu_btn_toggle;
  console.log(menu_btn_toggle);
  if (menu_btn_toggle) {
    var menubtn = document.getElementById("menubtn");
    menubtn.classList.add("ob-active");

    var sideNavMenu = document.getElementById("side-nav-menu");
    sideNavMenu.classList.add("ob-active");
  } else if (!menu_btn_toggle) {
    var element = document.getElementById("menubtn");
    element.classList.remove("ob-active");

    var sideNavMenu = document.getElementById("side-nav-menu");
    sideNavMenu.classList.remove("ob-active");
  }
}
//Takes id-tag of the tab that is clicked and adds displayTab-class
function openTabs(tabClicked) {
  menu_btn_pressed();
  closeTabs("displayTab");
  //Adds tab-name to the top navigation bar

  document.getElementById("sectionName").innerHTML = tabClicked;

  console.log(tabClicked);
  var id = tabClicked + "Tab";
  console.log(id);
  document.getElementById(id).classList.add("displayTab");
}
//Goes through all elements and removes the cl
function closeTabs(className) {
  var displayed = document.getElementsByClassName(className);
  for (i = 0; i < displayed.length; i++) {
    displayed[i].classList.remove(className);
  }
}
// Opening the Right Menus
function toggleRightMenu(id) {
  var idName = id + "Tab";
  document.getElementById(idName).classList.toggle("show");
  document.getElementById(id).classList.toggle("ob-active");
  console.log(id);
}

function toggleTheme(id) {
  const element = document.getElementsByTagName("html")[0];
  const newTheme = id;
  element.setAttribute("theme", newTheme);
  activeTheme();
}
//looks for What theme it is and makes it active
function activeTheme() {
  theme = document.getElementsByTagName("html")[0].getAttribute("theme");
  const active_theme = document
    .getElementById("changeTheme")
    .getElementsByClassName("ob-active");
  //Removes all "ob-active"-classes
  for (i = 0; i < active_theme.length; i++) {
    active_theme[i].classList.remove("ob-active");
  }
  //Adds "ob-active"-class to current theme
  document.getElementById(theme).classList.add("ob-active");
  customIcon(theme);
}

function toggleById(id) {
  console.log("id: " + id);
  var idTab = id + "Tab";

  if (active_id == "") {
    document.getElementById(id).classList.toggle("ob-active");
    document.getElementById(idTab).classList.toggle("show");
    active_id = id;
  } else if (active_id != id) {
    document.getElementById(active_id).classList.toggle("ob-active");
    document.getElementById(active_id + "Tab").classList.toggle("show");

    document.getElementById(id).classList.toggle("ob-active");
    document.getElementById(idTab).classList.toggle("show");
    active_id = id;
    console.log(active_id);
  } else if (active_id == id) {
    document.getElementById(active_id).classList.remove("ob-active");
    document.getElementById(idTab).classList.remove("show");
    active_id = "";
    console.log(active_id);
  }
}

//Depth graph
function getData() {
  var value = Math.floor(Math.random() * (75-60+1))+60;
  document.getElementById("actual-depth").innerHTML = value;
  return value - 100;
}

var trace1 = {
  y: [getData()],
  fill: "tozeroy",
  fillcolor: getColor("--instrument-track-color"),
  line: { color: getColor("--instrument-dynamic-color") },
};
var layout = {
  width: 150,
  height: 150,
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: getColor("--instrument-frame-color"),
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
  },
  xaxis: {
    showgrid: false,
    showticklabels: false,
  },
  yaxis: {
    color: getColor("--element-active-color"),
    range: [-0, -101],
    showticklabels: false,
    gridcolor: getColor("--element-active-color"),
    dtick: 25,
  },
};
var data = [trace1];

Plotly.plot("chart", data, layout, { displayModeBar: false });

//updates y axis from input
var ctn = 0;
setInterval(function () {
  Plotly.extendTraces("chart", { y: [[getData()]] }, [0]);
  ctn++;
  if (ctn > 25) {
    Plotly.relayout("chart", {
      plot_bgcolor: getColor("--instrument-frame-color"),
      xaxis: {
        range: [ctn - 25, ctn],
        showgrid: false,
        showticklabels: false,
      },
      yaxis: {
        color: getColor("--element-active-color"),
        range: [-0, -101],
        showticklabels: false,
        gridcolor: getColor("--element-active-color"),
        dtick: 25,
      },
    });
    Plotly.restyle(
      "chart",
      {
        "line.color": getColor("--instrument-dynamic-color"),
        fillcolor: getColor("--instrument-track-color"),
      },
      [0]
    );
  }
}, 1000);
//Finds colors from the current theme
function getColor(color) {
  return getComputedStyle(document.documentElement).getPropertyValue(color);
}



// SWITCH CONE ON/OFF
function coneDisplay(myDIV) {
  var x = document.getElementById(myDIV);
  var y = document.getElementById(myDIV + "-overlay");
  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.background = "var(--element-global-color)";
  } else {
    x.style.display = "block";
    y.style.background = "var(--element-neutral-color)";
  }
}
function activeCone(name) {
  document
    .getElementById("angle-slider")
    .setAttribute(
      "onInput",
      "changeAngle(this.value," + "'" + name + "'" + ")"
    );
  document
    .getElementById("brightness-slider")
    .setAttribute(
      "onInput",
      "changeBrightness(this.value," + "'" + name + "'" + ")"
    );
  document.getElementById("light-angle-value").innerText =
    document.getElementById(name).getAttribute("value") + "˚";
  document.getElementById("light-brightness-value").innerText =
    Math.round(document.getElementById(name).style.opacity * 100) + "%";
}

function changeBrightness(x, y) {
  document.getElementById("light-brightness-value").innerText = x + "%";
  document.getElementById(y).style.opacity = x / 100;
}
function changeAngle(x, y) {
  document.getElementById("light-angle-value").innerText = x + "˚";
  document.getElementById(y).style.transform = "rotate(" + x + "deg)";
  document.getElementById(y).setAttribute("value", x);
}

function activeLights(x) {
  document
    .getElementsByClassName("light-pointer-active")[0]
    .classList.remove("light-pointer-active");
  document.getElementById(x).classList.add("light-pointer-active");
}

//add color to custom icons
function customIcon(theme) {
  var x = document.getElementsByClassName("pump-img");
  var i;

  if (theme == "night") {
    for (i = 0; i < x.length; i++) {
      x[i].style.filter =
        "invert(12%) sepia(51%) saturate(7368%) hue-rotate(93deg) brightness(91%) contrast(103%)";
    }
  } else if (theme == "dusk") {
    for (i = 0; i < x.length; i++) {
      x[i].style.filter =
        "invert(57%) sepia(40%) saturate(5354%) hue-rotate(197deg) brightness(103%) contrast(103%)";
    }
  } else if (theme == "day") {
    for (i = 0; i < x.length; i++) {
      x[i].style.filter =
        "invert(46%) sepia(70%) saturate(5978%) hue-rotate(196deg) brightness(101%) contrast(102%)";
    }
  } else if (theme == "bright") {
    for (i = 0; i < x.length; i++) {
      x[i].style.filter =
        "invert(10%) sepia(85%) saturate(6056%) hue-rotate(197deg) brightness(103%) contrast(203%)";
    }
  }
}
