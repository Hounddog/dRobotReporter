This project provides a plugin for the D.O.H browser runner to be able to send information back to the server for evaluation.

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

	-u, --url [string], Add the url to connect to [required]
	-B, --base-path [string], Specify Dojo BasePath
	-m, --module [string], Specify Module for testing
	-M, --module-path [string], Specify Module Paths
	-P, --plugins [string], Specify plugins seperated by semikolon e.g. [plugin1;plugin2]
	-s, --server [string], Specify server url for nodeJs runner. If not set will deault to url [--url]
	-p, --port <int> Specify the port defaults to 8000
	-a, --no-auto Auto Start browser, defaults to true
	-b, --browser [string] Specify Browser for testing [e.g. firefox]. Required if autostart is enabled

Example

	node runner.js -m module.to.test -u http://test.url -b iceweasel -B /path/to/dojo -M myWidget,/path/to/dojo/myWidget -s http://runner.server
