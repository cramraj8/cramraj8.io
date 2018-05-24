// Generate a new random MQTT client id on each page load
var MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client("iot.eclipse.org", 80, "/ws", MQTT_CLIENT_ID);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });

// This is the function which handles button clicks
function myButtonWasClicked() {

  // Lights on feedback starts here ===========================================

  // Get the data
  var rates = document.getElementsByName('bulb');
  var rate_value;
  for(var i = 0; i < rates.length; i++){
      if(rates[i].checked){
          rate_value = rates[i].value;
      }
  }
  var res_bulb_number = rate_value.charAt(4);
  // var res_bulb_number_int = parseInt(res_bulb_number);

  var messageHTML = $("<p>"+ (res_bulb_number) +"</p>");
  // $("#updateMe").prepend(messageHTML);

  // create a new MQTT message with a specific payload
  // var mqttMessage = new Paho.MQTT.Message("Hello from website");
  var mqttMessage = new Paho.MQTT.Message(res_bulb_number);

  // Set the topic it should be published to
  mqttMessage.destinationName = "group13/tolamp";

  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
}


// =============================================================================
// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
  MQTT_CLIENT.subscribe("group13/tolamp");
}


// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
  MQTT_CLIENT.subscribe("group13/tolamp");
}
// =============================================================================
// This is the function which handles received messages
function myMessageArrived(message) {

  // Data comes like string of bits: '01011'
  // Get the payload
  var messageBody = message.payloadString;

  // Extract data from message
  lamp1 = messageBody.charAt(0);
  lamp2 = messageBody.charAt(1);
  lamp3 = messageBody.charAt(2);
  lamp4 = messageBody.charAt(3);
  lamp5 = messageBody.charAt(4);


  // Create a new HTML element wrapping the message payload
  var messageHTML = $("<p>"+messageBody+"</p>");
  // var messageHTML = $("<p>"+ lamp1 + lamp2 + lamp3 + lamp4 + lamp5 +"</p>");

  // Insert it inside the ```id=updateMe``` element above everything else that is there
  // $("#updateMe").prepend(messageHTML);

  if (lamp1 == "1") {
      $("input[id=lamp1_radio]").attr('disabled', true);
      if($('#lamp1_radio').is(':checked')) {
        // $("#updateMe").prepend("<p>"+ "Lamp 1 checked" +"</p>");
        document.getElementById("Feedback-button-clicked").innerHTML="Light-1 on !!!!";
      }
  }else{
    if($('#lamp1_radio').is(':checked')) {
      document.getElementById("Feedback-button-clicked").innerHTML="Nothing Happened!";
    }
  }
  if (lamp2 == "1"){
      $("input[id=lamp2_radio]").attr('disabled', true);
      if($('#lamp2_radio').is(':checked')) {
        // $("#updateMe").prepend("<p>"+ "Lamp 2 checked" +"</p>");
        document.getElementById("Feedback-button-clicked").innerHTML="Light-2 on !!!!";
      }
  }else{
    if($('#lamp2_radio').is(':checked')) {
      document.getElementById("Feedback-button-clicked").innerHTML="Nothing Happened!";
    }
  }
  if (lamp3 == "1"){
      $("input[id=lamp3_radio]").attr('disabled', true);
      if($('#lamp3_radio').is(':checked')) {
        // $("#updateMe").prepend("<p>"+ "Lamp 3 checked" +"</p>");
        document.getElementById("Feedback-button-clicked").innerHTML="Light-3 on !!!!";
      }
  }else{
    if($('#lamp3_radio').is(':checked')) {
      document.getElementById("Feedback-button-clicked").innerHTML="Nothing Happened!";
    }
  }
  if (lamp4 == "1"){
      $("input[id=lamp4_radio]").attr('disabled', true);
      if($('#lamp4_radio').is(':checked')) {
        // $("#updateMe").prepend("<p>"+ "Lamp 4 checked" +"</p>");
        document.getElementById("Feedback-button-clicked").innerHTML="Light-4 on !!!!";
      }
  }else{
    if($('#lamp4_radio').is(':checked')) {
      document.getElementById("Feedback-button-clicked").innerHTML="Nothing Happened!";
    }
  }
  if (lamp5 == "1"){
      $("input[id=lamp5_radio]").attr('disabled', true);
      if($('#lamp5_radio').is(':checked')) {
        // $("#updateMe").prepend("<p>"+ "Lamp 5 checked" +"</p>");
        document.getElementById("Feedback-button-clicked").innerHTML="Light-5 on !!!!";
      }
  }else{
    if($('#lamp5_radio').is(':checked')) {
      document.getElementById("Feedback-button-clicked").innerHTML="Nothing Happened!";
    }
  }
// -----------------------------------------------------------------------------





  // if (messageBody == "0") {
  //     document.getElementById("Feedback-button-clicked").innerHTML="Lights on !!!!";
  // } else{
  //     document.getElementById("Feedback-button-clicked").innerHTML="Lights off !!";
  //     $("input[id=lamp1_radio]").attr('disabled', true);
  // }


};
// =============================================================================


// // This is the function which handles received messages
// function myMessageArrived(message) {
//   // Get the payload
//   var messageBody = message.payloadString;

//   // Create a new HTML element wrapping the message payload
//   var messageHTML = $("<p>"+messageBody+"</p>");

//   // Insert it inside the ```id=updateMe``` element above everything else that is there
//   $("#updateMe").prepend(messageHTML);
  // document.getElementById("turnon-span").innerHTML = messageHTML;

  // Lights on feedback starts here ===========================================
  // if (messageHTML == 1) {
  //     document.getElementById("Light-on-off-text").innerHTML="Lights on";
  // if (messageHTML == 1) {
  //     document.getElementById("Feedback-button-clicked").innerHTML="Lights on 1";
  // } else if (messageHTML == 2) {
  //     document.getElementById("Feedback-button-clicked").innerHTML="Lights OFF 2 !!";
  // } else{
  //     document.getElementById("Feedback-button-clicked").innerHTML="Lights ELSE !!";
  // }

  // ===========================================================================




// Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives
MQTT_CLIENT.onMessageArrived = myMessageArrived;


