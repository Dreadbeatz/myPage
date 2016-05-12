$(document).ready(function(){
	$('#start').click(function(){
		startGame();
		$(this).remove();
		$('#leader').remove();
	});
});