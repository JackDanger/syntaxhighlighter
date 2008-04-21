<?
$show_source = true;

$title = 'C#';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: c-sharp">
	string url = "&lt;a href=\"" + someObj.getUrl() + "\" target=\"_blank\">";
	
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
	
	/***********************************
	 ** Multiline block comments
	 **********************************/
	
	/// &lt;summary>
	///		Gets or sets currently selected date of birth or &lt;see cref="DateTime.MinValue"/> if selection is incomplete or invalid.
	/// &lt;/summary>
	public DateTime Date
	{
		String stringWithUrl = "http://blog.dreamprojections.com";
		
		get
		{
			#region Hello world /* shouldn't be a comment */
			try
			{
				/*
				DateTime result = new DateTime(
					int.Parse(_year.SelectedItem.Value),
	//				int.Parse(_month.SelectedItem.Value),
					int.Parse(_day.SelectedItem.Value)
					);
				
				i *= 2;
				*/
				return result;
			}
			catch
			{
				/* return _minDate; */
			}
			#endregion
		}
		set
		{
			Day		= value.Day;
			Month	= value.Month;
			Year	= value.Year;
		}
	}
</pre>
EOF;
