<?
$show_source = true;

$title = 'Java';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: java">
	package us.prokhorenko.jx;
	import us.prokhorenko.jx.Person;
	import org.exolab.castor.xml.*;
	import java.io.*;
	import java.util.*;
	
	public class Test {
		public static void main(String args[]) {
			try {
				/***********************************
				 ** Multiline block comments
				 **********************************/
				
				string stringWithUrl1 = "http://blog.dreamprojections.com";
	
				// Marshalling class to XML
				
				// Create the Person class
				Person person = new Person("Mr. White", "mr@white", "626-555-1234");
				
				// Marshal and save to XML file
				FileWriter file = new FileWriter("person.xml");
				Marshaller m = new Marshaller(file);
				m.marshal(person);
				file.close();
				
				// Unmarshalling XML to class
				
				// Read from XML and unmarshal
				FileReader uFile = new FileReader("person.xml");
				Unmarshaller u = new Unmarshaller();
				Person uPerson = (Person)u.unmarshal(Person.class, uFile);
				
				// Show name and email
				System.out.println("name: " + uPerson.getName());
				System.out.println("email: " + uPerson.getEmail());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
</pre>
EOF;
