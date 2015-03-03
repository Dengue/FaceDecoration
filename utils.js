function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}
var firstParentElementWithNoStatic = function(element){
    var next = element.parentNode;
    while(next !== document.body){
        var styles = getComputedStyle(next);
        if(styles.position !== 'static'){
            return next;
        }
        next = next.parentNode;
    }
    return next;
}
