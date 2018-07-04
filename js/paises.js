$("document").ready(function(){
	var peticionPaises=null;
	$("#pais").on("keyup",function(ev){
		var consulta=$(this).val();
		$("#paises").html("");
		if (consulta!=""){
			if(peticionPaises)
				peticionPaises.abort();
			peticionPaises=$.getJSON("https://restcountries.eu/rest/v2/name/"+consulta,
				function(data){
					var i;
					var userLang = (navigator.language || navigator.userLanguage).split("-")[0];
					if(userLang=="en"){
					for (i=0;i<data.length;i++){
					  var opt=$("<div>").text(data[i].name)
					  opt.css({"background-image":"url("+data[i].flag+")",
					           "background-size":"contain",
							   "background-repeat":"no-repeat",
							   "padding-left":"50px"})
					  opt.appendTo($("#paises"))
					  opt.click(function(){
						  $.getJSON("https://restcountries.eu/rest/v2/alpha/" + $(this).val(),
						  function(data){
							$("#contenedor").html("").append($("<img>").attr("src",data.flag))  
							console.log(data);
						  })
					  });
					} 
					}else{
					for (i=0;i<data.length;i++){
					  var opt=$("<option>").val(data[i].alpha2Code).text(data[i].translations[userLang])
					  opt.css({"background-image":"url("+data[i].flag+")",
					           "background-size":"contain",
							   "background-repeat":"no-repeat",
							   "padding-left":"50px"})
					  opt.appendTo($("#paises"))
					  opt.click(function(){
						  $.getJSON("https://restcountries.eu/rest/v2/alpha/" + $(this).val(),
						  function(data){
							$("#contenedor").html("").append($("<img>").attr("src",data.flag)) 

						    var tabla=$("<table>");
							var tbody=$("<tbody>");
							for( prop in data){								
								var fila=$("<tr>").appendTo(tbody);
								fila.append($("<td>").text(prop));
							if (typeof(data[prop])!="object"){
								   fila.append($("<td>").text(data[prop]));
								}else{
									var ul=$("<ul>");
								    for (p in data[prop]){
										ul.append($("<li>").text(data[prop][p]))
									}	
									fila.append($("<td>").append(ul))
								}
							}
							tbody.appendTo(tabla);
							$("#contenedor").append(tabla);
							$("tr:even").css("background-color","#e6e6e6");
						  })
					  });
					} 	
					}					
				 })
		}
	
	})
});