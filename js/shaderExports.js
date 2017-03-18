var glslify = require('glslify');

var Shaders = {
  base : {
    vert : glslify('../assets/shaders/base.vert'),
    frag : glslify('../assets/shaders/base.frag'),
    name : 'base'
  },
  feedback : {
    vert : glslify('../assets/shaders/base.vert'),
    frag : glslify('../assets/shaders/feedback.frag'),
    name : 'feedback'
  },
  colormap : {
    vert : glslify('../assets/shaders/base.vert'),
    frag : glslify('../assets/shaders/colormap.frag'),
    name : 'colormap'
  },
}

exports.shaders = Shaders;
