/**
 * Code Syntax Highlighter.
 * Version 1.5.1
 * Copyright (C) 2004-2007 Alex Gorbatchev
 * http://www.dreamprojections.com/syntaxhighlighter/
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

dp.sh.Brushes.Xml = function()
{
	function addAttribute(match, regexInfo)
	{
		var result = [];
		
		if(match[1] == null)
			return [];

		result.push(new dp.sh.Match(match[1], match.index, regexInfo.attrCss));

		// if xml is invalid and attribute has no property value, ignore it
		if(match[2] != undefined)
			result.push(new dp.sh.Match(
				match[2], match.index + match[0].indexOf(match[2]), regexInfo.valueCss
				));
		
		return result;
	};
	
	function addTagName(match, regexInfo)
	{
		return [new dp.sh.Match(match[1], match.index + match[0].indexOf(match[1]), regexInfo.css)];
	};
	
	this.regexList = [
		{ regex: /(\&lt;|<)\!\[[\w\s]*?\[(.|\s)*?\]\](\&gt;|>)/gm,	css: 'color1' },	// <![ ... [ ... ]]>
		{ regex: /(\&lt;|<)!--\s*.*?\s*--(\&gt;|>)/gm, 				css: 'comments' },	// <!-- ... -->
//		{ regex: /(\&lt;|<)\/*\?*(?!\!)|\/*\?*(\&gt;|>)/gm, 		css: 'tag' },		// tags
		{ regex: /([:\w\-\.]+)\s*=\s*(".*?"|'.*?'|\w+)*|(\w+)/gm, 	attrCss: 'variable', valueCss: 'string', func: addAttribute },	// attributes
		{ regex: /(?:\&lt;|<)\/*\?*\s*([:\w-\.]+)/gm, 				css: 'keyword', func: addTagName }	// tags
	];
};

dp.sh.Brushes.Xml.aliases	= ['xml', 'xhtml', 'xslt', 'html', 'xhtml'];
dp.sh.Brushes.Xml.prototype	= new dp.sh.Highlighter();
// Local Variables:
// mode: javascript
// indent-tabs-mode: t
// c-file-style: "stroustrup"
// End:
