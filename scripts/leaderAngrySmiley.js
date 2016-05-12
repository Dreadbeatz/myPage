$(document).ready(function(){
	$.get('/leaderAngrySmiley', function(data){
		for(var i = 0; i < 7; i += 1){
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
		txt = "The game Angry smiley is a copy of the famous game 'Flaffy bird'. It is coded in Javascript with the help of canvas technology."
	}else if(l == "sl"){
		txt = "Angry smiely igra je kopija igre 'Flaffy bird'. Sprogramirana je v jeziku Javascript in predstavljena s pomočjo tehnologije canvas."
	}
	$("#inf").html(txt);
}

