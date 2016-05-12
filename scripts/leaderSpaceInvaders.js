$(document).ready(function(){
	$.get('/leaderSpaceInvaders', function(data){
		//alert(data);
		for(var i = 0; i < 10; i += 1){
			if(i == 0){
				$('#leader').append('<caption id="leadTitle">Leaderboard</caption>')
			}
			$('#leader').append('<tr id="entry"><td id="leadNumb">' + (i+1) + '</td><td>' + data[i].score + '</td><td>' + data[i].name + '</td></tr>');
		}
	});
});