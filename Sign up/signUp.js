function togglePassword(inputId, eyeSlashIconId, eyeIconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeSlashIcon = document.getElementById(eyeSlashIconId);
    const eyeIcon = document.getElementById(eyeIconId);
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeSlashIcon.style.display = "none";
        eyeIcon.style.display = "inline-block";
    } else {
        passwordInput.type = "password";
        eyeIcon.style.display = "none";
        eyeSlashIcon.style.display = "inline-block";
    }
}

document.getElementById('signup-btn').addEventListener('click', async function () {
    toggleFormVisibility('signup-form', 'login-form');
  
    const signUpButton = document.querySelector('.Sign-up-button');
    signUpButton.addEventListener('click', async function () {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const data = {
        email,
        password
      };
  
      const response = await sendRequest('/signup', 'POST', data);
  
      if (response.error) {
        alert(response.error);
      } else {
        alert(response.message);
      }
    });
  });

  function toggleFormVisibility(showFormId, hideFormId) {
    document.getElementById(showFormId).style.display = 'block';
    document.getElementById(hideFormId).style.display = 'none';
  }
  
  document.getElementById('signup-btn').addEventListener('click', () => {
    toggleFormVisibility('signup-form', 'login-form');
  });
  
  document.getElementById('login-btn').addEventListener('click', () => {
    toggleFormVisibility('login-form', 'signup-form');
  });
  
  // The rest of your code remains the same
  
  
  
  document.getElementById('login-btn').addEventListener('click', async function () {
    toggleFormVisibility('login-form', 'signup-form');
  
    const logInButton = document.querySelector('.Log-in-button');
    logInButton.addEventListener('click', async function () {
      const email = document.getElementById('email').value;
      const password = document.getElementById('login-password').value;
  
      const data = {
        email,
        password
      };
  
      const response = await sendRequest('/login', 'POST', data);
  
      if (response.error) {
        alert(response.error);
      } else {
        alert(response.message);
      }
    });
  });
  
  document.querySelector('.log-in-button').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('login-password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log(data.message);
          // Redirect to a logged-in page or show a success message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  
  document.querySelector('.Sign-up-button').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log(data.message);
          // Redirect to a logged-in page or show a success message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  

async function sendRequest(url, method, data) {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const responseData = await response.json();
    return responseData;
  }
  
  const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  toggleMenu();
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');

  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
}

