var initsize = 3;
var app = angular.module('remcab', []);
var playernames= ["","X","O"];
/* var ma=[ bimg, ximg, oimg ];
var bimg = "./blank.jpg";
var ximg = "./X.png";
var oimg = "./O.jpg";*/

function getnewboard(size){
  var retthis = {};
  retthis.currentplayer = 0;
  retthis.message = 'Game Start!';
  retthis.iswin = false;
  retthis.istie = false;
  retthis.size = size;
  retthis.board = [];
    for (i = 0; i < size; i++){
      var thisrow = [];
      for(j = 0; j < size; j++){
        thisrow[j] = 0;   
      }    
      retthis.board[i] = thisrow;
    }
  return retthis;
};
app.controller('remCtrl', function($scope) {
  $scope.game = getnewboard(initsize);
  $scope.getplayernames= function(index){
    return playernames[index];
  };
  $scope.$watch('game.size', function(){
    $scope.game = getnewboard($scope.game.size);
    Array.prototype.fill = function(val){
      for (var i =0; i < $scope.game.size; i++){
        this[i] = val;
      }
    return this;
    }
    var xw = new Array($scope.game.size).fill('X');
    var ow = new Array($scope.game.size).fill('O');
    var xwin = xw.toLocaleString();
    var owin = ow.toLocaleString();
    console.log(xw);
    console.log(ow);
  });
  $scope.setstatus = function() {
    var retthis = '';
    retthis = 'Player ' + $scope.getplayernames($scope.game.currentplayer + 1);
    if ($scope.game.iswin) {
      retthis += ' Wins!';
    } else if ($scope.game.istie){
      retthis = 'YOU BOTH SUCK';
    } else {
      retthis += '\'s Turn'; 
    }
      $scope.game.message = retthis;      
  };      
  $scope.processMove = function(cpos,rpos) {
    console.log('cpos: '+ cpos +'rpos: ' +rpos);
    var state = $scope.game.board[cpos][rpos];
      if(state == 0) {
        state = $scope.game.currentplayer + 1;
        $scope.game.board[cpos][rpos] = state;
      } 
      var win = state.toLocaleString();
      console.log(win);     
      checkwin();
      $scope.setstatus();
      console.log($scope.game);
     
  };
  function dotie() {
    $scope.game.istie = true;
  }
  function dowin() {
    $scope.game.iswin = true;
  }
  function checktie() {
    for(var i = 0; i < $scope.game.size; i++)
      for(var j = 0; j < $scope.game.size; j++)
        var state = $scope.game.board[i][j]; 
          if (state === 0){
            changeturn();
          }else dotie();
  }
  /*$scope.$watch('game.size', function() {
     for(var i = 0; i < $scope.game.size; i++)
        for(var j = 0; j< $scope.game.size; j++)
          var state = $scope.game.board[i][j];
          var stateboard = new Array($scope.game.size).values(state);
          console.log(stateboard);
  });*/
  function checkwin() {
    checktie();
  };

  function changeturn() {             
      $scope.game.currentplayer++;    
      $scope.game.currentplayer = $scope.game.currentplayer % 2;
  }
});   

