<?
$show_source = true;

$title = 'Ruby';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: ruby">
	# {tagname}	{tagfile}	{tagaddress}[;"	{tagfield}..]
	# "A tagfield has a name, a colon, and a value: "name:value".
	# The name of the "kind:" field can be omitted.  A program reading the
	# tags file can recognize the "kind:" field by the missing ':'.
	  
	class Parser
	  @@parsers = []
	
	  def get_type()
	    return ""
	  end
	  
	  def parse( xml )
	  	@var = nil
	    return nil
	  end
	
	  def Parser.add_parser( :symlink )
	    @@parsers.push( p )
	  end
	  def Parser.parsers()
	    return @@parsers
	  end
	end
	
	class RSSParser < Parser
	  def get_type()
	    return "RSS"
	  end
	  
	  def parse( xml )
	    # Parse the XML up and return some known format
	    return nil
	  end
	end
	
	Parser.add_parser( RSSParser )
	
	class RDFParser < Parser
	  def get_type()
	    return "RDF"
	  end
	  
	  def parse( xml )
	    # Parse the XML up and return some known format
	    return nil
	  end
	end
	
	Parser.add_parser( RDFParser )
</pre>
EOF;
