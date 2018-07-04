$(document).ready(function(){
	//conecto con internet y descargo datos
			CargarTabla();


			$("#tablaArticulo").DataTable(
				// "ajax":"datos.txt",
				// "columns":
				// [
					// {"data":"name"},
					// {"data":"capital"},
					// {"data":"population"},
					// {"data":"area"},
					// {"data":"flag"}
				//]
			);

			$.getJSON("http://localhost/php/API/web/app_dev.php/API/categorias",
			function(data){
				var select=$("#categoria");
				for (var i=0;i<data.length;i++)
					
					$("<option>").text(data[i].descripcion).val(data[i].idcategoria).appendTo(select);
			})
			

			


												//GUARDAR NUEVO ARTICULO
			$("#guardar").on("click",function(ev)
			{
				ev.preventDefault();
				var datos= $(this).parent().serialize();
				console.log(datos);//saca por consola los datos que enviamos por post
				//$.ajax
				//guardar
				$.ajax({
					url:"http://localhost/php/API/web/app_dev.php/API/Articulo/nuevo",
					method:"POST",
					data:datos,
					dataType:"json"

				}).done(function(data)
				{
					console.log(data);//esto no es necesario, saca por consola el ok:200 que devuelve el servidor
					CargarTabla();
					
					
				}).always(function()
				{
					//alert("transmision finalizadaa");ESTO ME SERVIA PARA COMPROBAR QUE FUNCIONABA
				}).fail(function(data)
				{
					alert("error");
				})
			})



			function CargarTabla()
			{
				
				$.getJSON("http://localhost/php/API/web/app_dev.php/API/Articulo",
				function(data){
					$("#tablaArticulo tbody tr").remove();
					var tbody=$("#tablaArticulo tbody");
					for (var i=0;i<data.length;i++)
					{
							var id=data[i].idarticulo;
							
							fila=$("<tr>");
							
							$("<td>").text(data[i].idarticulo).appendTo(fila);
							$("<td>").text(data[i].descripcion).appendTo(fila);
							$("<td>").text(data[i].numejemplar).appendTo(fila);
							$("<td>").text((data[i].categoriacategoria).descripcion).appendTo(fila);

							
							var borrarArticulo=$("<div  class="+"borrar"+"></div>").on("click", articuloErase(id));
							var celda=$("<td>");
							celda.append(borrarArticulo);
							fila.append(celda);
							var editArticulo=$("<div  class="+"editar"+"></div>").on("click",articuloEdicion(id));
							var celda2=$("<td>");
							celda2.append(editArticulo);
							fila.append(celda2);
							tbody.append(fila);
							
					}
					
				
				})
			}




			function articuloErase(id)
			{
				 return function(ev)
				 {
					 ev.preventDefault();
					 $.ajax
					 (
						 {
							url:"http://localhost/php/API/web/app_dev.php/API/Articulo/borrar/"+id,
							method:"DELETE",
							dataType:"text",
							success:function()
							{
								CargarTabla();
							}
						 }
					 )
				 }
			}

			//METODO QUE RELLENA LA TABLA CON CUALQUIER JSON

			function CargarTablaJson(data)
			{
				
				
				
					$("#tablaArticulo tbody tr").remove();
					var tbody=$("#tablaArticulo tbody");
					
					for (var i=0;i<data.length;i++)
					{
							
							var id= data[i].idarticulo;
							fila=$("<tr>");
							
							$("<td>").text(data[i].idarticulo).appendTo(fila);
							$("<td>").text(data[i].descripcion).appendTo(fila);
							$("<td>").text(data[i].numejemplar).appendTo(fila);
							$("<td>").text((data[i].categoriacategoria).descripcion).appendTo(fila);

							
							var borrarArticulo=$("<div  class="+"borrar"+"></div>").on("click", articuloErase(id));
							var celda=$("<td>");
							celda.append(borrarArticulo);
							fila.append(celda);
							var editArticulo=$("<div  class="+"editar"+"></div>").on("click",articuloEdicion(id));
							var celda2=$("<td>");
							celda2.append(editArticulo);
							fila.append(celda2);
							tbody.append(fila);
							
					}
					
				
				}
			


				//BUSCAR POR CADENA
			
			$("#buscaPorCadena").on("click",function(ev)
			{
				ev.preventDefault();
				
				
				cadena=$("#cadenaAbuscar").val();
				



			 $.ajax({
			 	url:"http://localhost/php/API/web/app_dev.php/API/Articulo/buscarCadena/"+cadena,
			 	method:"GET",
			 	dataType:"json",

			 }).done(function(data)
			 {
				 console.log(data);
				CargarTablaJson(data);

			 })
			
				
				
			})









			function articuloEdicion(id)
			{
				 return function(ev)
				 {
					 ev.preventDefault();
					 
					 document.getElementById('id01').style.display='block';//esto carga la ventana modal

					 $('#tituloEdit').html("Edicion del Articulo "+id);


				
					// aqui cargo el select con todas las opciones
					 $.getJSON("http://localhost/php/API/web/app_dev.php/API/categorias", function(data){
						 var select=$("#categoriaEdit");
						 for (var i=0;i<data.length;i++)
							 {
							 	$("<option>").text(data[i].descripcion).val(data[i].idcategoria).appendTo(select);
							 }
					})
					// traigo los articulos para dar valores al formulario
					 $.getJSON("http://localhost/php/API/web/app_dev.php/API/Articulo/buscar/"+id,
					 function(data){
						
							 
								$('#descripcionEdit').val(data.descripcion);
								$('#numejemplaresEdit').val(data.numejemplar);
								$("#categoriaEdit").val((data.categoriacategoria).idcategoria);
							    $("#guardarEdit").click(ModificarArticulo(id));//aqui se le añade la id al boton
						 
						})

						
					 
				}	

										//GUARDAR  ARTICULO 	editado
			}
			//var editarArticulo=$("#guardarEdit").on("click", ModificarArticulo(id));

			function ModificarArticulo(id)
			{
				 return function(ev)
				 {
					 ev.preventDefault();
				
				var datos= $(this).parent().serialize();
				console.log(datos);//saca por consola los datos que enviamos por post
				//$.ajax
				//guardar
				$.ajax({
					url:"http://localhost/php/API/web/app_dev.php/API/Articulo/modificar/"+id,
					method:"POST",
					data:datos,
					dataType:"json"

				}).done(function(data)
				{
					console.log(data);//esto no es necesario, saca por consola el ok:200 que devuelve el servidor
					CargarTabla();
					
					
				}).always(function()
				{
					alert("transmision finalizadaa");//ESTO ME SERVIA PARA COMPROBAR QUE FUNCIONABA
				}).fail(function(data)
				{
					alert("error");
				})
				} 
			}
												
			

})

