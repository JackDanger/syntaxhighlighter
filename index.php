<?
$home = ereg_replace('\?.*$', '', $_SERVER['REQUEST_URI']);
$current_page = $_GET['page'];
$current_theme = $_GET['theme'];

$show_source = false;
$sample = null;
$content = null;
$title = null;

//
// Known brushes
//
$brushes = array(
    'CSharp'    => 'C#',
    'Php'       => 'PHP',
    'JScript'   => 'JavaScript',
    'Java'      => 'Java',
    'Vb'        => 'Visual Basic',
    'Sql'       => 'SQL',
    'Xml'       => 'XML',
    'Delphi'    => 'Delphi',
    'Python'    => 'Python',
    'Ruby'      => 'Ruby',
    'Css'       => 'CSS',
    'Cpp'       => 'C++'
);
ksort($brushes);

//
// Features demo
//
$features = array(
    'SmartTabs'     => 'Smart tabs',
    'FirstLine'     => 'First line',
    'CollapseCode'  => 'Expand code',
    'ShowColumns'   => 'Ruler',
    'Blogger'       => 'Blogger integration',
    'NoGutter'      => 'Hide gutter',
    'NoControls'    => 'Hide controls'
);
ksort($features);

$themes = array(
    'Default'   => 'Default',
    'Dark'      => 'Dark' 
);
ksort($themes);

if (!isset($themes[$current_theme]))
    $current_theme = 'Default';
     
$current_page = isset($current_page) && (isset($brushes[$current_page]) || isset($features[$current_page])) 
        ? "Demos/$current_page"
        : 'main'
    ;

include_once("$current_page.php");

function page_url($value)
{
    return url("page", $value);
}

function theme_url($value)
{
    return url("theme", $value);
}

function url($param, $value)
{
    $url = $_SERVER['REQUEST_URI'];
    $arg = "$param=$value";
    $reg = "/$param=\\w+/";
    
    if (preg_match($reg, $url))
    {
        $url = preg_replace($reg, $arg, $url);
    }
    else
    {
        $url .= preg_match('/\\?/', $url) ? '&' : '?';
        $url .= $arg;
    }
       
    return $url;
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--
    Code Syntax Highlighter
    Version 2.0
    Copyright (C) 2004-2008 Alex Gorbatchev
    
    http://www.dreamprojections.com/syntaxhighlighter/
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 3 of the License.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>dp.SyntaxHighlighter</title>
<link type="text/css" rel="stylesheet" href="Styles/shCore.css"></link>
<link type="text/css" rel="stylesheet" href="Styles/shTheme<?= $current_theme ?>.css"></link>
<link href="Styles/TestPages.css" rel="stylesheet" type="text/css">
</head>

<body>

<h1>dp.SyntaxHighlighter 2.0</h1>
<p><a href="http://code.google.com/p/syntaxhighlighter/">http://code.google.com/p/syntaxhighlighter/</a></p>

<h2><?= $title ?></h2>

<div class="layout">

<select onchange="setTheme(this)" size="1">
<? foreach ($themes as $theme => $label) : ?>
    <option value="<?= $theme ?>" <?= $current_theme == $theme ? 'selected="true"' : "" ?>><?= htmlspecialchars($label) ?></option>
<? endforeach; ?>
</select>

<div class="column1">
    <h3>Languages:</h3>
    <ol>
        <? foreach ($brushes as $brush => $label) : ?>
        <li><a href="<?= page_url($brush) ?>"><?= $label ?></a></li>
        <? endforeach; ?>
    </ol>
    <h3>Features:</h3>
    <ol>
        <? foreach ($features as $feature => $label) : ?>
        <li><a href="<?= page_url($feature) ?>"><?= $label ?></a></li>
        <? endforeach; ?>
    </ol>
    <h3>Issues:</h3>
    <ol>
        <li><a href="Issues/Issue7.xml">#7, XSL transformation</a></li>
        <li><a href="Issues/Issue15.html">#15, Incorrect single quote</a></li>
        <li><a href="Issues/Issue10.html">#10, VB crash</a></li>
        <li><a href="Issues/Issue19.html">#19, No matches</a></li>
    </ol>
</div>

<div class="column2">
    <?= $content ?>
    
    <? if (isset($sample) && $sample != null): ?>
        <h3>Highlighted example</h3>
        <?= $sample ?>
        
        <? if ($show_source): ?>
            <h3>Actual source code</h3>
            <pre class="brush: xml"><?= htmlspecialchars($sample); ?></pre>
        <? endif; ?>
    <? endif; ?>
</div>

<div class="footer">
Copyright 2004-2007 Alex Gorbatchev.<br/>
</div>

<script class="javascript" src="Scripts/shCore.js"></script>
<? foreach ($brushes as $brush => $label) : ?>
<script class="javascript" src="Scripts/shBrush<?= $brush ?>.js"></script>
<? endforeach; ?>

<script language="javascript">
function themeUrl(value)
{
    return url("theme", value);
}

function url(param, value)
{
    var url = window.location.toString();
    var arg = param + '=' + value;
    var reg = new RegExp(param + '=\\w+');
    
    if (reg.exec(url))
    {
        url = url.replace(reg, arg);
    }
    else
    {
        url += url.indexOf('?') >= 0 ? '&' : '?';
        url += arg;
    }
    
    return url;
}

function setTheme(sender)
{
    window.location = themeUrl(sender.options[sender.selectedIndex].value);
}

if(window.isBloggerMode == true)
    dp.SyntaxHighlighter.BloggerMode();

dp.SyntaxHighlighter.ClipboardSwf = 'Scripts/clipboard.swf';
dp.SyntaxHighlighter.highlight();
</script>

</body>
</html>
