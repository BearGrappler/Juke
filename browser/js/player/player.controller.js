/* global juke */
'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory, $interval) {

    // initialize audio player (note this kind of DOM stuff is odd for Angular)
    // audio.addEventListener('ended', function () {
    //   $scope.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    //   $scope.$evalAsync(); // likely best, schedules digest if none happening
    // });
    // audio.addEventListener('timeupdate', function () {
    //   $scope.progress = 100 * audio.currentTime / audio.duration;
    //   // $scope.$digest(); // re-computes current template only (this scope)
    //   $scope.$evalAsync(); // likely best, schedules digest if none happening
    // });

    $scope.currentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
    $scope.playing = PlayerFactory.isPlaying.bind(PlayerFactory);


    // // state
    // $scope.currentSong;
    // $scope.playing = false;

    // main toggle
    $scope.play = PlayerFactory.start.bind(PlayerFactory);
    $scope.pause = PlayerFactory.pause.bind(PlayerFactory);
    $scope.next = PlayerFactory.next.bind(PlayerFactory);
    $scope.prev = PlayerFactory.previous.bind(PlayerFactory);
    $scope.progress = PlayerFactory.getProgress.bind(PlayerFactory);
    $scope.setProgress = PlayerFactory.setProgress.bind(PlayerFactory);
    $scope.getDuration = PlayerFactory.getDuration.bind(PlayerFactory);

    // main toggle
    $scope.toggle = function(song) {
        if ($scope.playing() && song === $scope.currentSong()) {
            $scope.pause();
        } else {
            $scope.play(song);
        }
    };

    function seek(decimal) {
        var timeToSet = $scope.getDuration() * decimal;
        $scope.setProgress(timeToSet);
    }

    $scope.handleProgressClick = function(evt) {
        console.log('heres the event');
        console.dir(evt);
        seek(evt.offsetX / evt.currentTarget.scrollWidth);
    };

    $interval(function() {
      console.log('interval is running');
      console.log($scope.progress())
      $scope.$digest();
    }, 1000)

});
