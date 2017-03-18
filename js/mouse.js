module.exports = {
  Mouse : function(){
    var ctx = this;
    ctx.x = 0;
    ctx.y = 0;
    ctx.mouseDown = 0;
    ctx.touchX = 0;
    ctx.touchY = 0;
    
    ctx.handleMouseMove = function(event) {
        var  eventDoc, doc, body;

        event = event || window.event; // IE-ism
        ctx.x = event.x;
        ctx.y = event.y;
        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.x= event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.y= event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
    }

    ctx.onMouseDown = function(){
      ctx.mouseDown++;
    }

    ctx.onMouseUp = function(){
      ctx.mouseDown--;
    }

    ctx.ontouchmove = function(){
      if(e.touches.length == 1){
        var touch = e.touches[0];
        ctx.touchX = touch.pageX;
        ctx.touchY = touch.pageY;
      }
    }
  }




}
