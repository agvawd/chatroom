var app = angular.module('chatroom');


app.controller('mainCtrl', function($scope, parseService){
  $scope.timestamp = function timeStamp() {
// Create a date object with the current time
  var now = new Date();
 
// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
 
// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
 
// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
 
// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
 
// If hour is 0, set it to 12
  time[0] = time[0] || 12;
 
// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
 
// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}
  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.
  $scope.messages = [];
  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
  //your controllers $scope as messages ($scope.messages)
  $scope.getParseData = function() {
    parseService.getData().then(function(response) {
      $scope.messages = response.data.results;
      //console.log(response);
    });
  }


  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postData method on the parseService object which will then post it to the parse backend.

  $scope.postParseData = function() {
    parseService.postData($scope.message).then(function(data){
      data = $scope.message;
    });
    $scope.message = '';
  }

  $scope.formatDate = function(dateStr) {
    return new Date(dateStr).toLocaleString();
  }


  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.
  setInterval(function(){
    $scope.getParseData();
  }, 1500)
})
