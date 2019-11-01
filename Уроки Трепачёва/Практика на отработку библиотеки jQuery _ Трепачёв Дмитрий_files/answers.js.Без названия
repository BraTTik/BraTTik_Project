$(document).ready(
	function(){
		//Для показа подсказок к задачам
			$('[data-module="answers"][data-behavior="help-block"]').each(function() {
				var $prev = $(this).prevAll(':not([data-behavior="answer-block"])').first();
				var text = '<a href="#" data-module="answers" data-behavior="toggle--help-block">Показать подсказку.</a>';
				if ($prev.is('pre')) {
					$prev.after('<p class="squeezed">'+text+'</p>');
				} else {
					$prev.append(' '+text);
				}
			});
		
			$('[data-module="answers"][data-behavior="toggle--help-block"]').click(
				function() {
					toggleText('Показать подсказку.', 'Скрыть подсказку.', this)
						
					$(this).parent().nextAll('[data-behavior="help-block"]').slideToggle(100);
					return false;
				}
			)
			
		//-
		//Для показа ответов на задачи
			$('[data-module="answers"][data-behavior="answer-block"]').each(function() {
				var $prev = $(this).prevAll(':not([data-behavior="help-block"])').first();
				var text = '<a href="#" data-module="answers" data-behavior="toggle--answer-block">Показать решение.</a>';
				if ($prev.is('pre') || $prev.is('code') || $prev.is('p:has(code)') || $prev.is('div.example-block')) {
					$prev.after('<p class="squeezed">'+text+'</p>');
				} else {
					$prev.append(' '+text);
				}
			});
			
			$('[data-module="answers"][data-behavior="toggle--answer-block"]').click(
				function(){
					toggleText('Показать решение.', 'Скрыть решение.', this)
						
					$(this).parent().nextAll('[data-behavior="answer-block"]').slideToggle(100);
					return false;
				}
			)
			
		//-
		//Вспомогательная функция
			function toggleText(first, second, elem){
				var $html = $(elem).html();
				if ($html == first) $(elem).html(second);
					else $(elem).html(first);
			}
		//-
		
		
	}
);