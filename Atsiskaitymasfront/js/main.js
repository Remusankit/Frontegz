const registerBtn = document.querySelector('#register-button');
const loginBtn = document.querySelector('#login-button');
const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');
const registerBox = document.querySelector('#register-box');
const loginBox = document.querySelector('#login-box');
const userKey = 'user';
let user = {};

window.onload = () => {
    setButtons();
}

const setButtons = () => {
    registerBtn.addEventListener('click', () => {
        registerBox.style.display = 'block';
        loginBox.style.display = 'none';
        registration();
    });

    loginBtn.addEventListener('click', () => {
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
        logIn();
    });
}

const registration = () => {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = registerForm.querySelector('#name-inp-reg').value;
        const password = registerForm.querySelector('#pass-inp-reg').value;
        const email = registerForm.querySelector('#email-inp-reg').value;

        fetch("https://localhost:7171/api/Auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": name,
                "password": password,
                "email": email
            })
        })
            .then(res => {
                if (res.ok) {
                    toastr.success(`User created!`);
                    registerForm.reset();
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    toastr.error(`${data.error}`);
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            })
    })
}
const logIn = () => {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let name = loginForm.querySelector('#name-inp-log').value;
        let pass = loginForm.querySelector('#pass-inp-log').value;

        fetch(`https://localhost:7171/api/Auth?username=${name}&password=${pass}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    toastr.error(data.error);
                    return;
                } else if (data.id) {
                    loginForm.reset();
                    user = data;
                    let userString = JSON.stringify(user);
                    sessionStorage.setItem(userKey, userString);
                    window.location = 'todo.html';
                }
            })
            .catch(err => {
                console.log("Catched: " + err);
            })
    });
}