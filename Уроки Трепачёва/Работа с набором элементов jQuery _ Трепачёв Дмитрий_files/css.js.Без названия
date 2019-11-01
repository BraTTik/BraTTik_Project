$(document).ready(
	function(){
		//Исправляем баг с ячейками таблицы
			var selector = '.table-linked td a';
			$(selector).each(
				function(){
					var href = $(this).attr('href');
					$(this).parent().click(function(){
						window.location = href;
					});
				}
			);
		//-
	}
);

