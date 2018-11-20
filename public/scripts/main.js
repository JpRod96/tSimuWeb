const API_URL="http://pruebatsimu.herokuapp.com/";
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