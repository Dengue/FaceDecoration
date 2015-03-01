
var toCenter = (function(){
    var oldDeltaX = 0;
    var oldDeltaY = 0;
    return function(element,event){
        var noStatic = firstParentElementWithNoStatic(element);
        var elementstyles = getComputedStyle(element);
        var br = noStatic.getBoundingClientRect();
        var deltaY = (event.clientY - br.top - element.offsetTop) - parseInt(elementstyles.height)/2;
        var deltaX = (event.clientX - br.left - element.offsetLeft) - parseInt(elementstyles.width)/2;
        element.style.transform = "translate(" + deltaX + "px," + deltaY +"px)";
        oldDeltaX = deltaX;     //not used,i dont want to delete this because im lazy:)
        oldDeltaY = deltaY;     //not used
        return {deltaX:deltaX,deltaY:deltaY};
    }


})();


var resetTransition = function(e){
    this.classList.remove('transition');
}
var centerEl = function(element,e){
   // element.classList.add('transition');
   // var transitionEnd = transitionEndEventName();
   // element.addEventListener(transitionEnd, resetTransition, false);
    return toCenter(element,e); 
}

