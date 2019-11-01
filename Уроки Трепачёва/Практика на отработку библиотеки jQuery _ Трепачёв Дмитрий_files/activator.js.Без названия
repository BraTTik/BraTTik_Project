/*
	<li><a href="/folder/index.html" data-activate>ссылка</a></li>
	<li><a href="/folder/" data-activate>ссылка</a></li>
	<li><a href="/folder/" data-activate data-activate-parent>ссылка</a></li>
	
	<li><a href="/folder/" data-activate data-activate-folder>ссылка</a></li> - по папке из href
	<li><a href="/folder/subfolder/index.html" data-activate data-activate-folder="/folder/">ссылка</a></li>
	<li><a href="/folder/subfolder/index.html" data-activate data-activate-folder="/folder1/, /folder2/, /folder3/">ссылка</a></li>
	<li data-activate data-activate-folder="/folder/">список</li>
*/
window.addEventListener('DOMContentLoaded', function() {
	$('[data-module="activator"][data-activate]').each(function() {
		var $tag = $(this);
		var url = window.location.pathname;
		
		if ($tag.is('a')) {
			var href = $tag.attr('href').replace(/\/index\.html$/, '/');
		} else {
			var href = false;
		}
		
		var hasFolder = $tag.is('[data-activate-folder]');
		if (hasFolder) {
			var folder = $tag.attr('data-activate-folder');
			
			if (folder.indexOf(',') !== -1) {
				var folders = folder.split(', ');
				
				for (var i = 0; i < folders.length; i++) {
					if (url.indexOf(folders[i]) === 0) {
						activate($tag);
						break;
					}
				}
			} else if (folder.length > 0) {
				if (url.indexOf(folder) === 0) {
					activate($tag);
				}
			} else {
				if (href && url.indexOf(href) === 0) {
					activate($tag);
				}
			}
		} else {
			
			if (url == href) {
				activate($tag);
			}
		}
	});
	
	function activate($tag) {
		if ($tag.is('[data-activate-parent]')) {
			$tag.parent().addClass('active');
		} else {
			$tag.addClass('active');
		}
	}
});