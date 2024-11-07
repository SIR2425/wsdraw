// Connect to the server
const socket = io();

// Select the drawing board element
const drawingBoard = document.getElementById('drawing-board');

// Track if the mouse is currently drawing
let isDrawing = false;

// Get the drawing board's position relative to the viewport
function getBoardOffset() {
    const rect = drawingBoard.getBoundingClientRect();
    return { offsetX: rect.left, offsetY: rect.top };
}
// Listen for mouse events on the drawing board
drawingBoard.addEventListener('mousedown', (event) => {
    isDrawing = true;
    const { offsetX, offsetY } = getBoardOffset();
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    draw(x, y, true);
});

drawingBoard.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const { offsetX, offsetY } = getBoardOffset();
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        draw(x, y, true);
    }
});

drawingBoard.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Function to create a drawing point
function draw(x, y, emit) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    drawingBoard.appendChild(point);

    // If emit is true, send the point's data to other clients
    if (emit) {
        socket.emit('draw', { x, y });
    }
}

// Listen for drawing events from the server
socket.on('draw', (data) => {
    draw(data.x, data.y, false);
});
