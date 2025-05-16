// Login/Signup Page Functionality

// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const inputFields = document.querySelectorAll('.input-field');
    
    // Add animation to input fields on page load
    animateFormElements();
    
    // Function to animate form elements on load
    function animateFormElements() {
        // Animate input fields with delay
        inputFields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                field.style.transition = 'all 0.5s ease';
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Animate button with delay
        const button = document.querySelector('.btn');
        if (button) {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.5s ease';
                button.style.opacity = '1';
                button.style.transform = 'scale(1)';
            }, 500);
        }
    }
    
    // Add input field focus effects
    inputFields.forEach(field => {
        const input = field.querySelector('input');
        const icon = field.querySelector('i');
        
        input.addEventListener('focus', () => {
            field.classList.add('focused');
            icon.style.color = '#f78fb3';
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                field.classList.remove('focused');
                icon.style.color = '#acacac';
            }
        });
    });
    
    // Handle login form submission with animation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const isAdmin = document.getElementById('admin-login').checked;
            const submitBtn = this.querySelector('input[type="submit"]');
            
            // Simple validation
            if (!email || !password) {
                shakeForm(this);
                alert('Please fill in all fields');
                return;
            }
            
            // Add loading animation to button
            submitBtn.classList.add('loading');
            submitBtn.value = '';
            
            // In a real application, you would send this data to a server for authentication
            // For now, we'll just simulate a successful login with a delay
            setTimeout(() => {
                // If admin login is checked, redirect to admin dashboard
                if (isAdmin) {
                    window.location.href = '../admin/admin-dashboard.html';
                } else {
                    // Regular user login - redirect to home page
                    window.location.href = '../index.html';
                }
            }, 1500);
        });
    }
    
    // Function to shake form on validation error
    function shakeForm(form) {
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }
});