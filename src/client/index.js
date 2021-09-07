import { mainFunction } from './js/app';
import './styles/style.scss';

// Ensure functions are exported in the original files -> export {functionName}

// export {mainFunction};


// Adding event listener to button
document.getElementById('submit').addEventListener('click', mainFunction);