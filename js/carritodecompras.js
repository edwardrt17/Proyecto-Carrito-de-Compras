const carrito = document.getElementById('carrito');
let curso = document.getElementById('lista-cursos');
const lista = document.querySelector('#lista-carrito tbody');
let vaciarcarritoBtn = document.querySelector('#vaciar-carrito');





//eventos
eventos();

function eventos() {
    curso.addEventListener('click', agregaralcarrito);
    carrito.addEventListener('click', eliminaruncurso);
    vaciarcarritoBtn.addEventListener('click', vaciarcarrito);
    document.addEventListener('DOMContentLoaded', leerlocalstorage);
}





//funciones

function agregaralcarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        curso = e.target.parentElement.parentElement;
    }
    leerdatoscurso(curso);


}

function leerdatoscurso(curso) {
    const infocurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }

    insertarcurso(infocurso);

}


function insertarcurso(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${curso.imagen}"width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#"  class="borrar-curso"   data-id="${curso.id}">X</a>
    </td>
    `
    lista.appendChild(row);

    agregarcursoalstorage(curso);
}


function eliminaruncurso(e) {

    let curso,
        cursoid;
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();

        curso = e.target.parentElement.parentElement;
        cursoid = curso.querySelector('a').getAttribute('data-id');


    }

    eliminarcursodelocalstorage(cursoid);

}

function vaciarcarrito() {

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    vaciarcarritolocalstorage();
    return false;
}

function agregarcursoalstorage(curso) {
    let cursos;

    cursos = obtenerlocalstorage();
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));



}

function obtenerlocalstorage() {

    let cursoslc;

    if (localStorage.getItem('cursos') === null) {
        cursoslc = [];
    } else {
        cursoslc = JSON.parse(localStorage.getItem('cursos'));
    }


    return cursoslc;


}

function leerlocalstorage(curso) {

    let cursoslc = obtenerlocalstorage();

    cursoslc.forEach(function(curso) {

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}"width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
        <a href="#"  class="borrar-curso"   data-id="${curso.id}">X</a>
        </td>
        `
        lista.appendChild(row);


    });



}
//elimina el curso por el id en localstorage

function eliminarcursodelocalstorage(curso) {

    let cursoslc;

    cursoslc = obtenerlocalstorage();

    cursoslc.forEach(function(cursolc, index) {
        if (cursolc.id === curso) {
            cursoslc.splice(index, 1);
        }
    })
    localStorage.setItem('cursos', JSON.stringify(cursoslc));
    console.log(cursoslc);

}

function vaciarcarritolocalstorage(curso) {
    localStorage.clear();
}