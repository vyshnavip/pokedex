fetch('http://192.168.86.146:4000/graphql',{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
        query:`query{pokemonByName(name:"Bulbasaur"){id name}}`
    })
}).then(res=>res.json())
    .then(data=>{console.log(data.data)})