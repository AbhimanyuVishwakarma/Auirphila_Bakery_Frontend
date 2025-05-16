document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new URLSearchParams(new FormData(form));
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const text = await response.text();
        let data;
        
        try {
            // Only try to parse as JSON if there's content
            data = text ? JSON.parse(text) : {};
        } catch (jsonError) {
            console.error('Invalid JSON response:', text);
            throw new Error('Server returned invalid JSON');
        }
        
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            alert('Thank you! Your message has been sent.');
            form.reset();
        }
    } catch (error) {
        alert('There was an error submitting your message: ' + error.message);
        console.error('Error:', error);
    }
});