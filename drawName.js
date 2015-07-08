
queue()
  .defer(d3.xml, "name.svg", "image/svg+xml")
  .await(ready);

function ready(error, xml) {

  animate();
  window.addEventListener("focus", animate);

  function animate() {
    d3.select("svg").remove();

    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("#name").node().appendChild(importedNode);

    var svg = d3.select("svg")
      .attr("width", "100%")
      .attr("viewBox", "0 0 865 225");

    var gMain = svg.select("g#main"),
        gInner = gMain.append("g");

    var letterList = "J U L I A B E1 N1 N2 E2 T1 T2 Tcross".split(" "),
        letterObjects = [];

    for (var x=0; x<letterList.length; x++) { 
      var path = svg.select("path#".concat(letterList[x])),
          marker = gMain.append("circle"),
          startPoint = pathStartPoint(path);

      path.attr("stroke", "none");

      marker
        .attr("r", 8)
        .attr("fill", "#1369AD")
        .attr("transform", "translate(" + startPoint + ")");

      letterObjects.push({"path": path, "marker": marker, "start": true});
    }
       
    initialTransition();
    setTimeout(singleTransition, letterList.length*250 + 6000);

    function initialTransition() {
      for (var x=0; x<letterObjects.length; x++) { 
        var path = letterObjects[x].path,
            marker = letterObjects[x].marker;

        marker.transition()
          .delay(250*x)
          .duration(4500)
          .attrTween("transform", translateAlong(path.node(), true));

        var trace = gInner.append("path")
          .attr("stroke", "#000000")
          .attr("stroke-width", 5)
          .attr("fill", "none")
          .attr("d", "");

        trace.transition()
          .delay(250*x)
          .duration(4500)
          .attrTween("d", buildTrace(path.node(), trace));

        letterObjects[x]["start"] = false;
      }
    }

    function singleTransition() {
      var x = Math.floor(Math.random()*letterList.length),
          path = letterObjects[x].path,
          marker = letterObjects[x].marker,
          forward = letterObjects[x]["start"];

      letterObjects[x]["start"] = !forward;

      marker.transition()
          .delay(250)
          .duration(Math.random()*7000 + 1500)
          .attrTween("transform", translateAlong(path.node(), forward))
          .each("end", singleTransition)      
    }

    function pathStartPoint(path) {
      var d = path.attr("d"),
          dsplitted = d.split(" ");
      return dsplitted[1].split(",");
    }

    function translateAlong(pathNode, forward) {
      var l = pathNode.getTotalLength();
      return function(i) {
        return function(t) {
          var val = (forward*t*l) + ((1-forward)*(1-t)*l),
              p = pathNode.getPointAtLength(val);
          return "translate(" + p.x + "," + p.y + ")";
        }
      }
    }

    function buildTrace(pathNode, trace) {
      var l = pathNode.getTotalLength();
      return function(i) {
        return function(t) {
          var p = pathNode.getPointAtLength(t*l);
          if (trace.attr("d").length == 0) {
            return "M " + p.x + "," + p.y;
          }
          return trace.attr("d") + " L " + p.x + "," + p.y;
        }
      }
    }

  }

}     