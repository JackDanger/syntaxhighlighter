<?
$show_source = true;

$title = '';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: js">
	/* Test case for issue #15 (http://code.google.com/p/syntaxhighlighter/issues/detail?id=15) */
	// This comment has a ' character.
	line_ok();
	a_string = 'hello';
	line_bad();
	// This comment has a ' character.
	/* end */
	
	/***********************************
	 ** Multiline block comments
	 **********************************/
	
	// Hang test à partir de l`idagence / id type publication ``````
	
	var stringWithUrl1 = "http://blog.dreamprojections.com";
	var stringWithUrl2 = 'http://www.dreamprojections.com';
	
	// callback for the match sorting
	dpSyntaxHighlighter.prototype.SortCallback = function(m1, m2)
	{
		// sort matches by index first
		if(m1.index < m2.index)
			return -1;
		else if(m1.index > m2.index)
			return 1;
		else
		{
			/*
	// 		if index is the same, sort by length
			if(m1.length < m2.length)
				return -1;
			else if(m1.length > m2.length)
				return 1;
			*/
		}
		
		alert('hello // world');
		return 0;
	}
</pre>
EOF;
