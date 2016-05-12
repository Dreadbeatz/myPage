$(document).ready(function(){
	$.get('/leaderSpaceInvaders', function(data){
		for(var i = 0; i < 10; i += 1){
			if(i == 0){
				$('#leader').append('<caption id="leadTitle">Leaderboard</caption>')
			}
			$('#leader').append('<tr id="entry"><td id="leadNumb">' + (i+1) + '</td><td>' + data[i].score + '</td><td>' + data[i].name + '</td></tr>');
		}
	});
	jezik(lang);
	$('#slo, #eng').click(function(){
		jezik(lang);
	});
});

function jezik(l){
	var txt = "";
	if(l == "en"){
		txt = "The  game is a copy of the old and famous 'Space invaders game'. It is coded in Javascript using canvas for rendering."
	}else if(l == "sl"){
		txt = "Kopija stare in popularne igre 'Space invaders'. Sprogramirana v Javascript-u in predstavljena z pomočjo canvas-a."
	}
	$("#inf").html(txt);
}