document.addEventListener('DOMContentLoaded', function() {
    // Capture form submission event
    document.getElementById('conbtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        const username = document.getElementById('usernametxt').value;
        const confession = document.getElementById('confessiontxt').value;

        // Create an object with the form data
        const formData = {
            username: username,
            confession: confession
        };

        // Send data to server using Fetch API
        fetch('/submitConfession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Display success message
                alert('Confession submitted successfully!');
                // Optionally, you can reset the form after successful submission
                document.getElementById('usernametxt').value = '';
                document.getElementById('confessiontxt').value = '';
            } else {
                // Handle error response
                alert('Error submitting confession');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Error:', error);
            alert('Network error. Please try again.');
        });
    });
});



























function sendButtonClickInfo() {
    // Send request to server indicating button click
    fetch('/adminLoginClick', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ buttonClicked: true })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to login page
            window.location.href = 'templates/mainAdmin.html';
        } else {
            console.error('Error sending button click info');
            // Handle error response
        }
    })
    .catch(error => {
        console.error('Error sending button click info:', error);
        // Handle network error
    });
}










document.addEventListener('DOMContentLoaded', function() {
    // Capture form submission event
    document.getElementById('pssbtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get password input value
        const password = document.getElementById('inputPassword5').value;

        // Send password to server using Fetch API
        fetch('/validatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        })
        .then(response => {
            if (response.ok) {
                // Password validation succeeded, redirect to admin page
                window.location.href = '/admin';
            } else {
                // Password validation failed, handle error
                console.error('Password validation failed');
                // Display error message to the user, e.g., invalid password
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Error validating password:', error);
        });
    });
});






document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the load confessions button
    document.getElementById('ldbtn').addEventListener('click', function() {
        // Fetch confessions data from the server
        fetch('/confessions')
            .then(response => response.json())
            .then(data => {
                const confessions = data.confessions;
                // Iterate over the fetched confessions and create cards for each
                confessions.forEach(confession => {
                    createCard(confession.username, confession.confession);
                });
            })
            .catch(error => {
                console.error('Error fetching confessions:', error);
            });
    });

    // Function to create a card with given username and confession text
    function createCard(username, confession) {
        // Create card elements
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'container', 'm-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'container');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = username;

        const text = document.createElement('p');
        text.classList.add('card-text', 'border', 'border-black', 'p-5');
        text.textContent = confession;

        // Append elements to card
        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardContainer.appendChild(cardBody);

        // Append card to container
        document.getElementById('cardContainer').appendChild(cardContainer);
    }
});









// main.js
document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('loginPage');
    const adminPage = document.getElementById('adminPage');

    // Function to handle login
    document.getElementById('loginBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get password input value
        const password = document.getElementById('inputPassword5').value;

        // Send password to server for validation
        fetch('/validatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        })
        .then(response => {
            if (response.ok) {
                // Password validation succeeded, display admin content
                loginPage.style.display = 'none';
                adminPage.style.display = 'block';
            } else {
                // Password validation failed, display error message
                console.error('Password validation failed');
                // Display error message to the user, e.g., invalid password
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Error validating password:', error);
        });
    });
});
