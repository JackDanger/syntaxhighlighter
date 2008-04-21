<?
$show_source = true;

$title = 'PHP';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: php">
	/***********************************
	 ** Multiline block comments
	 **********************************/
	
	\$stringWithUrl = "http://blog.dreamprojections.com";
	\$stringWithUrl = 'http://www.dreamprojections.com';
	
	ob_start("parseOutputBuffer");		// Start Code Buffering
	session_start();
	
	function parseOutputBuffer(\$buf) {
		global \$portal_small_code, \$portal_gzcompress;
		global \$PHP_SELF, \$HTTP_ACCEPT_ENCODING;
	
		// cleaning out the code.
		if(\$portal_small_code && !\$portal_gzcompress) {
			\$buf = str_replace("	", "", \$buf);
			\$buf = str_replace("\\n", "", \$buf);
			\$buf = str_replace(chr(13), "", \$buf);
		}
	}
</pre>
EOF;
