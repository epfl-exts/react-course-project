(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{131:function(e,t){},132:function(e,t){},179:function(e){e.exports=["bird","book","car","cat","chair","flower","plane","sheep","ship","strawberry"]},180:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n.n(r),a=n(82),i=n.n(a),c=(n(89),n(43)),u=n(42),l=n.n(u),f=n(83),s=n(21);function d(e,t){var n,r=(n=e.current,s.b(n).resizeNearestNeighbor([28,28]).mean(2).expandDims(2).expandDims().toFloat().div(255));return t.then(function(e){return e.predict(r).data()}).then(function(){var e=Object(f.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a(t).data();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())}var h=o.a.forwardRef(function(e,t){var n,a,i=!1;return Object(r.useEffect)(function(){var e=t.current,n=e.getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,e.height,e.width)}),o.a.createElement("canvas",{height:300,width:300,ref:t,onMouseDown:function(){return i=!0},onMouseUp:function(){i=!1,n=void 0,a=void 0},onMouseMove:function(e){return function(e){var t=e.target.getBoundingClientRect(),r=e.clientX-t.left,o=e.clientY-t.top;if(i){var u=function(e,t,n,r,o){var a=e.getContext("2d");return a.strokeStyle="#000000",a.lineWidth=12,a.lineJoin="round",a.beginPath(),a.moveTo(r,o),a.lineTo(t,n),a.closePath(),a.stroke(),[t,n]}(e.target,r,o,n,a),l=Object(c.a)(u,2);n=l[0],a=l[1]}}(e)}})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=s.c("./model/model.json"),m=n(179),w=o.a.createRef();i.a.render(o.a.createElement("div",null,o.a.createElement(h,{ref:w}),o.a.createElement(function(e){var t=e.theCanvas,n=e.model,a=e.labels,i=Object(r.useState)(""),u=Object(c.a)(i,2),l=u[0],f=u[1];return Object(r.useEffect)(function(){console.log(l)}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){var e=t.current;e.getContext("2d").fillRect(0,0,e.height,e.width)}},"Clear the canvas."),o.a.createElement("button",{onClick:function(){return d(t,n).then(function(e){return f(a[e[0]])})}},"Predict the drawing."))},{theCanvas:w,model:v,labels:m})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},84:function(e,t,n){e.exports=n(180)},89:function(e,t,n){},96:function(e,t){},98:function(e,t){}},[[84,2,1]]]);
//# sourceMappingURL=main.1e5b122a.chunk.js.map