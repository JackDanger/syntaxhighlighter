<?
$show_source = true;

$title = '';

$content = <<<EOF
	<p>You can change the starting line number by adding <code>first-line: value</code>.</p>
	<p><code>&lt;pre class="brush: c-sharp; first-line: 42" /></code></p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp; first-line: 42">
	1	2	3	4	5	6	7	8	9
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>
EOF;
