const sayHello = () => {
    console.log("hello babel");
}

axios.get("http://api.github.com").then(function(response){
    console.log(response);
}).catch(function(error){
    console.log(error);
});
