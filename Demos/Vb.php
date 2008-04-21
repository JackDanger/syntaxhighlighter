<?
$show_source = true;

$title = 'Visual Basic';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: vb">
	''
	'' This is a VB test
	''
	'
	' This is a VB test
	'
	
	Imports System.Collections
	
	Dim stringWithUrl = "http://blog.dreamprojections.com"
	
	Public Class MyVbClass
	    Private m_MyString As String
	
	    Public Sub New()
	        myString = "Hello there"
	    End Sub
	
	    Public Property MyString() As String
	        Get
	            Return m_MyString
	        End Get
	        Set(ByVal Value As String)
	            m_MyString = Value
	        End Set
	    End Property
	
	#Region "This is my region"
	    ' This is a comment
	    Public Function MyFunction( ByVal i as Integer ) As Double
	        MyFunction = 123.456
	    End Function
	#End Region
	End Class
</pre>
EOF;
