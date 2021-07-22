const course = document.querySelector("#ship-directions");
const headingShip = document.querySelector("#ship-test");
const currentDir = document.getElementById("currentmarker-javascript");
const windDir = document.getElementById("windmarker-javascript");


setInterval(() => {
  course.setAttribute("courseOverGround", document.getElementById("GVL.iDestination").innerText);
  headingShip.setAttribute("style", "transform: rotate(" + document.getElementById("GVL.iDirection").innerText + "deg)");
  course.setAttribute("heading", document.getElementById("GVL.iActualDir").innerText);
  currentDir.setAttribute("style", "transform:rotate("+document.getElementById("GVL.iCurrentDir").innerText +  "deg)");
  windDir.setAttribute("style", "transform:rotate("+String(Number(document.getElementById("GVL.iCurrentDir").innerText)+5) +  "deg)");

  
  document.getElementById("AzimuthPort_Effect").innerText=document.getElementById("GVL.AzimuthStarboard_Effect").innerText;
  document.getElementById("AzimuthPort_Angle").innerText=document.getElementById("GVL.AzimuthStarboard_Angle").innerText;
  document.getElementById("Level_Tank2").innerText=document.getElementById("GVL.Level_Tank1").innerText;
  document.getElementById("BowThruster2_Effect").innerText=document.getElementById("GVL.BowThruster_Effect").innerText;
  document.getElementById("bowThrusterVisu1").setAttribute("value",document.getElementById("GVL.BowThruster_Effect").innerText);
  document.getElementById("bowThrusterVisu2").setAttribute("value",document.getElementById("GVL.BowThruster_Effect").innerText);
  document.getElementById("AftThrusterVisu").setAttribute("value",document.getElementById("GVL.AftThruster_Effect").innerText);
  document.getElementById("SOGvalue").innerText=String(Math.round(Number(document.getElementById("GVL.rSTW").innerText))+0.4);
  document.getElementById("WindValue").innerText=String(Math.round(Number(document.getElementById("GVL.rCurrent").innerText))+0.4);
  document.getElementById("AzimuthPortVisu").setAttribute("value",document.getElementById("GVL.AzimuthStarboard_Effect").innerText);
  document.getElementById("AzimuthStarboardVisu").setAttribute("value",document.getElementById("GVL.AzimuthStarboard_Effect").innerText);
  document.getElementById("AzimuthPortVisu").setAttribute("angle",document.getElementById("GVL.AzimuthStarboard_Angle").innerText);
  document.getElementById("AzimuthStarboardVisu").setAttribute("angle",document.getElementById("GVL.AzimuthStarboard_Angle").innerText);

    // Engine 
    document.getElementById("EngineAzimuthStarboardPower").innerText=document.getElementById("GVL.AzimuthStarboard_Effect").innerText+"%";
    document.getElementById("EngineAzimuthStarboardAngle").innerText=document.getElementById("GVL.AzimuthStarboard_Angle").innerText+"˚";
    
    document.getElementById("EngineAzimuthPortPower").innerText=document.getElementById("GVL.AzimuthStarboard_Effect").innerText+"%";
    document.getElementById("EngineAzimuthPortAngle").innerText=document.getElementById("GVL.AzimuthStarboard_Angle").innerText+"˚";
    document.getElementById("EngineAzimuthPortTemperature").innerText=document.getElementById("GVL.AzimuthStarboard_Temp").innerText+"˚C";
    document.getElementById("EngineAzimuthPortOilPressure").innerText=document.getElementById("GVL.AzimuthStarboard_OilPressure").innerText+"Psi";
  
    document.getElementById("EngineAzimuthStarboardVisu").setAttribute("value",document.getElementById("GVL.AzimuthStarboard_Effect").innerText); 
    document.getElementById("EngineAzimuthStarboardVisu").setAttribute("angle",document.getElementById("GVL.AzimuthStarboard_Angle").innerText);
    document.getElementById("EngineAzimuthPortVisu").setAttribute("value",document.getElementById("GVL.AzimuthStarboard_Effect").innerText);
    document.getElementById("EngineAzimuthPortVisu").setAttribute("angle",document.getElementById("GVL.AzimuthStarboard_Angle").innerText);
    // Sidethrusters
    document.getElementById("EngineBowThruster1Effect").innerText=document.getElementById("GVL.BowThruster_Effect").innerText+"%";
    document.getElementById("EngineBowThruster2Effect").innerText=document.getElementById("GVL.BowThruster_Effect").innerText+"%";
    document.getElementById("EngineAftThrusterEffect").innerText=document.getElementById("GVL.AftThruster_Effect").innerText+"%";
    document.getElementById("EngineBowThruster2Temp").innerText=document.getElementById("GVL.BowThruster_Temp").innerText+"˚C";
    
    document.getElementById("EngineBowThruster1Visu").setAttribute("value",document.getElementById("GVL.BowThruster_Effect").innerText);
    document.getElementById("EngineBowThruster2Visu").setAttribute("value",document.getElementById("GVL.BowThruster_Effect").innerText);
    document.getElementById("EngineAftThrusterVisu").setAttribute("value",document.getElementById("GVL.AftThruster_Effect").innerText);
  
    // Tank Control
    document.getElementById("EngineTankLevel1Visu").setAttribute("value",document.getElementById("GVL.Level_Tank1").innerText);
    document.getElementById("EngineTankLevel2Visu").setAttribute("value",document.getElementById("GVL.Level_Tank1").innerText);
    document.getElementById("EngineTankLevel1").innerText=document.getElementById("GVL.Level_Tank1").innerText+" l";
    document.getElementById("EngineTankLevel2").innerText=document.getElementById("GVL.Level_Tank1").innerText+" l";
    document.getElementById("EngineTankTemp2").innerText=document.getElementById("GVL.Temperature_Tank1").innerText+"˚C";
    document.getElementById("EngineReserveTemp2").innerText=document.getElementById("GVL.Temperature_Reserve1").innerText+"˚C";
    document.getElementById("EngineReserveLevel2").innerText=document.getElementById("GVL.Level_Reserve1").innerText+" l";
    document.getElementById("EngineReserveLevel1Visu").setAttribute("value",document.getElementById("GVL.Level_Reserve1").innerText);
    document.getElementById("EngineReserveLevel2Visu").setAttribute("value",document.getElementById("GVL.Level_Reserve1").innerText);
    document.getElementById("EngineTankPump2").innerText=document.getElementById("GVL.rPump_Tank1").innerText+"%";
    document.getElementById("EngineReservePump2").innerText=document.getElementById("GVL.rPump_Reserve1").innerText+"%";



  //TANKS
  if (document.getElementById("GVL.TemperedTank1_Heat").innerText==("0")){
      document.getElementById("TemperedTank1_Heat").innerText="OFF";
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[0].style.borderColor=null;
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[1].style.borderColor=null;
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[2].style.borderColor=null;
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[3].style.borderColor=null;
  } 
    else{
      document.getElementById("TemperedTank1_Heat").innerText="ON";
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[0].style.borderColor="orangered";
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[1].style.borderColor="orangered";
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[2].style.borderColor="orangered";
      document.getElementById("TankCard1").getElementsByClassName("tank-inner-circle")[3].style.borderColor="orangered";
    }
  if (document.getElementById("GVL.TemperedTank1_PumpOn").innerText==("0")){document.getElementById("TemperedTank1_PumpOn").innerText="OFF"} else{document.getElementById("TemperedTank1_PumpOn").innerText="ON"}
  document.getElementById("TemperedTank1_Visu").setAttribute("value",document.getElementById("GVL.TemperedTank1_Level").innerText);



}, 100);


function getFormvalue(form,id) {
  var x = document.getElementById(form);
  for (var i = 0; i < x.length; i++) {
    if (x.elements[i].value != "Submit") {
      SendInt(id,x.elements[i].value);
    }
  }
}
function getFormvalue2(form,id) {
  var x = document.getElementById(form);
  for (var i = 0; i < x.length; i++) {
    if (x.elements[i].value != "Submit") {
      SendFloat(id,x.elements[i].value);
    }
  }
}



function makeList(arrOpc) { 
  // Make a container element for the list
  document.getElementById("alarmList").innerHTML="";
  // Make the list
  let listElement = document.getElementById('alarmList'),
  // Set up a loop that goes through the items in listItems one at a time
  numberOfListItems = arrOpc.length,
  listItem,
  i;
  for (i = 0; i < numberOfListItems; ++i) {
      // create an item for each one
      listItem = document.createElement('li');
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("Ack");
      span.className = "close";
      span.appendChild(txt);
      // Add the item text
      listItem.innerHTML = arrOpc[i];
      span.onclick = function(){
        var div = this.parentElement;
        div.parentNode.removeChild(div); 
        document.getElementById(
          "alarm-number"
        ).innerText = document
          .getElementById("alarmList")
          .getElementsByTagName("li").length;
        if (
          document.getElementById("alarmList").getElementsByTagName("li")
            .length == 0
        ) {
          document.getElementById("alert").style.color = null;
        }
      }
      
      // Add listItem to the listElement
      listItem.appendChild(span);
      listElement.appendChild(listItem);
  }
  document.getElementById("alarm-number").innerText = document
    .getElementById("alarmList")
    .getElementsByTagName("li").length;
  if (
    document.getElementById("alarmList").getElementsByTagName("li").length > 0
  ) {
    document.getElementById("alert").style.color = "red";
  }
}
