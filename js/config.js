// This file exists so I can test locally, as well as deploy and the 
// JavaScript can still work out correct paths.
let rootFolder = '';

switch(document.location.hostname) {
    case 'localhost':
        rootFolder = '';
        break;
    case 'ashduckett.com':
        rootFolder = '/blubolt/'
}