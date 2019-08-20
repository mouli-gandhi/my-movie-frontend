import  axios from 'axios';

export function getAllMovies(cb , err){
    axios.get('http://localhost:8030/get-all-movies')
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}
export function getMovieById(cb , err, id){
    axios.get(`http://localhost:8030/get-movie/${id}`)
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}
export function getAllActors(cb , err, search){
    axios.get(`http://localhost:8030/get-all-actors${search ? `?name=${search}` : ''}`)
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}

export function createActor(cb , err , body){
    axios.post(`http://localhost:8030/create-actor`, body)
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}

export function createMovie(cb , err , body){
    axios.post(`http://localhost:8030/create-movie`, body)
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}


export function updateMovie(cb , err , body){
    axios.put(`http://localhost:8030/update-movie/`, body)
    .then((data)=> {
        cb(data.data);
    })
    .catch(error => {
        err(error);
    })
}