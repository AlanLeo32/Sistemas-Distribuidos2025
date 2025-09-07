
async function getUsuarios(){
    const respuesta=await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios=await respuesta.json();
    return usuarios;
}
function getPrimerosUsuarios(usuarios,nroUsuarios){
    const primerosUsuarios=usuarios.filter(n=>n.id<=nroUsuarios);
    return primerosUsuarios;
}
async function getPublicaciones(idUsuario){
    const respuesta=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idUsuario}`);
    const publicacion=await respuesta.json();
    return publicacion;
}
async function muestraPublicacionesSecuencial(usuarios){
    let longitud;
    let nombreUsuario;
    for(let i=0;i<usuarios.length;i++){//iba a usar for each pero no me dejaba usar await dentro del foreach por lo que lo trabaje asi
    const id=usuarios[i].id;//ya que podria el id no arrancar en 0
    const publicacion =await getPublicaciones(id);
   // console.log(publicacion);
    longitud=publicacion.length;
    nombreUsuario=usuarios[i].name;
    console.log(`${nombreUsuario} tiene ${longitud} publicaciones`);
    }
    
}
async function muestraPublicacionesParalela(usuarios) {
    let longitud;
    let nombreUsuario;
    const promesasPublicaciones = usuarios.map(usuario => getPublicaciones(usuario.id)); //aca obtuve el arreglo de promesas
    const publicaciones = await Promise.all(promesasPublicaciones);
    for (let i = 0; i < usuarios.length; i++){
        longitud=publicaciones[i].length;
        nombreUsuario=usuarios[i].name;
        console.log(`${nombreUsuario} tiene ${longitud} publicaciones`);
    }
}
async function main() {
    try {
        const usuarios = await getUsuarios();
        const primerosUsuarios= await getPrimerosUsuarios(usuarios,3); 
        console.log("--- Ejecución Secuencial ---");
        await muestraPublicacionesSecuencial(primerosUsuarios);
        console.log("--- Ejecución Paralela ---");
        await muestraPublicacionesParalela(primerosUsuarios);
    } catch (error) {
        console.error('Error al obtener la informacion de los usuarios junto con sus publicaciones :', error.message);
    }
}
main();

