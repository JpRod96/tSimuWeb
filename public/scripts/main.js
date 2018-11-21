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

app.controller("resumenCtrl", function($scope, $http, $routeParams, $location){
    let id=$routeParams.id;
    let req = {
        method: 'GET',
        url: API_URL+EVENT_URL+"/"+id,
    }
    fetchEventScope($http,req,$scope,$location);
});

function fetchEventScope(httpService, req, scope, location){
    httpService(req)
    .then((response)=>{
        let id=response.data.id;
        scope.action =()=>{
            location.path('!#/estado/'+id);
        };
        scope.event=response.data;
    })
    .catch((error)=>{
        console.error(error);    
    });
}

app.controller("registroCtrl", function($scope, $http, $location){
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
        postEvent($http, req, $location);
    };
});

function postEvent(httpService, req, location){
    httpService(req)
    .then((response)=>{
        let id=response.data.id;
        alert("SE REGISTRO LA DENUNCIA SATISFACTORIAMENTE\nId de denuncia: "+id);
        location.path('/ver/'+id);
    })
    .catch((error)=>{
        console.error(error);
    });
}

app.controller("estadoCtrl", function($scope, $http, $routeParams){
    let id=$routeParams.id;
    let req = {
        method: 'GET',
        url: API_URL+EVENT_URL+"/"+id,
    }
    fetchProcessScope($http,req,$scope);
});

function fetchProcessScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.process=response.data.process.evolution;
    })
    .catch((error)=>{
        console.error(error);    
    });
}
