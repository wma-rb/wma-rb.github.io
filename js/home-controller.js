angular.module('fefcc')
.controller('HomeController', ['$scope', '$http', '$filter', '$state', 'fish', function ($scope, $http, $filter, $state, fish) {
// .controller('HomeController', ['$scope', '$http', '$filter', '$state', function ($scope, $http, $filter, $state) {
    $scope.selected = fish;
    $scope.antennae = [
        'Rocket M365 w/ 120 deg Sector',
        'Rocket M365 w/ 26dBi Dish',
        'Rocket M365 w/ 12dBi Omni',
        'NanoStation M365',
        'NanoBridge M365',
        'PowerBridge M365',
        '320 Cambium AP',
        '450AP- 365 (90 deg)',
        'Cambium PmP 450',
        'Cambium 450 SM Integrated w/ dish',
    ];
    $scope.masts = [
        '2ft mast',
        'Tripod w/ 3ft pole',
        'Tripod w/ 4ft pole',
        'Non-pen mount (2ft)',
    ];
    $scope.selected.antenna = $scope.antennae[0];
    $scope.selected.mount = $scope.masts[0];

    $scope.reset = function(){
        $scope.selected = {};
        $scope.selected.antenna = $scope.antennae[0];
        $scope.selected.mount = $scope.masts[0];
        $scope.fccForm.$setPristine();
        $state.go('form');
    };

    $scope.submit = function(){
        $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.selected.addr).then($scope.parseAddr, $scope.onFail);
    };

    $scope.parseAddr = function(resp){
        if (resp.data.results[0].partial_match == true){
            console.log("Bad address");
            alert("Could not find address, please try again.");
        }
        else{
            $scope.selected.loc = resp.data.results[0].geometry.location;
            $state.go('map');
        }
    };
    $scope.onFail = function(err){
        console.log(err);
        alert("Could not find address, please try again.");
    };
}]);
