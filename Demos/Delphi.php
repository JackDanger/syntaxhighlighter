<?
$show_source = true;

$title = 'Delphi';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: delphi">
	(***********************************
	 ** Multiline block comments
	 **********************************)
	{\$IFDEF VER140}
	procedure TForm1.Button1Click(Sender: TObject);
	var
	  Number, I, X: Integer;
	  Y: Integer;
	begin
	  str := 'http://blog.dreamprojections.com';
	
	  Number := 12356;
	  Caption := 'The Number is ' + IntToStr(Number);
	  
	  for I := 0 to Number do
	  begin
	    Inc(X);
		{
	      Dec(X);
	      X := X * 1.0;
		}
	    Y := $F5D3;
	    ListBox1.Items.Add(IntToStr(X));
		
		(* 
		ShowMessage('Hello'); *)
	  end;
	  
	  asm
	    MOV AX,1234H
	//    MOV Number,AX
	  end;
	end;
</pre>
EOF;
