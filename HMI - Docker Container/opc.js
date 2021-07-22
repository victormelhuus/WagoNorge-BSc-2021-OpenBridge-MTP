const opcua = require("node-opcua");

console.log(`OPC.JS RUNNING. allowAnonymous: true`);

const options = {
  endpoint_must_exist: false,
  keepSessionAlive: true,
  allowAnonymous: true, 
};
const client = opcua.OPCUAClient.create(options);
// const endpointUrl = "opc.tcp://192.168.10.20:4840"
var endpointUrl = "opc.tcp://192.168.10.17:4840";
var opcuaAppID = "WAGO OPCUA TP600";


async function main() {
  try {
    // step 1 : connect to
    console.log("trying to connect to " + endpointUrl);
    await client.connect(endpointUrl);
    console.log(" connected to ", endpointUrl);

    // step 2 : createSession

    const session = await client.createSession();
    console.log("session created !");

    // step 5: install a subscription and install a monitored item for 10 seconds
    const subscription = opcua.ClientSubscription.create(session, {
      requestedPublishingInterval: 100,
      requestedLifetimeCount: 6000,
      requestedMaxKeepAliveCount: 20,
      maxNotificationsPerPublish: 1000,
      publishingEnabled: true,
      priority: 10,
    });

    function identifier(id) {
      const str = id.substring(id.indexOf(".") + 13);
      return str;
    }
    async function MonitorItem(id) {
      var itemToMonitor = {
        nodeId: id,
        attributeId: opcua.AttributeIds.Value,
      };
      const parameters = {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 100,
      };

      var msgSend = identifier(id);
      var monitoredItem = await subscription.monitor(
        itemToMonitor,
        parameters,
        opcua.TimestampsToReturn.Both
      );
      monitoredItem.on("changed", (dataValue) => {
        var msg = [msgSend, Math.floor(dataValue.value.value*10)/10];
        console.log(" value has changed for: ",msg[0], msg[1]);
        process.send(msg);
      });
    }
	
	
	var opcuaAppIDString = "ns=4;s=|var|" + opcuaAppID;
	
    //INPUT ALL ITEMS FOR MONITORING
    //Control system
    MonitorItem(opcuaAppIDString + ".Application.GVL.iDirection");
    MonitorItem(opcuaAppIDString + ".Application.GVL.iActualDir");
    MonitorItem(opcuaAppIDString + ".Application.GVL.iDestination");
    MonitorItem(opcuaAppIDString + ".Application.GVL.rCurrent");
    MonitorItem(opcuaAppIDString + ".Application.GVL.rSTW");
    MonitorItem(opcuaAppIDString + ".Application.GVL.iCurrentDir");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AutoPilot");
    
    //Engine
    MonitorItem(opcuaAppIDString + ".Application.GVL.BowThruster_Effect");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AftThruster_Effect");
    MonitorItem(opcuaAppIDString + ".Application.GVL.BowThruster_Temp");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AftThruster_Temp");

    MonitorItem(opcuaAppIDString + ".Application.GVL.AzimuthStarboard_Effect");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AzimuthStarboard_Angle");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AzimuthStarboard_Temp");
    MonitorItem(opcuaAppIDString + ".Application.GVL.AzimuthStarboard_OilPressure");

    // Tank Control
    MonitorItem(opcuaAppIDString + ".Application.GVL.Level_Tank1");
    MonitorItem(opcuaAppIDString + ".Application.GVL.Temperature_Tank1");
    MonitorItem(opcuaAppIDString + ".Application.GVL.Level_Reserve1");
    MonitorItem(opcuaAppIDString + ".Application.GVL.Temperature_Reserve1");
    MonitorItem(opcuaAppIDString + ".Application.GVL.rPump_Tank1");
    MonitorItem(opcuaAppIDString + ".Application.GVL.rPump_Reserve1");
    
 
   

    //Tanks
    MonitorItem(opcuaAppIDString + ".Application.GVL.TemperedTank1_Level");
    MonitorItem(opcuaAppIDString + ".Application.GVL.TemperedTank1_Temp");
    MonitorItem(opcuaAppIDString + ".Application.GVL.TemperedTank1_Heat");
    MonitorItem(opcuaAppIDString + ".Application.GVL.TemperedTank1_PumpOn");
    MonitorItem(opcuaAppIDString + ".Application.GVL.TemperedTank1_PumpEffect");
    MonitorItem(opcuaAppIDString + ".Application.Tempered_Tank.Set_Temp_1.VMan");

    //Lights
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_1.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_2.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_3.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_4.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_5.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_6.VMan");
    MonitorItem(opcuaAppIDString + ".Application.Search_Lights.Light_Switch_7.VMan");

    //ALARM
    MonitorItem(opcuaAppIDString + ".Application.Tank_Control.Level_Tank1_Mon.VALAct");
    MonitorItem(opcuaAppIDString + ".Application.Tank_Control.Level_Tank1_Mon.VWLAct");
    process.on("message", (m) => {
      test(m[0], m[1]);
    });
    async function test(id, value) {
      await session.writeSingleNode(
        opcuaAppIDString + ".Application." + id,
        value
      );
    }

    async function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await timeout(3600000);

    console.log("now terminating subscription");
    await subscription.terminate();

    // close session
    await session.close();

    // disconnecting
    await client.disconnect();
    console.log("done !");
  } catch (err) {
    console.log("An error has occured : ", err);

    // close session
    await client.close();

    // disconnecting
    await client.disconnect();
    console.log("done !");
  }
}
main();
