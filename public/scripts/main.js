const API_URL="http://pruebatsimu.herokuapp.com";
const EVENTS_URL="/events";

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
    .when("/ver/:pos", {
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
    fetchDraftOrdersToScope($http,req,$scope);
});

function fetchDraftOrdersToScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.events=response.data;
    })
    .catch((error)=>{
        console.error(error);    
    });
}