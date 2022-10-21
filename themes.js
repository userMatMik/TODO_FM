const themeSwitchBtn = document.querySelector('.theme-switcher');
let theme = localStorage.getItem('theme');
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon')

themeSwitchBtn.addEventListener('click', (e) => {
    
    if (sunIcon.classList.contains('actv')) {
        sunIcon.classList.remove('actv');
        moonIcon.classList.add('actv');
        document.body.className = 'light'
        theme = "light";
    } else {
        moonIcon.classList.remove('actv');
        sunIcon.classList.add('actv');
        document.body.className = 'dark'
        theme = "dark";
    }
    localStorage.setItem('theme', theme)
})

if (theme === "dark") {
    document.body.className = 'dark';
    moonIcon.classList.remove('actv');
    sunIcon.classList.add('actv');
}
if (theme === "light") {
    document.body.className = 'light';
    sunIcon.classList.remove('actv');
    moonIcon.classList.add('actv');
}