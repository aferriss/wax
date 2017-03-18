module.exports = {

  Shader : function(shell, src){
      var ctx = this;
      var gl = shell.gl;
      ctx.shell = shell; 
      ctx.fragShader = new module.exports.FragShader(gl, src.frag).loadShader();
      ctx.vertShader = new module.exports.VertShader(gl, src.vert).loadShader();
      ctx.program = new module.exports.Program(gl, [ctx.vertShader, ctx.fragShader] ).loadProgram();
      ctx.uniforms = [];
      ctx.name = src.name;
      ctx.vertSrc = src.vertSrc;
      ctx.fragSrc = src.fragSrc;
      ctx.bound = false;
      var nu = gl.getProgramParameter(ctx.program, gl.ACTIVE_UNIFORMS);
      for(var n = 0; n<nu; n++){
        var uniforms = {};
        var u = gl.getActiveUniform(ctx.program, n);
        var location = gl.getUniformLocation(ctx.program, u.name);
        uniforms.name = u.name;
        uniforms.type = u.type;
        uniforms.size = u.size;
        uniforms.location = location;
        ctx.uniforms.push(uniforms);
      }
      
     ctx.getUniformLocation = function(name){
       
        for(var i = 0; i<ctx.uniforms.length; i++){
          if(name == ctx.uniforms[i].name){
            return ctx.uniforms[i].location;
          } 
        }
            return -1;
      };


      ctx.setUniform1f = function(name, v1){
        var loc = ctx.getUniformLocation(name);
        if (loc != -1){
         gl.uniform1f(loc, v1);
        }  
      };

      ctx.setUniform2f = function(name, v1, v2){
        var loc = ctx.getUniformLocation(name);
        if (loc != -1){
         gl.uniform2f(loc, v1, v2);
        }  
      };

      ctx.setUniform3f = function(name, v1, v2, v3){
        var loc = ctx.getUniformLocation(name);
        if (loc != -1){
         gl.uniform3f(loc, v1, v2, v3);
        }  
      };

      ctx.setUniform4f = function(name, v1, v2, v3, v4){
        var loc = ctx.getUniformLocation(name);
        if (loc != -1){
         gl.uniform4f(loc, v1, v2, v3, v4);
        }  
      };

      ctx.setUniform1i = function(name, v1){
        var loc = ctx.getUniformLocation(name);
        if(loc != -1){
          gl.uniform1i(loc, v1);
        }
      }

      ctx.setUniformTexture = function(name, texture, slot){
        gl.activeTexture(gl.TEXTURE0 + slot);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        ctx.setUniform1i(name, slot);
        gl.activeTexture(gl.TEXTURE0);        
      }

      ctx.begin = function(){
          gl.useProgram(ctx.program);    
      }
      
      ctx.end = function(){
        //  gl.useProgram(null);
      }

      
  },

	FragShader : function(gl, ShaderSrc){
		this.loadShader =  function(){
			var shader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(shader, ShaderSrc);
			gl.compileShader(shader);

			 var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			   if (!success) {
			     // Something went wrong during compilation; get the error
			     throw "could not compile shader:" + gl.getShaderInfoLog(shader);
			   }

			return shader;
		};
	},

	VertShader : function(gl, ShaderSrc){
		this.loadShader =  function(){
			var shader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(shader, ShaderSrc);
			gl.compileShader(shader);

			 var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			   if (!success) {
			     // Something went wrong during compilation; get the error
			     throw "could not compile shader:" + gl.getShaderInfoLog(shader);
			   }

			return shader;
		};
	},

	Program : function(gl, shaders){

		this.loadProgram = function(){
			var program = gl.createProgram();
			for(var ii = 0; ii<shaders.length; ii++){
				gl.attachShader(program, shaders[ii]);
			}

			gl.linkProgram(program);

			 var success = gl.getProgramParameter(program, gl.LINK_STATUS);
			   if (!success) {
			       // something went wrong with the link
			       throw ("program failed to link:" + gl.getProgramInfoLog (program));
			   }

			gl.useProgram(program);
			// gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
			// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			//     -1, 0, 0,
			//     0, -1, 0,
			//     1, 1, 0
			//   ]), gl.STATIC_DRAW)
			// this.initBuffer([
		 //    -1.0,1.0,
		 //    0.0,-1.0,
		 //    -1.0,0.0,
		 //    1.0,1.0,
		 //    0.0,1.0,
		 //    -1.0,0.0
		 //    ]);
      //this.initBuffer([-1, -1, -1,
      //+4, +4, -1]);


      //var pos_attrib = gl.getAttribLocation(program, 'position');
      //  gl.enableVertexAttribArray(pos_attrib);
      //gl.vertexAttribPointer(pos_attrib, 2, gl.FLOAT, false, 0,0);

			return program;
		};

    //this.initBuffer = function(dataset){
    //	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer() );
    //    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataset), gl.STATIC_DRAW);
    //	};

		// this.bind = function(){
		// 	this.gl.useProgram(this.program);
		// };
	},

	

};
