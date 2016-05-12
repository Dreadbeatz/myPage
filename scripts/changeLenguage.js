checkCookie("en");
var lang = getCookie("lang");

if(lang == "en"){
	engClasses();
}else{
	sloClasses();
}

$(document).ready(function(){
	$('#eng').click(function(){
		lang = "en";
		setCookie("lang",lang,1);
		engClasses();
	});

	$('#slo').click(function(){
		lang = "sl";
		setCookie("lang",lang,1);
		sloClasses();
	});
});

function sloClasses(){
	$('#slo').removeClass('darken').addClass('active');
	$('#eng').removeClass('active').addClass('darken');
	$('#hom').html('Domov');
	$('#abt').html('O Meni');
	$('#con').html('Kontakt');
	$('html').attr('lang', lang);
}
function engClasses(){
	$('#eng').removeClass('darken').addClass('active');
	$('#slo').removeClass('active').addClass('darken');
	$('#hom').html('Home');
	$('#abt').html('About Me');
	$('#con').html('Contact');
	$('html').attr('lang', lang);
}