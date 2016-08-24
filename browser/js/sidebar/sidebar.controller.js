juke.controller('SideBarController', function($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
    $rootScope.showAlbum = false;

    $scope.viewAlbums = function(evt) {
        $rootScope.showAlbum = true;
    }
});
