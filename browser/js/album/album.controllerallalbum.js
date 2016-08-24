/* global juke */
'use strict';

juke.controller('AllAlbumController', function($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {
	    console.log('heres the album', $rootScope.showAlbum);
      AlbumFactory.fetchAll()
        .then(function(albums) {
          albums.forEach(function(album){
          	album.imageUrl = '/api/albums/' + album.id + '/image';
          })
          $scope.albums = albums;
        })
        .catch($log.error);
      
});