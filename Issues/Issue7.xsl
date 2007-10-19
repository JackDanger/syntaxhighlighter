<?xml version="1.0" encoding="UTF-8"?>
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
