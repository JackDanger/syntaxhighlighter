<?
$show_source = true;

$title = 'Collapse Code';

$content = <<<EOF
	<p>You can have the code collapsed by adding <code>collapse: true</code>.</p>
	<p><code>&lt;pre class="brush: c-sharp; collapse: true" /></code></p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp; collapse: true">
	1	2	3	4	5	6	7	8	9
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>
EOF;
