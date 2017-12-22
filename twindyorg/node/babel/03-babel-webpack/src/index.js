
function getComponent() {
    return import('axios').then(_ => {
        var element = document.createElement('div');
        
            element.innerHTML = _.join(['Hello', 'webpack'], ' ');
           return element;
    }).catch(error => 'An error occurred while loading the component');
};

getComponent().then(c => {
    document.body.appendChild(component);
})