<?
$show_source = true;

$title = 'Plain text';

$content = <<<EOF
	<p>Only formatting is performed, no color highlighting.</p>
EOF;

$sample = <<<EOF
<pre class="brush: plain">
	// single line comments
	// second single line
	override protected void OnLoad(EventArgs e)
	{
		if(Attributes["class"] != null)
		{
			//_year.CssClass = _month.CssClass = _day.CssClass = Attributes["class"];
		}
		base.OnLoad(e);
	}
</pre>
EOF;
