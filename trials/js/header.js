!(function() {
	var path = document.location.pathname
	//var dir = /^.*\/([a-z]+)\//.exec(path)[1]
	//var filename = path.substring(path.lastIndexOf('/'))
	document.write(
		[
			'<div id="header">',
			//'<a href="//dc-js.github.io/dc.js"><img src="../dc.logo.png" style="float:left; padding-right: 1em" width=50 height=50></img></a>',
			'<div id="links" style="padding:10px 0px 0px 10px">',
			'<a href="/trials/index.html">Map' +
				'</a>&emsp;<a href="/trials/page2.html">Pagination</a>',
			'<div style="float:right"><span><a href="/">Projects Index Page</a></span></div>',
			'</div>',
			'<hr>',
			'</div>'
		].join('')
	)
	// window.onload = function() {
	//     d3.select('#version').text('v' + dc.version);
	// };
})()
