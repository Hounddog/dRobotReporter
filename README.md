This project provides widgets for lists of data, including simple sets of scrolling rows, grids of data, on-demand lazy-loaded data, and various plugins for additional functionality. This project also provides touch scrolling for mobile devices with native style momentum, bouncing, and scrollbars.

The dRobotReporter project is available under the same dual BSD/AFLv2 license as the Dojo Toolkit.
Installation

Manual installation
	The Dojo Toolkit SDK version 1.7

It is recommended to arrange all dependencies as siblings, resulting in a directory structure like the following:

    dRobotReporter
    dojo
    util (required for D.O.H to run)

Node.js Dependencies
	node.js >= 0.6.9
	commander >= 1.0.0
    socket.io >= 0.9.8"

dRobotReport works best with Dojo 1.7.1 or higher. As of this writing, Dojo 1.7.2 is recommended.

Usage

node runner.js -m module.to.test -u http://test.url -b iceweasel -B /path/to/dojo -M myWidget,/path/to/dojo/myWidget -s http://runner.server
