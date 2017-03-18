var Q = require('q');
var Qvideo = require('./qvideo');
// var utils = require('./utils');

module.exports = {
 videos : function(path){
 	var videos;
 	// path = utils.prependVideoPath(path);
	var v = document.createElement('video');
	var canPlayWebm = v.canPlayType && v.canPlayType('video/webm').replace(/no/, '');
	var canPlayMp4 = v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '');
	if (canPlayMp4 || canPlayWebm) {
	  videos = Q.all([
	    path
	  ].map(function (url) {
	  	
	    return Qvideo(url, { event: 'canplaythrough' });
	  }));
	}
	else {
	  console.error(new Error('Cant play any video format (webm | mp4).'));
	}
	return videos;
	}
};

// module.exports = videos;