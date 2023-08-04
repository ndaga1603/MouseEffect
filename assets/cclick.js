const cursorAnimation = document.querySelector('.cursor');
const cursors = document.querySelectorAll('.cursor');

document.addEventListener('click', (e) => {
    let x = e.clientX;
    let y = e.clientY;
    cursorAnimation.style.left = x + 'px';
    cursorAnimation.style.top = y + 'px';

    cursors.forEach(cursor => {
        cursor.classList.add('active');

        function removeCursorActive() {
            cursor.classList.remove('active');
        }

        setTimeout(removeCursorActive, 1000);

    });
    
    let cursorClone = cursorAnimation.cloneNode(true);
    document.querySelector('body').appendChild(cursorClone);

    setTimeout(() => {
        cursorClone.remove();
    }, 1000);
});

