<?
$show_source = true;

$title = 'Blogger Compatability';

$content = <<<EOF
	<p>Blogger has a nasty habit of replacing all new lines with 
	&lt;br/> tags which makes it impossible to post code snippets.</p>
	
	<p>To fix the problem there's a so called "Blogger Mode" which 
	can be enabled before a <code>highlight()</code> by a calling 
	to bloggerMode() like in the example below:</p>
	
	<pre class="brush: js">
		dp.SyntaxHighlighter.BloggerMode();
		dp.SyntaxHighlighter.highlight();
	</pre>
	<script type="text/javascript">
		window.isBloggerMode = true;
	</script>

	<p>Here's the code as posted by Blogger:</p>
	
	<code>
	&lt;script type='text/javascript'>&lt;br />_WidgetManager._Init=function(){};&lt;br />_WidgetManager._SetPageActionUrl=function(){};&lt;br />_WidgetManager._SetDataContext=function(){};&lt;br />_WidgetManager._SetSystemMarkup=function(){};&lt;br />_WidgetManager._RegisterWidget=function(){};&lt;br />&lt;/script>
	</code>

	<p>Here's the highlighted result:</p>
	
	<pre class="brush: js">
	&lt;script type='text/javascript'><br />_WidgetManager._Init=function(){};<br />_WidgetManager._SetPageActionUrl=function(){};<br />_WidgetManager._SetDataContext=function(){};<br />_WidgetManager._SetSystemMarkup=function(){};<br />_WidgetManager._RegisterWidget=function(){};<br />&lt;/script>
	</pre>
EOF;
