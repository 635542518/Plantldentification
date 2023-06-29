import config from '../porject-config'

function remove(id:number[]){
    return new Promise((resolve,reject)=>{
        fetch(`${config['webserver']}/users/${id.join('|')}`)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })

}
function getAll() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    };
  
    return new Promise((resolve, reject) => {
      fetch(`${config['webserver']}/users`, options)
      .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
export {remove,getAll}