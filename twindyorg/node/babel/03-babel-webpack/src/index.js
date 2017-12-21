import _ from 'lodash';

function sayHello() {
    const ele = document.createElement('div');
    
    ele.innerHTML = _.join(['hello', 'webpack'], '');

    return ele;
}

document.body.append(sayHello());