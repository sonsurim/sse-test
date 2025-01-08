const eventsDiv = document.getElementById('events') as HTMLDivElement;
const startBtn = document.getElementById('btn-start') as HTMLButtonElement;
const stopBtn = document.getElementById('btn-stop') as HTMLButtonElement;

let eventSource: EventSource | null = null

startBtn.addEventListener('click', () => {
  if (eventSource)  {
    console.log('SSE is already running');
    return
  }

  eventSource = new EventSource('http://localhost:3000/events');

  eventSource.onmessage = (event) => {
    console.log(event);
    const data = JSON.parse(event.data);
    const newEvent = document.createElement('div');
    newEvent.textContent = `Message: ${data.message}, Counter: ${data.counter}`;
    eventsDiv.appendChild(newEvent);
  };

  eventSource.onerror = () => {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Connection error.';
    eventsDiv.appendChild(errorDiv);
    eventSource?.close();
    eventSource = null
  };

  console.log('SSE started.');
})


stopBtn.addEventListener('click', () => {
  if (!eventSource) {
    console.log('SSE is not running');
    return
  }

  eventSource.close();
  eventSource = null
  console.log('SSE stopped.');

  const stopMessage = document.createElement('div');
  stopMessage.textContent = 'SSE connection stopped.';
  eventsDiv.appendChild(stopMessage);
})