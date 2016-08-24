/* global juke */
'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

    $scope.currentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
    $scope.playing = PlayerFactory.isPlaying.bind(PlayerFactory);
    $scope.songQueue = [];

    // var songList = null; THIS EXISTS In PLAYER FACTORY

    AlbumFactory.fetchAll()
        .then(function(albums) {
          return AlbumFactory.fetchByID(albums[0].id); // temp: get one
        })
        .then(function(album) {
            album.imageUrl = '/api/albums/' + album.id + '/image';
            album.songs.forEach(function(song, i) {
                song.audioUrl = '/api/songs/' + song.id + '/audio';
                song.albumIndex = i;
                $scope.songQueue .push(song);
            });

            $scope.album = album;
        })
        .catch($log.error);

    // StatsFactory.totalTime(album)
    //     .then(function(albumDuration) {
    //         $scope.fullDuration = albumDuration;
    //     })
    // .catch($log.error); // $log service can be turned on and off; also, pre-bound


    // incoming events (from Player, toggle, or skip)
    $scope.play = PlayerFactory.start.bind(PlayerFactory);
    $scope.pause = PlayerFactory.pause.bind(PlayerFactory);
    $scope.next = PlayerFactory.next.bind(PlayerFactory);
    $scope.prev = PlayerFactory.previous.bind(PlayerFactory);

    // main toggle
    $scope.toggle = function(song) {
        if ($scope.playing() && song === $scope.currentSong()) {
            // $rootScope.$broadcast('pause');
            $scope.pause();
        } else {
            // {$rootScope.$broadcast('play', song);}
            console.log("THIS IS THE SONG", song);
            $scope.play(song, $scope.songQueue);
        }
    };

    // $scope.$on('pause', pause);
    // $scope.$on('play', play);
    // $scope.$on('next', next);
    // $scope.$on('prev', prev);

    // functionality
    // function pause() {
    //     $scope.playing = false;
    // }

    // function play(event, song) {
    //     $scope.playing = true;
    //     $scope.currentSong = song;
    // }

    // // a "true" modulo that wraps negative to the top of the range
    // function mod(num, m) {
    //     return ((num % m) + m) % m;
    // }

    // // jump `interval` spots in album (negative to go back, default +1)
    // function skip(interval) {
    //     if (!$scope.currentSong) return;
    //     var index = $scope.currentSong.albumIndex;
    //     index = mod((index + (interval || 1)), $scope.album.songs.length);
    //     $scope.currentSong = $scope.album.songs[index];
    //     if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
    // }

    // function next() { skip(1); }

    // function prev() { skip(-1); }

});
