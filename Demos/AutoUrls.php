<?
$show_source = true;

$title = 'Auto Links';

$content = <<<EOF
	<p>SyntaxHighlighter by default turns all URLs into actual links.</p>
	
	<p>This can be disabled by setting property <code>auto-links</code> to <code>false</code>.</p>
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp">
    /* http://blog.dreamprojections.com */
	"http://blog.dreamprojections.com"
</pre>

<pre class="brush: c-sharp; auto-links: false">
    /* http://blog.dreamprojections.com */
	"http://blog.dreamprojections.com"
</pre>
EOF;
