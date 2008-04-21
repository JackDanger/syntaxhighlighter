<?
$show_source = true;

$title = 'CSS Demo';

$sample = <<<EOF
<pre class="brush: css">
    /* Main style for the table */
    
    /* Issue #4 (http://code.google.com/p/syntaxhighlighter/issues/detail?id=4) */
    a.button:active {  
        background-position: bottom right;
        background-position: top left;
    }
    /* end */
    
    /* Issue #23 (http://code.google.com/p/syntaxhighlighter/issues/detail?id=23) */
    a.button:active {  
        _background-position: bottom right;
        font-size: 23px;
    }
    /* end */
    
    .dp-highlighter
    {
        font-family: "Courier New", Courier, mono;
        font-size: 12px;
        text-align: left;
        border: 1px solid #2B91AF;
        background-color: #fff;
        width: 99%;
        overflow: auto;
        line-height: 100% !important;
        margin: 18px 0px 18px 0px;
    }
    
    .dp-highlighter ol
    {
        margin: 0px 0px 0px 45px;
        padding: 0px;
        color: #2B91AF;
    }
    
    .dp-highlighter ol li
    {
        border-left: 3px solid #6CE26C;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        padding-left: 10px;
    }
    
    .dp-highlighter ol li.alt
    {
        background-color: #f8f8f8;
    }
</pre>
EOF;
