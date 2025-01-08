const eventsDiv = document.getElementById('events') as HTMLDivElement;
const connectBtn = document.getElementById('btn-connect') as HTMLButtonElement;
const disconnectBtn = document.getElementById('btn-disconnect') as HTMLButtonElement;
const pauseAndResumeBtn = document.getElementById('btn-pause_resume') as HTMLButtonElement;

let isPaused = false
let eventSource: EventSource | null = null

connectBtn.addEventListener('click', () => {
  if (eventSource)  {
    console.log('SSE is already running');
    return
  }

  eventSource = new EventSource('http://localhost:3000/events');

  eventSource.onmessage = (event) => {
    if (isPaused) {
      return
    }

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


disconnectBtn.addEventListener('click', () => {
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

pauseAndResumeBtn.addEventListener('click', () => {
  if (!eventSource) {
    console.log('SSE is not running');
    return
  }

  isPaused = !isPaused;
  const stopMessage = document.createElement('div');
  stopMessage.textContent = `SSE ${isPaused ? 'paused' : 'resumed'}.`;
  eventsDiv.appendChild(stopMessage);
})