


   // Initialize Firebase
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyCroIBDbBClIjpzCG1GYSHD9VmE55Sb1w4",
    authDomain: "train-schedule-a3950.firebaseapp.com",
    databaseURL: "https://train-schedule-a3950.firebaseio.com",
    projectId: "train-schedule-a3950",
    storageBucket: "train-schedule-a3950.appspot.com",
    messagingSenderId: "1091255450943"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

  //button to add train
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
 //get input data
      var trainName = $("#train-name-input").val().trim();
      var destName = $("#destination-input").val().trim();
      var firstTT = $("#first-train-time-input").val().trim();
      var freq = $("#frequency-input").val().trim();
console.log(trainName);
// Creates local "temporary" object for holding train data
   var newTrain ={
     tName: trainName,
    destination: destName,
    firstTime: firstTT,
    frequency:freq
  };
    dataRef.ref().push(newTrain)


console.log(newTrain.tName);
console.log(newTrain.destination);

$("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

});

  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().tName;
    var destName = childSnapshot.val().destination;
    var firstTT = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().frequency;

    var firstTTime = moment(firstTT, "HH:mm").subtract(1, "year");
    console.log(firstTTime);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    var tRemainder = diffTime % freq;
    console.log(tRemainder);
// Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destName),
    $("<td>").text(freq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
    
  );
  
 // Append the new row to the table
 $("#train-schedule > tbody").append(newRow);
});