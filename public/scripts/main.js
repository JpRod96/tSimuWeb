const API_URL="http://pruebatsimu.herokuapp.com";
//const API_URL="http://localhost:4567";
const EVENTS_URL="/events";
const EVENT_URL="/event";

let app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/inicio.html",
        controller : "mainCtrl"
    })
    .when("/registro", {
        templateUrl : "/formulario-denuncia.html",
        controller : "registroCtrl"
    })
    .when("/ver/:id", {
        templateUrl : "/resumen-instancia.html",
        controller : "resumenCtrl"
    })
    .when("/estado/:pos", {
        templateUrl : "/historial-estados.html",
        controller : "estadoCtrl"
    })
});

app.controller("mainCtrl", function($scope, $http){
    let req = {
        method: 'GET',
        url: API_URL+EVENTS_URL,
    }
    fetchEventsScope($http,req,$scope);
});

function fetchEventsScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.events=response.data;
    })
    .catch((error)=>{
        console.error(error);    
    });
}

app.controller("resumenCtrl", function($scope, $http, $routeParams){
    let id=$routeParams.id;
    let req = {
        method: 'GET',
        url: API_URL+EVENT_URL+"/"+id,
    }
    fetchEventScope($http,req,$scope);
});

function fetchEventScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.event=response.data;
    })
    .catch((error)=>{
        console.error(error);    
    });
}

app.controller("registroCtrl", function($scope, $http, $window){
    $scope.event={
        eventDescription:"",
        locationDescription:"",
        longitude:0,
        latitude:0,
        timeMsEventDate:"",
        initialState:""
    };
    $scope.submit = function() {
        $scope.event.timeMsEventDate=$scope.event.timeMsEventDate.getTime();
        let req = {
            method: 'POST',
            url: API_URL+EVENT_URL,
            headers: {
                'Content-Type': undefined
            },
            data: JSON.stringify($scope.event)
        }
        postEvent($http, req, $window);
    };
});

function postEvent(httpService, req, window){
    console.log(req);
    httpService(req)
    .then((response)=>{
        window.location.href = '/';
    })
    .catch((error)=>{
        console.error(error);
    });
}


