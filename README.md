#juliaben.net

Contains code for the following website: [juliaben.net/t](http://juliaben.net/t/). 

In particular, the script drawName.js uses D3.js to animate points on a coordinate plane as they trace the text "Julia Bennett". 


### Animate your own text 

It's very easy to make similar animations by creating your own SVG file and modifying a bit of my code. For example, I recommend the following process: 

1. Download [Inkscape](https://inkscape.org/en/) and install the [Hershey Text](http://www.evilmadscientist.com/2011/hershey-text-an-inkscape-extension-for-engraving-fonts/) extension. 

2. Create a new Inkscape document and use Hershey Text to render text as simple paths. Feel free to modify the paths it produces and add whatever decorations you like. In particular, the animation looks best if each letter's path is continuous. (It also looks nice if you make the paths differentiable, i.e. change all the nodes to be smooth.) 

3. After ungrouping these paths, save this document as name.svg. It's important that the size of the document is set in pixels before saving. 

4. Open name.svg in a text editor. Make the following modifications: 

	- For each letter that you want traced, set an id for its path that's easy to remember and replace the "style" attribute with the appropriate individual attributes. (Inkscape merges all stylist attributes into one big attribute that doesn't work nicely with D3.)

	- Locate the g tag containing these paths and set id="main". 

5. Modify the variable `letterList` in drawName.js to match the ids you chose. Also, modify the part of this script that sets the "viewBox" attribute so that it corresponds to the width and height of name.svg. 

6. You're now ready to animate! Just use the following HTML in the same folder as name.svg and drawName.js: 


	```
	<!DOCTYPE html>
	<html>

	  <div id="name"></div>
	  <script src="http://d3js.org/d3.v3.min.js"></script>
	  <script src="http://d3js.org/queue.v1.min.js"></script>
	  <script src="drawName.js"></script>
	  
	</html> 
	``` 
The styling and timings can be changed by further modifying drawName.js to create dramatically different effects. 
