/**
 * Syntax Highlighter.
 * http://code.google.com/syntaxhighlighter/
 * 
 * @version
 * 1.5.1
 *
 * @author
 * Alex Gorbatchev
 * 
 * @copyright
 * Copyright (C) 2004-2008 Alex Gorbatchev
 *
 * @license
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var dp = {
	sh :
	{
		Version : '1.5.1',

		Strings : 
		{
			aboutDialog : '<html><head><title>About...</title></head><body class="dp-about"><table cellspacing="0"><tr><td class="copy"><p class="title">dp.SyntaxHighlighter</div><div class="para">Version: {V}</p><p><a href="http://code.google.com/syntaxhighlighter" target="_blank">http://code.google.com/syntaxhighlighter</a></p>&copy;2004-2008 Alex Gorbatchev.</td></tr><tr><td class="footer"><input type="button" class="close" value="OK" onClick="window.close()"/></td></tr></table></body></html>'
		},
		
		ClipboardSwf : null,
	
		Toolbar : 
		{
			/**
			 * Creates new toolbar for a highlighter.
			 * 
			 * @private
			 * 
			 * @param {Highlighter} highlighter    Target highlighter.
			 */
			create : function(highlighter)
			{
				var div = document.createElement('DIV');
			
				div.className = 'tools';
			
				for(var name in dp.sh.Toolbar.Commands)
				{
					var cmd = dp.sh.Toolbar.Commands[name];
			
					if(cmd.check != null && !cmd.check(highlighter))
						continue;
			
					div.innerHTML += '<a href="#" onclick="dp.sh.Toolbar.command(\'' + name + '\',this);return false;">' + cmd.label + '</a>';
				}
			
				return div;
			},
			
			/**
			 * Executes a command.
			 * 
			 * @private
			 * 
			 * @param {String} name     Name of the command to execute.
			 * @param {Element} sender  Sender element.
			 */
			command : function(name, sender)
			{
				var n = sender;

				// find the highlighter			
				while(n != null && n.className.indexOf('dp-highlighter') == -1)
					n = n.parentNode;
			
				if(n != null)
					dp.sh.Toolbar.Commands[name].func(sender, n.highlighter);
			},

			/**
			 * Commands collection.
			 */
			Commands :
			{
				/**
				 * Command to expand the source view.
				 */
				expandSource : 
				{
					label : '+ expand source',
					check : function(highlighter) 
					{
						return highlighter.collapse; 
					},
					func : function(sender, highlighter)
					{
						sender.parentNode.removeChild(sender);
						highlighter.div.className = highlighter.div.className.replace('collapsed', '');
					}
				},
			
				/**
				 * Command to open a new window and display the original unformatted source code inside.
				 */
				viewSource : 
				{
					label : 'view source',
					func : function(sender, highlighter)
					{
						var code = dp.sh.Utils.fixForBlogger(highlighter.originalCode).replace(/</g, '&lt;');
						var wnd = window.open('', '_blank', 'width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0');
						wnd.document.write('<textarea style="width:99%;height:99%">' + code + '</textarea>');
						wnd.document.close();
					}
				},

				/**
				 * Comman to copy the original source code in to the clipboard. 
				 * Uses either IE only method or Flash object if ClipboardSwf is configured.
				 */
				copyToClipboard : 
				{
					label : 'copy to clipboard',
					check : function() 
					{ 
						return window.clipboardData != null || dp.sh.ClipboardSwf != null; 
					},
					func : function(sender, highlighter)
					{
						var code = dp.sh.Utils.fixForBlogger(highlighter.originalCode)
							.replace(/&lt;/g,'<')
							.replace(/&gt;/g,'>')
							.replace(/&amp;/g,'&')
						;
			
						if(window.clipboardData)
						{
							window.clipboardData.setData('text', code);
						}
						else if(dp.sh.ClipboardSwf != null)
						{
							var flashcopier = highlighter.flashCopier;
			
							if(flashcopier === null)
							{
								flashcopier = document.createElement('div');
								highlighter.flashCopier = flashcopier;
								highlighter.div.appendChild(flashcopier);
							}
			
							flashcopier.innerHTML = '<embed src="' + dp.sh.ClipboardSwf + '" FlashVars="clipboard='+encodeURIComponent(code)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
						}
			
						alert('The code is in your clipboard now');
					}
				},
			
				/**
				 * Command to print the colored source code.
				 */
				printSource : 
				{
					label : 'print',
					func : function(sender, highlighter)
					{
						var iframe = document.createElement('IFRAME');
						var doc = null;
			
						// this hides the iframe
						iframe.style.cssText = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
			
						document.body.appendChild(iframe);
						doc = iframe.contentWindow.document;
			
						dp.sh.Utils.copyStyles(doc, window.document);
						doc.write('<div class="' + highlighter.div.className.replace('collapsed', '') + ' printing">' + highlighter.div.innerHTML + '</div>');
						doc.close();
			
						iframe.contentWindow.focus();
						iframe.contentWindow.print();
			
						alert('Printing...');
			
						document.body.removeChild(iframe);
					}
				},

				/**
				 * Command to display the about dialog window.
				 */			
				about : 
				{
					label : '?',
					func : function(highlighter)
					{
						var wnd	= window.open('', '_blank', 'dialog,width=300,height=150,scrollbars=0');
						var doc	= wnd.document;
			
						dp.sh.Utils.copyStyles(doc, window.document);
			
						doc.write(dp.sh.Strings.aboutDialog.replace('{V}', dp.sh.Version));
						doc.close();
						wnd.focus();
					}
				}
			} // end of dp.sh.Toolbar.Commands
		}, // end of dp.sh.Toolbar
		
		Utils : 
		{
			/**
			 * Replaces tabs with smart spaces. Each tab is assumed to be 4 spaces.
			 * 
			 * @private
			 * 
			 * @param {String} code    Code to fix the tabs in.
			 * @return {String}        Returns code with all tabs replaces with roper amount of spaces.
			 */
			processSmartTabs : function(code)
			{
				var lines = code.split('\n');
				var result = '';
				var tabSize = 4;
				var tab = '\t';
				
				// This function inserts specified amount of spaces in the string
				// where a tab is while removing that given tab.
				function insertSpaces(line, pos, count)
				{
					var left = line.substr(0, pos);
					var right = line.substr(pos + 1, line.length); // pos + 1 will get rid of the tab
					var spaces = '';
					
					for (var i = 0; i < count; i++) 
						spaces += ' ';
					
					return left + spaces + right;
				}
				
				// This function process one line for 'smart tabs'
				function processLine(line, tabSize)
				{
					if (line.indexOf(tab) == -1) 
						return line;
					
					var pos = 0;
					
					while ((pos = line.indexOf(tab)) != -1) 
					{
						// This is pretty much all there is to the 'smart tabs' logic.
						// Based on the position within the line and size of a tab,
						// calculate the amount of spaces we need to insert.
						var spaces = tabSize - pos % tabSize;
						
						line = insertSpaces(line, pos, spaces);
					}
					
					return line;
				}
				
				// Go through all the lines and do the 'smart tabs' magic.
				for (var i = 0; i < lines.length; i++) 
					result += processLine(lines[i], tabSize) + '\n';
				
				return result;
			},
	
			// copies all <link rel="stylesheet" /> from 'target' window to 'dest'
			copyStyles : function(destDoc, sourceDoc)
			{
				var links = sourceDoc.getElementsByTagName('link');
			
				for(var i = 0; i < links.length; i++)
					if(links[i].rel.toLowerCase() == 'stylesheet')
						destDoc.write('<link type="text/css" rel="stylesheet" href="' + links[i].href + '"></link>');
			},
			
			fixForBlogger : function(str)
			{
				return (dp.sh.isBloggerMode == true) ? str.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, '\n') : str;
			},
			
			trim: function(str)
			{
				return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
			},
			
			chop: function(str)
			{
				return str.replace(/\n*$/, '').replace(/^\n*/, '');
			},
			
			unindent: function(str)
			{
				var lines = dp.sh.Utils.fixForBlogger(str).split('\n');
				var indents = new Array();
				var regex = new RegExp('^\\s*', 'g');
				var min = 1000;
				
				// go through every line and check for common number of indents
				for (var i = 0; i < lines.length && min > 0; i++) 
				{
					if (dp.sh.Utils.trim(lines[i]).length === 0) 
						continue;
					
					var matches = regex.exec(lines[i]);
					
					if (matches != null && matches.length > 0) 
						min = Math.min(matches[0].length, min);
				}
				
				// trim minimum common number of white space from the begining of every line
				if (min > 0) 
					for (var i = 0; i < lines.length; i++) 
						lines[i] = lines[i].substr(min);
				
				return lines.join('\n');
			}
		}, // end of dp.sh.Utils
		
		// Common reusable regular expressions
		RegexLib : 
		{
			MultiLineCComments : new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'),
			SingleLineCComments : new RegExp('//.*$', 'gm'),
			SingleLinePerlComments : new RegExp('#.*$', 'gm'),
			DoubleQuotedString : new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"','g'),
			SingleQuotedString : new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g')
		}, // end of dp.sh.RegexLib

		/**
		 * This object is populated by user included external brush files.
		 */		
		Brushes	: {},
		
		BloggerMode : function()
		{
			dp.sh.isBloggerMode = true;
		},
		
		/**
		 * Callback method for Array.sort() which sorts matches by
		 * index position and then by length.
		 * 
		 * @private
		 * 
		 * @param {Match} m1	Left object.
		 * @param {Match} m2    Right object.
		 * @return {Number}     Returns -1, 0 or -1 as a comparison result.
		 */
		matchesSortCallback : function(m1, m2)
		{
			// sort matches by index first
			if(m1.index < m2.index)
				return -1;
			else if(m1.index > m2.index)
				return 1;
			else
			{
				// if index is the same, sort by length
				if(m1.length < m2.length)
					return -1;
				else if(m1.length > m2.length)
					return 1;
			}
			
			return 0;
		},
	
		/**
		 * Executes given regular expression on provided code and returns all
		 * matches that are found.
		 * 
		 * @private
		 * 
		 * @param {String} code    Code to execute regular expression on.
		 * @param {RegExp} regex   Regular expression to execute.
		 * @param {Object} css     Class name associated with the current regular expression.
		 * @return {Array}         Returns a list of Match objects.
		 */ 
		getMatches : function(code, regex, css)
		{
			var index = 0;
			var match = null;
			var result = [];
			
			while((match = regex.exec(code)) != null)
				result.push(new dp.sh.Match(match[0], match.index, css));
				
			return result;
		}
	} // end of dp.sh.Utils
};

// make an alias to the actual namespace
dp.SyntaxHighlighter = dp.sh;

//
// Match object
//
dp.sh.Match = function(value, index, css)
{
	this.value = value;
	this.index = index;
	this.length = value.length;
	this.css = css;
};

dp.sh.Match.prototype = {
	toString: function()
	{
		return this.value;
	}
};

//
// Highlighter object
//
dp.sh.Highlighter = function()
{
	this.noGutter = false;
	this.addControls = true;
	this.collapse = false;
	this.tabsToSpaces = true;
	this.wrapColumn = 80;
	this.showColumns = true;
}

dp.sh.Highlighter.prototype = {
	/**
	 * Creates a new instance of a given element and sets its
	 * `highlighter` property to the current class.
	 *
	 * @private
	 * 
	 * @param {String} name   Name of the element to create (DIV, A, etc).
	 * @return {Element}      Returns new object.
	 */
	createElement: function(name){
		var result = document.createElement(name);
		result.highlighter = this;
		return result;
	},
	
	/**
	 * Creates a new text element, applies given style and adds it
	 * to the this.div element.
	 * 
	 * @private
	 * 
	 * @param {String} str    Text.
	 * @param {String} css    Style name.
	 */
	addBit: function(str, css)
	{
		if (str === null || str.length === 0) 
			return;
		
		var span = this.createElement('SPAN');
		
		//	str = str.replace(/&/g, '&amp;');
		str = str.replace(/ /g, '&nbsp;');
		str = str.replace(/</g, '&lt;');
		//	str = str.replace(/&lt;/g, '<');
		//	str = str.replace(/>/g, '&gt;');
		str = str.replace(/\n/gm, '&nbsp;<br>');
		
		// when adding a piece of code, check to see if it has line breaks in it
		// and if it does, wrap individual line breaks with span tags
		if (css != null)
		{
			if ((/br/gi).test(str)) 
			{
				var lines = str.split('&nbsp;<br>');
				
				for (var i = 0; i < lines.length; i++) 
				{
					span = this.createElement('SPAN');
					span.className = css;
					span.innerHTML = lines[i];
					
					this.div.appendChild(span);
					
					// don't add a <BR> for the last line
					if (i + 1 < lines.length) 
						this.div.appendChild(this.createElement('BR'));
				}
			}
			else 
			{
				span.className = css;
				span.innerHTML = str;
				this.div.appendChild(span);
			}
		}
		else 
		{
			span.innerHTML = str;
			this.div.appendChild(span);
		}
	},
	
	/**
	 * Checks if one match is inside another.
	 * 
	 * @private 
	 * 
	 * @param {Match} match   Match object to check.
	 * @return {Boolean}      Returns true if given match was inside another, false otherwise.
	 */
	isMatchNested: function(match)
	{
		for (var i = 0; i < this.matches.length; i++)
		{
			var item = this.matches[i];
			
			if (item === null)
				continue;
			
			if ((match.index > item.index) && (match.index < item.index + item.length))
				return true;
		}
		
		return false;
	},
	
	/**
	 * Applies all regular expression to the code and returns all matches.
	 * 
	 * @private
	 * 
	 * @return {Array} List of all matches.
	 */
	getMatches: function()
	{
		var result = [];
		
		if (this.regexList != null)
			for (var i = 0; i < this.regexList.length; i++) 
			{
				var item = this.regexList[i];
				result = result.concat(dp.sh.getMatches(this.code, item.regex, item.css));
			}
		
		// sort the matches
		result = result.sort(dp.sh.matchesSortCallback);

		return result;
	},
	
	setupRuler: function()
	{
		var div = this.createElement('div');
		var columns = this.createElement('div');
		var showEvery = 10;
		var i = 1;
		
		while (i <= 150) 
		{
			if (i % showEvery === 0) 
			{
				div.innerHTML += i;
				i += (i + '').length;
			}
			else 
			{
				div.innerHTML += '&middot;';
				i++;
			}
		}
		
		columns.className = 'columns';
		columns.appendChild(div);
		this.bar.appendChild(columns);
	},
	
	switchToList: function()
	{
		// thanks to Lachlan Donald from SitePoint.com for this <br/> tag fix.
		var html = this.div.innerHTML.replace(/<(br)\/?>/gi, '\n');
		var lines = html.split('\n');
		
		if (this.addControls == true) 
			this.bar.appendChild(dp.sh.Toolbar.create(this));
		
		// add columns ruler
		if (this.showColumns) 
			this.setupRuler();
		
		for (var i = 0, lineIndex = this.firstLine; i < lines.length - 1; i++, lineIndex++) 
		{
			var li = this.createElement('LI');
			var span = this.createElement('SPAN');
			
			// uses .line1 and .line2 css styles for alternating lines
			li.className = (i % 2 === 0) ? 'alt' : '';
			span.innerHTML = lines[i] + '&nbsp;';
			
			li.appendChild(span);
			this.ol.appendChild(li);
		}
		
		this.div.innerHTML = '';
	},

	removeNestedMatches: function()
	{
		// The following loop checks to see if any of the matches are inside
		// of other matches. This process would get rid of highligted strings
		// inside comments, keywords inside strings and so on.
		for (var i = 0; i < this.matches.length; i++)
			if (this.isMatchNested(this.matches[i]))
				this.matches[i] = null;
	},
	
	processMatches: function()
	{
		// This function returns a portions of the string from pos1 to pos2 inclusive
		function copy(string, pos1, pos2)
		{
			return string.substr(pos1, pos2 - pos1);
		}

		var pos = 0;
		
		// Finally, go through the final list of matches and pull the all
		// together adding everything in between that isn't a match.
		for (var i = 0; i < this.matches.length; i++) 
		{
			var match = this.matches[i];
			
			if (match === null || match.length === 0) 
				continue;
			
			this.addBit(copy(this.code, pos, match.index), null);
			this.addBit(match.value, match.css);
			
			pos = match.index + match.length;
		}
		
		this.addBit(this.code.substr(pos), null);
		
		this.switchToList();
		this.div.appendChild(this.bar);
		this.div.appendChild(this.ol);
	},
	
	highlight: function(code)
	{
				
		if (code === null) 
			code = '';
		
		this.originalCode = code;
		this.code = dp.sh.Utils.chop(dp.sh.Utils.unindent(code));
		this.div = this.createElement('DIV');
		this.bar = this.createElement('DIV');
		this.ol = this.createElement('OL');
		
		this.div.className = 'dp-highlighter';
		this.div.highlighter = this;
		
		this.bar.className = 'bar';
		
		// set the first line
		this.ol.start = this.firstLine;
		
		if (this.CssClass != null) 
			this.ol.className = this.CssClass;
		
		if (this.collapse) 
			this.div.className += ' collapsed';
		
		if (this.noGutter) 
			this.div.className += ' nogutter';
		
		// replace tabs with spaces
		if (this.tabsToSpaces == true) 
			this.code = dp.sh.Utils.processSmartTabs(this.code);
		
		this.matches = this.getMatches();
		
		// if no matches found, add entire code as plain text
		if (this.matches.length === 0) 
		{
			this.addBit(this.code, null);
			this.switchToList();
			this.div.appendChild(this.bar);
			this.div.appendChild(this.ol);
			return;
		}
		
		this.removeNestedMatches();
		this.processMatches();
	},

	/**
	 * Converts space separated list of keywords into a regular expression string.
	 * 
	 * @param {String} str    Space separated keywords.
	 * @return {String}       Returns regular expression string.
	 */	
	getKeywords: function(str)
	{
		return '\\b' + str.replace(/ /g, '\\b|\\b') + '\\b';
	},
	
	/**
	 * Alias for getKeywords. Kept for compatability with older brushes.
	 * @alias getKeywords
	 */
	GetKeywords: function(str)
	{
		this.getKeywords(str);
	}

}; // end of dp.sh.Highlighter class

// highlightes all elements identified by name and gets source code from specified property
dp.sh.HighlightAll = function(name, showGutter /* optional */, showControls /* optional */, collapseAll /* optional */, firstLine /* optional */, showColumns /* optional */)
{
	function FindValue()
	{
		var a = arguments;

		for(var i = 0; i < a.length; i++)
		{
			if(a[i] === null)
				continue;

			if(typeof(a[i]) == 'string' && a[i] != '')
				return a[i] + '';

			if(typeof(a[i]) == 'object' && a[i].value != '')
				return a[i].value + '';
		}

		return null;
	}

	function IsOptionSet(value, list)
	{
		for(var i = 0; i < list.length; i++)
			if(list[i] == value)
				return true;

		return false;
	}

	function GetOptionValue(name, list, defaultValue)
	{
		var regex = new RegExp('^' + name + '\\[(\\w+)\\]$', 'gi');
		var matches = null;

		for(var i = 0; i < list.length; i++)
			if((matches = regex.exec(list[i])) != null)
				return matches[1];

		return defaultValue;
	}

	function FindTagsByName(list, name, tagName)
	{
		var tags = document.getElementsByTagName(tagName);

		for(var i = 0; i < tags.length; i++)
			if(tags[i].getAttribute('name') == name)
				list.push(tags[i]);
	}

	var elements = [];
	var highlighter = null;
	var registered = {};
	var propertyName = 'innerHTML';

	// for some reason IE doesn't find <pre/> by name, however it does see them just fine by tag name...
	FindTagsByName(elements, name, 'pre');
	FindTagsByName(elements, name, 'textarea');

	if(elements.length === 0)
		return;

	// register all brushes
	for(var brush in dp.sh.Brushes)
	{
		var aliases = dp.sh.Brushes[brush].Aliases;

		if(aliases === null)
			continue;

		for(var i = 0; i < aliases.length; i++)
			registered[aliases[i]] = brush;
	}

	for(var i = 0; i < elements.length; i++)
	{
		var element = elements[i];
		var options = FindValue(
				element.attributes['class'], element.className,
				element.attributes['language'], element.language
				);
		var language = '';

		if(options === null)
			continue;

		options = options.split(':');

		language = options[0].toLowerCase();

		if(registered[language] === null)
			continue;

		// instantiate a brush
		highlighter = new dp.sh.Brushes[registered[language]]();

		// hide the original element
		element.style.display = 'none';

		if (typeof(showGutter) === 'undefined')
		{
			highlighter.noGutter = IsOptionSet('nogutter', options);
		} else {
			highlighter.noGutter = !showGutter;
		}

		if (typeof(showControls) === 'undefined')
		{
			highlighter.addControls = !IsOptionSet('nocontrols', options);
		} else {
			highlighter.addControls = showControls;
		}

		if (typeof(collapseAll) === 'undefined')
		{
			highlighter.collapse = IsOptionSet('collapse', options);
		} else {
			highlighter.collapse = collapseAll;
		}

		if (typeof(showColumns) === 'undefined')
		{
			highlighter.showColumns = IsOptionSet('showcolumns', options);
		} else {
			highlighter.showColumns = showColumns;
		}

		// write out custom brush style
		var headNode = document.getElementsByTagName('head')[0];
		if(highlighter.Style && headNode)
		{
			var styleNode = document.createElement('style');
			styleNode.setAttribute('type', 'text/css');

			if(styleNode.styleSheet) // for IE
			{
				styleNode.styleSheet.cssText = highlighter.Style;
			}
			else // for everyone else
			{
				var textNode = document.createTextNode(highlighter.Style);
				styleNode.appendChild(textNode);
			}

			headNode.appendChild(styleNode);
		}

		// first line idea comes from Andrew Collington, thanks!
		highlighter.firstLine = (firstLine === null) ? parseInt(GetOptionValue('firstline', options, 1)) : firstLine;

		highlighter.highlight(element[propertyName]);

		highlighter.source = element;

		element.parentNode.insertBefore(highlighter.div, element);
	}
}

// Local Variables:
// mode: javascript
// indent-tabs-mode: t
// c-file-style: "stroustrup"
// End:
