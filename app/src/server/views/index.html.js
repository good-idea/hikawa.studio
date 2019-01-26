export default ({ title, meta, styles, initialState, app, scripts }) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		${title}
		${meta}
		${styles}
	</head>

	<body>
		<script>
			window.__APOLLO_STATE__ = ${initialState}
		</script>
		<div id="root">${app}</div>
		${scripts}
	</body>
</html>
`
