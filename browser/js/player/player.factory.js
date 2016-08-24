'use strict';

juke.factory('StatsFactory', function($q) {
    var statsObj = {};
    statsObj.totalTime = function(album) {
        var audio = document.createElement('audio');
        return $q(function(resolve, reject) {
            var sum = 0;
            var n = 0;

            function resolveOrRecur() {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function() {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    return statsObj;
});


juke.factory('PlayerFactory', function() {
    // initialize audio player (note this kind of DOM stuff is odd for Angular)
    var audio = document.createElement('audio');
    var currentSong = null;
    var playing = false;
    var songList = null;

    function setAudioSrc(src) {
      audio.src = src;
      audio.load();
    }

    var playerObj = {
      start: function(song, loadedList) {
        if(currentSong !== null){
          this.pause();
        }

        if(loadedList !== null){
          songList = loadedList;
        }
        // set current song
        currentSong = song;
        setAudioSrc(song.audioUrl);
        // play
        this.resume();
      },

      pause: function() {
        playing = false;
        audio.pause();
      },
      isPlaying: function() {
        return playing;
      },
      getCurrentSong: function() {
        return currentSong;
      },
      next: function() {
        var indexOfCurrentSong = songList.indexOf(currentSong),
        nextSongIndex;
        if(indexOfCurrentSong === songList.length - 1){
          nextSongIndex = 0;
        }
        else{
          nextSongIndex = indexOfCurrentSong + 1
        }
        this.start(songList[nextSongIndex], songList);
      },
      previous: function(){
        var indexOfCurrentSong = songList.indexOf(currentSong),
        previousSongIndex;

        if(indexOfCurrentSong === 0){
          previousSongIndex = songList.length - 1;
        }
        else{
          previousSongIndex = indexOfCurrentSong - 1
        }

        this.start(songList[previousSongIndex], songList);
      },
      getProgress: function() {
        if(!currentSong) { return 0; }
        return audio.currentTime / audio.duration * 100;
      },
      setProgress: function(setTime){
        if(!currentSong) {return 0; }
        audio.currentTime = setTime;
        // this.resume();
      },
      getDuration: function(){
        return audio.duration;
      },
      resume: function() {
        playing = true;
        audio.play();
      },

    };

    return playerObj;
});





// juke.controller('PlayerCtrl', function ($scope, $rootScope) {


//   // state
//   $scope.currentSong;
//   $scope.playing = false;

//   // main toggle
//   $scope.toggle = function (song) {
//     if ($scope.playing) $rootScope.$broadcast('pause');
//     else $rootScope.$broadcast('play', song);
//   };

//   // incoming events (from Album or toggle)
//   $scope.$on('pause', pause);
//   $scope.$on('play', play);

//   // functionality
//   function pause () {
//     audio.pause();
//     $scope.playing = false;
//   }
//   function play (event, song){
//     // stop existing audio (e.g. other song) in any case
//     pause();
//     $scope.playing = true;
//     // resume current song
//     if (song === $scope.currentSong) return audio.play();
//     // enable loading new song
//     $scope.currentSong = song;
//     audio.src = song.audioUrl;
//     audio.load();
//     audio.play();
//   }

//   // outgoing events (to Album… or potentially other characters)
//   $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
//   $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

//   function seek (decimal) {
//     audio.currentTime = audio.duration * decimal;
//   }

//   $scope.handleProgressClick = function (evt) {
//     seek(evt.offsetX / evt.currentTarget.scrollWidth);
//   };

// });
