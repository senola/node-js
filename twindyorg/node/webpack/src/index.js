import style from './style.css';

async function getComponent() {
    const _ = await import(/* webpackChunkName: "lodash" */'lodash');
    const element = document.createElement('h1');
    element.innerHTML =  _.join(['Hello', 'webpack'], ' ');

    return element;
};
// const a = ()=> {
//     console.log(2);
// }

// getComponent().then(p => {
//     document.body.appendChild(p);
// })
