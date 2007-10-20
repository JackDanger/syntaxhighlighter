<?xml version="1.0" encoding="UTF-8"?>
<!--
  Code Syntax Highlighter
  Version 1.5.1
  Copyright (C) 2004-2007 Alex Gorbatchev
  http://www.dreamprojections.com/syntaxhighlighter/
 
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, version 3 of the License.
 
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
 
   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/test">

<html>
<head>

<link type="text/css" rel="stylesheet" href="Styles/SyntaxHighlighter.css"></link>

<script language="javascript" src="Scripts/shCore.js"></script>
<script language="javascript" src="Scripts/shBrushPython.js"></script>

<script language="javascript"><![CDATA[
function winOnLoad() {
  dp.sh.HighlightAll('code');
}
window.onload = winOnLoad;
]]></script>

</head>
<body>

<pre name="code" class="py">
  <xsl:value-of select="." />
</pre>

</body>
</html>

</xsl:template>
</xsl:stylesheet>
