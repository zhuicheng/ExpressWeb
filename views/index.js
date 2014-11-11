<html>
	<head>
		<title><%=title %></title>
	</head>
	<body>
		<h2><%=content %></h2>
		<div>人员名单</div>
		<% users.forEach(function(u) { %>
			<div>
				<span>姓名：<%=u.name %></span>
				<span style='margin-left: 20px;'>年龄：<%=u.age %></span>
			</div>
		<% }) %>
	</body>
</html>