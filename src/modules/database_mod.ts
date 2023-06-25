function remove(id:number):void{
    const options = {
        method: 'GET', 
        headers: {'content-type': 'application/json'}, body: 'false'
    };
    let data:any = undefined
    fetch(`http://localhost:3000/users/${id}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
function getAll(){
    const options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      };
      
      fetch('http://localhost:3000/users', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
export {remove,getAll}