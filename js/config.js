let rootFolder = '';

switch(document.location.hostname) {
    case 'localhost':
        rootFolder = '';
        break;
    case 'ashduckett.com':
        rootFolder = '/blubolt/'
}