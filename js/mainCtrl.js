var app = angular.module('chatroom');


app.controller('mainCtrl', function($scope, parseService){
  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.
  $scope.accounts = ['chat', 'agvawd', 'tjustin'];

  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
  //your controllers $scope as messages ($scope.messages)
  $scope.getParseData = function() {
    parseService.getData(chat).then(function(response) {
      $scope.messages = response.data.results;
      //console.log(response);
    });
  }

  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postData method on the parseService object which will then post it to the parse backend.

  $scope.postParseData = function() {
    parseService.postData($scope.message, chat).then(function(){
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

  var chat = 'chat';
  $scope.changeChat = function() {
    if($scope.mySelect === "") {
      chat = "chat"
    }
    else { 
      chat = $scope.mySelect;
    }
  }

  $scope.addChat = function() {
    debugger;
    if($scope.addChatter === "" || $scope.addChatter === undefined) {

    }
    else { 
      $scope.accounts.push($scope.addChatter);
      chat = $scope.addChatter;
    }
    $scope.addChatter = "";
  }
})
