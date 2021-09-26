import { mainFunction, reload, buildForm } from './js/app';
import './styles/style.scss';

// Reminder: Ensure functions are exported in the original files -> export {functionName}


// Adding event listeners
document.getElementById('submit').addEventListener('click', mainFunction);
document.getElementById('reload').addEventListener('click', reload);
document.addEventListener('DOMContentLoaded', buildForm);