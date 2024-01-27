// const source = new EventSource('http://localhost:3000');
// const source = new EventSource('http://localhost:3000/temperature');
const source = new EventSource('http://localhost:3000/temperature-from-server');

function updateMessage(message) {
    const list = document.getElementById('result');
    const item = document.createElement('p');
    item.textContent = message
    list.appendChild(item);
}

source.onopen = () => {
    console.log('SSE connection opened');
};

source.onmessage = function(event) {
    console.log(event.data);
    updateMessage(`Voltagem medida: ${event.data}`);
};

source.onerror = function() {
    updateMessage('Server closed connection');
    source.close();
}