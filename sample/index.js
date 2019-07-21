const el = document.getElementById('test');
el.innerText = 'TEST';

const img = document.createElement('img');
img.src = 'images/dummy.png';
document.body.insertBefore(img, el);
