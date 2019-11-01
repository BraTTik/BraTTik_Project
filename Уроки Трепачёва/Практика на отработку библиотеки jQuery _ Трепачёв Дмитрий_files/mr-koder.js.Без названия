$(document).ready(function() {

	function addZero(num) {
		if (num <= 9) {
			num = '0' + num;
		}
		
		return num;
	}

	var date = new Date();
	var time = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
	var day = date.getDay();
	
	if (day != 0 && day != 6) {
		if (time <= '09.00' || time >= '22.00') {
			var action = 'sleep';
		} else if ((time >= '10.00' && time <= '11.00') || (time >= '14.00' && time <= '15.00')) {
			var action = 'break';
		} else if (time >= '17.00' && time <= '22.00') {
			var action = 'relax';
		} else {
			var action = 'job';
		}
	} else {
		var action = 'holiday';
	}
	
	$('[data-module="mr-koder"][data-behavior="img"]').attr('src', '/images/mr-koder/'+action+'.png').css('display', 'inline-block');
});