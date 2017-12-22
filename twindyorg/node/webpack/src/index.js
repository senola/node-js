import css from './style.css';

async function getComponent() {
    const _ = await import('lodash');
    const element = document.createElement('h1');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
};

getComponent().then(p => {
    document.body.appendChild(p);
})