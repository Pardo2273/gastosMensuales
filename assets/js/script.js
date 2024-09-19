let listaNombresGastos = [];
let listaValoresGastos = [];

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);

    actualizarListaGastos();
    
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
        
        //las comillas `` son para evitar concatenaciones, si quiero brindar las varibales me toca ponerlas entre ${variable}
        htmlLista  += `<li>${elemento} - USD ${valorGasto.toFixed(2)} 
                       <button id="" onclick="eliminar(${posicion});">Eliminar</button>
                        </li>`; // utilizamos igual el ${variable} para que se identifique el argumento que mandamos a la funcion que esta esperando el parametro y recoradar que el .tofixed es para determinar la cantidad de decimales que quiero
        
        //calculamos el total de los gastos, y utilizamos la funcion Number porque pueden ser enteros o con decimales, por lo que la funcion solo convierte el string a un numero
        totalGastos += Number(valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2); // esta funcion de toFixed es para definir la cantidad de decimales que yo quiero, en este caso 2
    limpiar();
}

function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

function eliminar(posicion){
    console.log(posicion);
    //splice elimina segun la posicion que se le brinda y pide la cantidad por lo que se brinda solo uno
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    //ya que despues de eliminar no se actualizaba, es necesario llamar la siguiente funcion
    actualizarListaGastos();
}

/*desafios a relizar
Generar un mensaje de alerta cuando se registre un gasto mayor a 150$ dólares.
Agregar un nuevo campo donde se pueda colocar una descripción más detallada del gasto.
Agregar un botón que permita modificar los gastos registrados.*/