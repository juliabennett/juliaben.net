# juliaben.net

Code for hosting [juliaben.net/t](http://juliaben.net/t/). Includes a D3 animation tracing out text.

### Animate your own text 

Below are instructions for creating a simple SVG file that defines the text to be animated, stepping through a few of the unexpected gotchas.   

1. Download [Inkscape](https://inkscape.org/en/) and install the [Hershey Text](http://www.evilmadscientist.com/2011/hershey-text-an-inkscape-extension-for-engraving-fonts/) extension. 

2. Create a new Inkscape document and use Hershey Text to render text as simple paths. Modify the paths it produces and add whatever decorations you like. In particular, the animation looks best if each letter's path is continuous. (It also looks nice if you make the paths differentiable, i.e. change all the nodes to be smooth.) 

3. After ungrouping these paths, save this document as name.svg. It's important that the size of the document is set in pixels before saving. 

4. Open name.svg in a text editor. Make the following modifications: 

	*  For each letter that you want traced, set an id for its path that's easy to remember and replace the "style" attribute with the corresponding individual attributes. (Inkscape merges all stylist attributes into one big attribute that doesn't work nicely with D3.)

	*  Locate the g tag containing these paths and set id="main". 

Now you're ready to animate!
