document.addEventListener('DOMContentLoaded', function() {
    // Set the date for the wedding (September 6, 2025)
    const weddingDate = new Date("Sep 6, 2025 15:00:00").getTime();
    
    // Update the countdown every 1 second
    const countdown = setInterval(function() {
        // Get the current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "<p>Nosso grande dia chegou!</p>";
        }
    }, 1000);

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.detail-card, .gallery-item, .countdown-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // RSVP functionality
    const weddingCheckbox = document.getElementById('wedding-checkbox');
    const lunchCheckbox = document.getElementById('lunch-checkbox');
    const groomBtn = document.getElementById('groom-btn');
    const brideBtn = document.getElementById('bride-btn');
    const messageText = document.getElementById('message-text');
    
    // Base URLs for WhatsApp messages
    const baseGroomURL = "https://wa.me/+5519994644182?text=";
    const baseBrideURL = "https://wa.me/+5519993684032?text=";
    
    // Update WhatsApp links based on checkbox selections
    function updateWhatsAppLinks() {
        const greeting = "Olá! Parabéns pelo seu casamento. ";
        let displayMessage = "";
        
        if (weddingCheckbox.checked && lunchCheckbox.checked) {
            displayMessage = "Confirmo que poderei ir na cerimônia e no almoço.";
        } else if (weddingCheckbox.checked) {
            displayMessage = "Confirmo que poderei ir na cerimônia, mas não poderei ir no almoço.";
        } else if (lunchCheckbox.checked) {
            displayMessage = "Confirmo que poderei ir no almoço, mas não poderei ir na cerimônia.";
        } else {
            displayMessage = ""; // Mensagem vazia quando nenhum checkbox está selecionado
        }
        
        const fullMessage = greeting + (displayMessage || "");
        
        // Atualiza o texto da prévia da mensagem com a saudação
        messageText.textContent = '"' + fullMessage + '"';
        
        // Add animation class to message preview
        messageText.classList.add('pulse');
        setTimeout(() => {
            messageText.classList.remove('pulse');
        }, 500);
        
        // Atualiza os links do WhatsApp com a mensagem completa
        const encodedMessage = encodeURIComponent(fullMessage);
        groomBtn.href = baseGroomURL + encodedMessage;
        brideBtn.href = baseBrideURL + encodedMessage;
    }
    
    // Initial update
    updateWhatsAppLinks();
    
    // Add event listeners to checkboxes
    weddingCheckbox.addEventListener('change', updateWhatsAppLinks);
    lunchCheckbox.addEventListener('change', updateWhatsAppLinks);
});
