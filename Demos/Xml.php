<?
$show_source = true;

$title = 'XML / HTML';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: xml">
	&lt;?xml version="1.0" encoding="utf-8" ?> 
	
	&lt;!-- comments -->
	&lt;rootNode>
		&lt;childNodes>
			&lt;childNode attribute = "value" namespace:attribute='value' attribute=/>
			&lt;childNode />
			&lt;childNode />
			&lt;childNode />
			&lt;childNode attribute="value">&lt;/childNode>
			&lt;namespace:childNode>
				&lt;![CDATA[
					this is some CDATA content
					&lt;!-- comments inside cdata -->
					&lt;b alert='false'>tags inside cdata&lt;/b>
				]]>
			&lt;/namespace:childNode>
		&lt;/childNodes>
	&lt;/rootNode>
	
	&lt;!--
	  -- Multiline comments &lt;b>tag&lt;/b>
	  -->
</pre>
EOF;
