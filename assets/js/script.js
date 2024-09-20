let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripciones = [];

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcion = document.getElementById('descripcion').value;
    
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripciones.push(descripcion);

    actualizarListaGastos();
    mensaje(valorGasto);
}

function actualizarListaGastos(){
    //esta se define como const debido a que es un elemento que no va cambiar (se le agregan cosas pero el elemento no cambia)
    const listaElementos= document.getElementById('listaDeGastos');
    
    let htmlLista = '';
    let totalGastos = 0;
    
    const totalElementos = document.getElementById('totalGastos');
    
    //metodo para recorrer los arreglos, igual al for pero este es especial para los arreglos
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]); // number para convertir la lista de valores de gastos a numeros
        const mostrarDescripcion = listaDescripciones[posicion];
        
        //las comillas `` son para evitar concatenaciones, si quiero brindar las varibales me toca ponerlas entre ${variable}
        htmlLista  += `<li>${elemento} - USD ${valorGasto.toFixed(2)} - Descripción: ${mostrarDescripcion}
                       <button style="margin: auto 10px" onclick="mensajeConfirmacionEliminar(${posicion});">Eliminar</button>
                       <button style="margin: auto 10px" type="button" onclick="mostrarElementos(${posicion})" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Editar</button>
                        </li>`; // utilizamos igual el ${variable} para que se identifique el argumento que mandamos a la funcion que esta esperando el parametro y recoradar que el .tofixed es para determinar la cantidad de decimales que quiero
        
        //calculamos el total de los gastos, y utilizamos la funcion Number porque pueden ser enteros o con decimales, por lo que la funcion solo convierte el string a un numero
        totalGastos += Number(valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2); // esta funcion de toFixed es para definir la cantidad de decimales que yo quiero, en este caso 2
    limpiar();
}

//funcion que se ejecuta despues de haber anadido un gasto
function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcion').value = '';
}

//funcion para eliminar el gasto
function eliminar(posicion){
    console.log(posicion);
    //splice elimina segun la posicion que se le brinda y pide la cantidad por lo que se brinda solo uno
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    //ya que despues de eliminar no se actualizaba, es necesario llamar la siguiente funcion
    actualizarListaGastos();
}

//primero se ejecuta esto para evitar que se elimine sin querer un gasto
function mensajeConfirmacionEliminar(posicion){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-espacio",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Desea eliminar el gasto?",
        text: "Si lo elimina no volvera a aparecer en pantalla",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Elimnar",
        cancelButtonText: "Cancelar",
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
            eliminar(posicion);
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: "Registro eliminado exitosamente",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "¡Cancelado!",
            text: "No se ha eliminado el registro",
            icon: "Warning"
          });
        }
      });
}


//funcion que emite alerta de si el gasto es mayor o no de $150, de igual forma lo almacena porque es lo deseado
function mensaje(gasto){
    let valor = Number(gasto);
    if(valor > 150){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Se ha registrado exitosamente, pero atención, el gasto es mayor a $150",
            showConfirmButton: false,
            timer: 3000
          });
    }else{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se registro exitosamente",
            showConfirmButton: false,
            timer: 2500
          });
    }
}

//esto es para mostrar el elemento de cada uno del arreglo
function mostrarElementos(posicion){
    document.getElementById('posicionArreglo').value = posicion; //ojo que cambie nombres para evitar equivocarme pero siempre hace referencia a la posicion
    document.getElementById('modalNombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('modalValorGasto').value = listaValoresGastos[posicion];
    document.getElementById('modalDescripcion').value = listaDescripciones[posicion];
}


//funcion que edita el toda la informacion anadida del gasto
function editar(){
    let valor = document.getElementById('posicionArreglo').value;
    let posicion = Number(valor);
    listaNombresGastos[posicion] = document.getElementById('modalNombreGasto').value;
    listaValoresGastos[posicion] = document.getElementById('modalValorGasto').value;
    listaDescripciones[posicion] = document.getElementById('modalDescripcion').value;
    actualizarListaGastos();
}