'use strict';

var bankApp = angular.module('todoApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

ue = al;
  al++;
	var sim = setTimeout("progressBarSim("+al+")",300);
	if(al == 100){
	  status.innerHTML = "100%";
	  bar.value = 100;
	  clearTimeout(sim);
	  var finalMessage = document.getElementById('finalMessage');
	  finalMessage.innerHTML = "Process is complete";
	}
}
var amountLoaded = 0;
progressBarSim(amountLoaded);

bankApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/index.html',
            controller: 'MainCtrl'
        }).otherwise({
              redirectTo: '/',
              caseInsensitiveMatch: true
          });
          
}]);

var progressBar;

window.onload = function(){

    progressBar = new ProgressBar("my-progressbar", {'width':'100%', 'height':'3px'});
    progressBar.setPercent(60);

}

function move(){
    var elem = document.getElementById("xpBar");
    var width = 0;
    function frame() {
        if (width == 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
    var id = setInterval(frame, 10);
}