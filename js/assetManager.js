var promiseImage = require('./promiseImage.js');
//var loadVideo = require('./videos.js').videos;
var MakeShader = require('./shader.js');

var uniq = require('uniq');
module.exports = {
  AssetManager : function(shell){
    var ctx = this;
    ctx.urls = {
      images : [],
      videos : []
    };
     ctx.assets = [];
     ctx.shaders = [];
     ctx.promises = [];
     ctx.shell = shell;

     ctx.getAssetList = function(manifest){
        for(var key in manifest.videos){
          if(typeof manifest.videos[key] == 'object'){
            ctx.urls.videos.push(manifest.videos[key].url);
          }
        }
     };

    ctx.loadVideos = function(urls){
      
    }
    
    ctx.loadAssets = function( manifest){
      ctx.shell = shell;
      ctx.getAssetList(manifest);
      var assetPromises = ctx.urls.videos.map(ctx.loadVideo);
      var sequence = Promise.resolve();

      assetPromises.forEach(function(promise){
        sequence = sequence.then(function(){
          return promise;
        }).then(function(url){

        }).catch(function(err){
          return promise;
        });
      });
      return sequence;
    }

    ctx.loadVideo = function(url){
      return new Promise(function(res, rej){
        //loadVideo(url).then(function(videoElement){
        //  var video = videoElement[0];
        //  video.loop = true;
        //  video.play();
        //  //video.pause();
        //  video.muted = true;
        //  var asset = {};
        //  asset['url'] = url;
        //  asset['type'] = 'video';
        //  asset['element'] = video;
        //  ctx.assets.push(asset);
        //  res(video);
        //}, function(err){
        //  var assetObj = {};
				//	assetObj['url'] = url;
				//	assetObj['type'] = 'video';
				//	assetObj['element'] = 'bad';
				//	amCtx.assets.push(assetObj);
				//	res(err);
        //});
      });
    };

    ctx.loadShaders = function(manifest){
      var gl = ctx.shell.gl;
      var shaders = [];
      for(var shader in manifest){
          shaders.push(manifest[shader]);
      };
      uniq(shaders);
      for(var i = 0; i<shaders.length; i++){
        shaders[i] = new MakeShader.Shader(ctx.shell, shaders[i]);
      }
      ctx.shaders = shaders;
    };
  }
};
