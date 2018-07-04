$("document").ready(function(){
	var peticionPaises=null;
	$("#zona").on("keyup",function(ev){
		var consulta=$(this).val();
		$("#paises").html("");
		if (consulta!=""){
			if(peticionPaises)
				peticionPaises.abort();
			peticionPaises=$.getJSON("https://restcountries.eu/rest/v2/region/"+consulta,
				function(data){
					var i;
					for (i=0;i<data.length;i++){
					  var opt=$("<div>").text(data[i].name).attr("valor",data[i].alpha3Code);
					  opt.css({"background-image":"url("+data[i].flag+")",
					           "background-size":"contain",
							   "background-repeat":"no-repeat",
							   "padding-left":"50px"})
					  opt.draggable({ revert: true, 
					                  helper: "clone",
									  cursor: "crosshair"});
					  opt.appendTo($("#paises"))
					  opt.click(function(){
						  $.getJSON("https://restcountries.eu/rest/v2/alpha/" + $(this).val(),
						  function(data){
							$("#contenedor").html("").append($("<img>").attr("src",data.flag))  
							console.log(data);
						  })
					  });
					} 
					})
		}
	
	})
	
	$(".contenedor").droppable({
		                 drop: function (event,ui){
							 var codigo=ui.draggable.attr("valor")
							 $.getJSON("https://restcountries.eu/rest/v2/alpha/" + codigo,
							  function(data){
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
								$(event.target).html("");
								$(event.target).append(tabla);
								var contenido=$(event.target).html();
								$(".contenedor").html(contenido);
								$("tr:even").css("background-color","#e6e6e6");
							  })
							 }
						 
		            });
});