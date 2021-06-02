angular.module("myApp")
    .controller("SearchResultCtrl",function ($scope,$rootScope,$http,$state,$timeout,$st) {
        console.log($rootScope.SearchResult)

        if ($rootScope.SearchResult == undefined) {
            $rootScope.SearchResult = 0
        }
    })