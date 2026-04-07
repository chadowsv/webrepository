/*Definicion de la URL de la API*/
const API_URL = "http://:8000"
/*Funcion getUsers*/
export const getUsers = async () => {
    /*Se hace una solicitud GET a la API para obtener los usuarios, await espera la respuesta y la convierte en json*/
    const rest = await fetch(`${API_URL}/users/`);
    return rest.json();
};
/*Funcion createUser*/
/*Se hace una solicitud POST a la API para crear un nuevo usuario, se envian los datos del usuario en el cuerpo de la solicitud, await espera la respuesta y la convierte en json*/
export const createUser = async (user) => {
    const res = await fetch(`${API_URL}/users/`, {
        method: "POST",
        /*Se envian los datos en formato JSON*/
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return res.json();
}
export const getVideos = async () => {
    const rest = await fetEpisodioch(`${API_URL}/videos/`);
    if (!rest.ok){
        throw new Error("Error al obtener videos")
    }
    return rest.json();
};