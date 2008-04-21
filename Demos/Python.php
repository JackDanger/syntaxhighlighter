<?
$show_source = true;

$title = 'Python';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: python">
	"""
	Comment\"
	string
	"""
	
	cache = {}
	
	string s = "## comments inside a string"
	string str = "helllo \"world\", how things?" + 10 + "word" + "hello" # and " some more here
	
	def arrange(plans, lines, totalMinutes):
	    """arrangements of plans taken lines times with an heuristic that the sum
	       of values in one arrangement is less then totalMinutes
	    """
	    #if in cache we are done otherwise start calculating and save them to cache
	    if (plans, lines, totalMinutes) in cache:
	        return cache[(plans, lines, totalMinutes)]
	    if lines==1:
	        r = [[plan] for plan in plans]
	        cache[(plans, lines, totalMinutes)] = r
	        return r
	    solutions = []
	    for plan in plans:
	        for ar in sort(list(arrange(plans, lines-1, totalMinutes))):
	            try:
	                one_solution = tuple(sort([plan] + list(ar)))
	                if sum(one_solution) &lt;= totalMinutes and one_solution not in solutions:
	                    solutions.append(one_solution)
	            except Exception, e:
	                print "Error:", str(e)
	    cache[(plans, lines, totalMinutes)] = solutions
	    return solutions
	
	if __name__ == "__main__":
	    import sys
	    lines, totalMinutes = int(sys.argv[1]), int(sys.argv[2])
	    plans = tuple([int(p) for p in sys.argv[3:]])
	    print "for", lines, totalMinutes, plans
	    for sol in arrange(plans, lines, totalMinutes):
	        print sol
</pre>
EOF;
