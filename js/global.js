$(function() {

	// Lightbox clickthrough
	$(".gallery").each(function() {
		$(this).append('<div class="magnify"><span class="glyphicon glyphicon-search"></span></div>');
	});

	$(".magnify").click(function(e) {
		$(this).hide();
		var coords = document.elementFromPoint(e.clientX, e.clientY);
		$(coords).click();
		$(this).show();
	});

	// Responsive video (16:9 aspect ratio)
	resizeVideo();

	$(window).resize(function() {
		resizeVideo();
	});

	function resizeVideo() {
		$(".videos iframe").each(function() {
			var iframe_width = $(this).width()
			var iframe_height = Math.round((iframe_width/16)*9);
			$(this).height(iframe_height+'px');
		});
	}

	// Tooltips
	$("[data-toggle='tooltip']").tooltip({trigger:"hover"});

	// Equalize columns
	leftColumn = $("#left");
	middleColumn = $("#middle");
	rightColumn = $("#right");
	sidebar = $("#sidebar");

	sidebar.width(leftColumn.width());

	equalizeColumns(leftColumn, middleColumn, rightColumn);

	$(window).resize(function() {
		equalizeColumns(leftColumn, middleColumn, rightColumn);
		sidebar.width(leftColumn.width());
	});

	function equalizeColumns(left, middle, right) {
		if ($(window).width() > 970) {
			maxHeight = middleColumn.height();
			left.height(maxHeight);
			middle.height(maxHeight);
			right.height(maxHeight);
		} else {
			left.height("auto");
			middle.height("auto");
			right.height("auto");
		}
	}

	// Pull latest GitHub Commits
	var callback;
	callback = function(response) {
		var ul;
		response = response.data;
		ul = $("#commits");
		ul.empty();
		return $(response).each(function(index, result) {
			if (result.payload.commits != null) {
				return ul.append('<li><a href="https://github.com/'+result.repo.name+'/commit/'+result.payload.commits[0].sha+'">'+result.payload.commits[0].message+'</a></li>');
			}
		});
	};
	return $.ajax("https://api.github.com/users/ktross/events/public?callback=callback", {
		dataType: "jsonp",
		type: "get"
	}).success(function(response) {
		return callback(response);
	});
});