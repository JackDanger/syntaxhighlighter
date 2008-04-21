<?
$show_source = true;

$title = 'Hide gutter';

$content = <<<EOF
	<p>You can hide the gutter by adding <code>nogutter</code>.</p>
	<p><code>&lt;pre class="brush: c-sharp; gutter: false"></code></p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp; gutter: false">
	1	2	3	4	5	6	7	8	9	10
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>
EOF;
