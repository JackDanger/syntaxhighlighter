<?
$show_source = true;

$title = 'Smart tabs';

$content = <<<EOF
	<p>The tabs are converted to spaces and smart tabs are used 
	to preserve column layout with assumption that each column is 
	4 spaces.</p>
	
	<p>You can change the column size using <code>smart-tabs-size</code>
	property and disable it all together by setting <code>smart-tabs</code>
	to <code>false</code></p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp;">
	1	2	3	4	5	6	7	8	9	10
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>

<pre class="brush: c-sharp; smart-tabs-size: 2">
	1	2	3	4	5	6	7	8	9	10
	string		path					= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo			= new FileInfo(string.Format("{0}/{1}", path, image));
	int				index					= 0;
</pre>
EOF;
