let currentBox = null;

document.querySelectorAll('.day-button').forEach(button => {
    button.addEventListener('click', () => {
        const day = button.getAttribute('data-day');
        let color;

        switch (day) {
            case 'Monday': color = '#a5c9a5'; break;
            case 'Tuesday': color = '#efc180'; break;
            case 'Wednesday': color = '#c7a8cb'; break;
            case 'Thursday': color = '#7a2e39'; break;
            case 'Friday': color = '#b5e5f8'; break;
            case 'Saturday': color = '#746f70'; break;
            case 'Sunday': color = '#f7b0cc'; break;
        }

        if (currentBox) {
            currentBox.style.top = '-200px';
            currentBox.style.opacity = '0';
        }

        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.style.backgroundColor = color;
        newBox.style.position = 'absolute';
        newBox.style.width = '400px';
        newBox.style.height = '400px';
        newBox.style.left = '50%';
        newBox.style.transform = 'translate(-50%, -50%)';
        newBox.style.top = '-200px'; 
        newBox.style.opacity = '0'; 
        document.body.appendChild(newBox);

        requestAnimationFrame(() => {
            newBox.style.top = '50%';
            newBox.style.opacity = '1';
        });

        currentBox = newBox;
    });
});
