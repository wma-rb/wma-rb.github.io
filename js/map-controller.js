angular.module('fefcc')
.controller('MapController', ['$scope', '$http', '$filter', 'fish', function ($scope, $http, $filter, fish) {
    $scope.selected = fish;
    $scope.mapCreated = function(map){
        $scope.map = map;
        if(!$scope.selected.loc){
            alert("Sequence break");
            angular.element(document.getElementById('submitBtn')).attr('disabled', true);
            return
        }
        $scope.marker = new google.maps.Marker({
            position: $scope.selected.loc,
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: $scope.map
        });
        $scope.line = new google.maps.Polyline({
            path: [$scope.selected.loc, {lat: 39.58, lng:-104.86}],
            icons:[{
                icon: {path: google.maps.SymbolPath.CIRCLE, fillOpacity: 1.0},
                offset: '100%'
            }],
            strokeColor: '#FFFF00',
            map: $scope.map
        });
        $scope.label = new google.maps.InfoWindow({
            content: 'DEN-TWR',
            position: {lat: 39.58, lng:-104.86}
        });
        $scope.label.open($scope.map);
        // Show label and set target heading when the tower is selected
        google.maps.event.addListener($scope.line, 'click', function(e){
            // Show label
            $scope.label.open($scope.map);
        });
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng($scope.selected.loc));
        bounds.extend(new google.maps.LatLng(39.58, -104.86));
        $scope.map.fitBounds(bounds);
        google.maps.event.addDomListener($scope.marker, 'dragend', function(e){
            var pos = $scope.marker.getPosition();
            $scope.$apply(function(){
                $scope.selected.loc.lat = pos.lat();
                $scope.selected.loc.lng = pos.lng();
            });
            $scope.line.setPath([$scope.selected.loc, {lat: 39.58, lng:-104.86}]);
        });
    };
    $scope.submit = function(){
        // document.getElementById('submitBTN').value = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
        angular.element(document.getElementById('submitBtn')).html('<i class="fa fa-spinner fa-spin fa-lg"></i>');
        var selected = angular.copy($scope.selected);
        delete selected.loc;
        selected.lat = $scope.selected.loc.lat;
        selected.lng = $scope.selected.loc.lng;
        setTimeout(function(){angular.element(document.getElementById('submitBtn')).html('Confirm');}, 5000);
        // selected.antenna = $filter('filter')($scope.antMap, {code: $scope.selected.antenna.code})[0];
        // selected.mount = $filter('filter')($scope.mMap, {code: $scope.selected.mount.code})[0];
        //$http.post('/data', selected).then(function(resp){alert(JSON.stringify(resp));angular.element(document.getElementById('submitBtn')).html('Confirm');}
                                           //,function(err){alert(JSON.stringify(err));angular.element(document.getElementById('submitBtn')).html('Confirm');});
    }
}]);
