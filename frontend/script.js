document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');
    const responseBox = document.getElementById('responseMessage');
    const responseText = document.getElementById('responseText');

    contactForm.addEventListener('submit', async (e) => {
        // Prevent default reload
        e.preventDefault();

        // 1. Capture Form Data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Basic Client-Side Validation
        if (!data.name || !data.email || !data.message) {
            showResponse('Please fill out all fields.', 'error');
            return;
        }

        // Toggle UI loading state
        setLoading(true);

        try {
            // 2. Fetch API POST Request to node.js server
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // 3. Handle specific responses
            if (response.ok) {
                showResponse(result.message, 'success');
                // clear form
                contactForm.reset();
            } else {
                showResponse(result.error || 'Something went wrong.', 'error');
            }

        } catch (error) {
            console.error('Network Error:', error);
            showResponse('Failed to connect to the server. Is it running?', 'error');
        } finally {
            setLoading(false);
        }
    });

    // Utility: Manage button state visually
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    // Utility: Manage response popups
    function showResponse(message, type) {
        responseText.textContent = message;
        responseBox.classList.remove('hidden');

        if (type === 'error') {
            responseBox.classList.add('error');
            document.querySelector('.success-icon').textContent = '⚠️';
        } else {
            responseBox.classList.remove('error');
            document.querySelector('.success-icon').textContent = '✨';
        }

        // Auto-hide the message after 5 seconds
        setTimeout(() => {
            responseBox.classList.add('hidden');
        }, 5000);
    }
});
