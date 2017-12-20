import axios from 'axios';

const sayHello = () => {
    console.log("hello babel");
}

axios.get("http://git.feidee.org/api/v3/projects?private_token=W5mqXVBoT9oJgE5Asv8t").then(function(response){
    console.log(response);
}).catch(function(error){
    console.log(error);
});