<?
$show_source = true;

$title = 'Highlighted lines';

$content = <<<EOF
	<p>SyntaxHighlighter allows you to place emphasis on one or more lines
	in your code snippet by changing <code>highlight-lines</code> property.</p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp; highlight-lines: 2">
	1	2	3	4	5	6	7	8	9	10
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>

<pre class="brush: c-sharp; highlight-lines: [2, 4]">
	1	2	3	4	5	6	7	8	9	10
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>
EOF;
