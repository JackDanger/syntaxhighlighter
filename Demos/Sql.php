<?
$show_source = true;

$title = 'SQL';

$content = <<<EOF
EOF;

$sample = <<<EOF
<pre class="brush: sql">
	SELECT TOP 10
		FirstName,
		LastName,
		Email,
		--SUBSTRING(Phone, 2, 3) AS CityCode,
		SUBSTRING(Phone, 7, 8) AS PhoneNumber,
		upper(LanguagePref) AS Language,
		Address1,
		UpdatedOn AS CreatedOn
	FROM
		profiles
	WHERE
		-- Exclude all test emails
		Email NOT LIKE '%test%'
		AND Email NOT LIKE '%asdf%'
	ORDER BY
		UpdatedOn DESC
</pre>
EOF;
