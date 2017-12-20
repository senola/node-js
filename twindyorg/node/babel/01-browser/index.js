setTimeout(() => {
    console.log('hello babel');
}, 1000);
const getMessage = () => "hello babel";
document.getElementById('output').innerHTML = getMessage();