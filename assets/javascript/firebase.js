  var config = {
      apiKey: "AIzaSyAolUMI028Apuhg3bFvYgHJ-iPOISTZeJ0",
      authDomain: "group-project-1-89c7e.firebaseapp.com",
      databaseURL: "https://group-project-1-89c7e.firebaseio.com",
      storageBucket: "group-project-1-89c7e.appspot.com",
      messagingSenderId: "347336096905"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Set Initial Counter 
  var initialValue = 0;
  var clickCounter = initialValue;
  var initialValue2 = 0;
  var clickCounter2 = initialValue2;
  var initialValue3 = 0;
  var clickCounter3 = initialValue3;
  var meh = 0;
  var initialValue4 = 0;
  var clickCounter4 = initialValue4;

  // At the initial load, get a snapshot of the current data.
  database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
      // Change the clickcounter to match the data in the database
      clickCounter = snapshot.val().ourCounters.likeCounter;
      clickCounter2 = snapshot.val().ourCounters.dislikeCounter;
      clickCounter3 = snapshot.val().ourCounters.mehCounter;

      console.log(id);

      $(".thumbUp").attr("data-tooltip", clickCounter);
      $(".fakeThumbDown").attr("data-tooltip", clickCounter2);

      // If any errors are experienced, log them to console. 
  }, function(errorObject) {

      console.log("The read failed: " + errorObject.code);

  });

  // --------- Thumbs Up, Thumbs Down & Meh counter ---------------
  // --------------------------------------------------------------

  // Whenever a user clicks the button
  $("#thumbUp").one("click", function() {

      clickCounter++;
      meh++;
      mehF();

      // Save new value to Firebase
      database.ref().update({
          ourCounters: {
              likeCounter: clickCounter,
              dislikeCounter: clickCounter2,
              mehCounter: clickCounter3
          }
      });

      console.log("This is thumbs up after: " + clickCounter);

  });

  // Whenever a user clicks the click button
  $("#thumbDown").one("click", function() {

      clickCounter2++;
      meh++;
      mehF();

      // Save new value to Firebase
      database.ref().update({
          ourCounters: {
              likeCounter: clickCounter,
              dislikeCounter: clickCounter2,
              mehCounter: clickCounter3
          }
      });

      console.log("This is fake thumbs up after: " + clickCounter2);

  });

  function mehF() {
      if (meh == 2) {
          clickCounter3++;
          console.log("meh");
      }
  }

  // -------------------------- Search History --------------------------------------------------------
  // --------------------------------------------------------------------------------------------------
  $("#searchBtn").on("click", function() {
      database.ref().on("value", function(snapshot) {
          clickCounter4 = snapshot.val().searches.searchNumber;
      })
      clickCounter4++;

      database.ref().update({
          searches: {
              searchNumber: clickCounter4
          }
      });
      userTextInput = $("#textInput").val();
      userLocationInput = $("#locationInput").val();
      userResultInput = $("#resultsNumInput").val();
      console.log(userTextInput);

      var time = new Date();

      var searchTitle = ("Search Number: " + clickCounter4 + " - Date: " + time.toDateString() + " at " + time.toLocaleTimeString());

      database.ref().child("User Search History").child(searchTitle).update({
          userTextInput,
          userLocationInput,
          userResultInput
      })
  });

  $(".collection-item").on("click", function() {
      database.ref().on("value", function(snapshot) {
          clickCounter4 = snapshot.val().searches.searchNumber;
      })
      clickCounter4++;

      database.ref().update({
          searches: {
              searchNumber: clickCounter4
          }
      });

      userTextInput = $(this).children('.title').text();
      userLocationInput = "Austin, TX";
      userResultInput = 30;
      console.log(userTextInput);

      var time = new Date();

      var searchTitle = ("Search Number: " + clickCounter4 + " - Date: " + time.toDateString() + " at " + time.toLocaleTimeString());

      database.ref().child("User Search History").child(searchTitle).update({
          userTextInput,
          userLocationInput,
          userResultInput
      })
  });
