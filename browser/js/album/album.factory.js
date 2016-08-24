'use strict'

juke.factory('AlbumFactory', function($http, $log) {
    var albumObj = {};

    albumObj.fetchAll = function() {
        return $http.get('/api/albums/')
            .then(function(res) {
                return res.data;
            })
            .catch($log.error);
    };

    albumObj.fetchByID = function(id) {
        return $http.get('/api/albums/' + id)
            .then(function(res) {
                return res.data
            })
            .catch($log.error);
    };


return albumObj;
});


// $http.get('/api/albums/')
//     .then(function(res) {
//         return res.data; })
//     .then(function(albums) {
//         return $http.get('/api/albums/' + albums[0].id); // temp: get one
// //     })

