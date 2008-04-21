<?
$show_source = true;

$title = 'Smart tabs';

$content = <<<EOF
	<p>The tabs are converted to spaces and smart tabs are used 
	to preserve column layout with assumption that each column is 
	4 spaces.</p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp">
	1	2	3	4	5	6	7	8	9	10
	string		path			= "";
	string		safeReferrer	= null;
	FileInfo	fileInfo		= new FileInfo(string.Format("{0}/{1}", path, image));
	int			index			= 0;
</pre>
EOF;
