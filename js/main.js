// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Sample product data - replace with your actual products
const products = [
    {
        id: 1,
        title: "Product Title 1",
        price: 299,
        image: "assets/images/product1.jpg",
        info: "Technical information about the product. This product exemplifies the perfect balance between form and function, crafted with precision and care."
    },
    {
        id: 4,
        title: "Product Title 4",
        price: 499,
        image: "assets/images/product4.jpg",
        info: "Technical information about the product. A testament to quality craftsmanship, this piece brings together materials and design in perfect harmony."
    },
    {
        id: 2,
        title: "Product Title 2",
        price: 399,
        image: "assets/images/product2.jpg",
        info: "Technical information about the product. Each piece is uniquely crafted, combining traditional techniques with modern aesthetics."
    },
    {
        id: 3,
        title: "Product Title 3",
        price: 499,
        image: "assets/images/product3.jpg",
        info: "Technical information about the product. A testament to quality craftsmanship, this piece brings together materials and design in perfect harmony."
    }
];

// Cart state
let cart = [];
let cartCount = 0;

// DOM Elements
const galleryContainer = document.querySelector('.gallery-container');
const productOverlay = document.querySelector('.product-overlay');
const cartOverlay = document.querySelector('.cart-overlay');
const infoOverlay = document.querySelector('.info-overlay');
const manifestoOverlay = document.querySelector('.manifesto-overlay');
const cartTrigger = document.querySelector('.cart-trigger');
const infoTrigger = document.querySelector('.info-trigger');
const manifestoTrigger = document.querySelector('.manifesto-trigger');

// Show product overlay with animation
function showProduct(product) {
    const productContent = productOverlay.querySelector('.product-content');
    productContent.querySelector('.product-image').src = product.image;
    productContent.querySelector('.product-title').textContent = product.title;
    productContent.querySelector('.product-price').textContent = `€${product.price}`;

    toggleOverlay(productOverlay);
    
    // Animate product content
    anime({
        targets: '.product-content > *',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuad'
    });
}

// Manifesto Animations
function initManifestoAnimations() {
    const pentagram = document.querySelector('.pentagram');
    const lines = document.querySelectorAll('.pentagram-line');
    const points = document.querySelectorAll('.element-point');

    // Initial animation
    gsap.from(lines, {
        duration: 1.5,
        width: 0,
        stagger: 0.1,
        ease: "power2.inOut"
    });

    gsap.from(points, {
        duration: 1,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        delay: 1,
        ease: "power2.out"
    });

    // Hover animations for lines
    lines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            gsap.to(line, {
                height: '2px',
                duration: 0.3,
                ease: "power2.out"
            });
        });

        line.addEventListener('mouseleave', () => {
            gsap.to(line, {
                height: '1px',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Continuous rotation animation
    gsap.to('.pentagram-line', {
        rotation: "+=360",
        duration: 120,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
    });
}

// Initialize manifesto animations when the overlay is opened
document.querySelector('.manifesto-trigger').addEventListener('click', () => {
    setTimeout(initManifestoAnimations, 100);
});

// Toggle overlay function
function toggleOverlay(overlay) {
    const allOverlays = [productOverlay, cartOverlay, infoOverlay, manifestoOverlay];
    
    // Hide all other overlays
    allOverlays.forEach(o => {
        if (o !== overlay) {
            o.style.display = 'none';
            o.classList.remove('active');
        }
    });

    // Toggle current overlay
    if (!overlay.classList.contains('active')) {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.classList.add('active');
            
            // Animate content
            anime({
                targets: overlay.querySelector('.info-content, .manifesto-content, .cart-content, .product-content'),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutQuad'
            });
        }, 10);
    } else {
        anime({
            targets: overlay,
            opacity: 0,
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                overlay.style.display = 'none';
                overlay.classList.remove('active');
            }
        });
    }
}

// Initialize product gallery
function initializeGallery() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>€${product.price}</p>
            </div>
        `;
        
        productCard.addEventListener('click', () => showProduct(product));
        galleryContainer.appendChild(productCard);
    });

    // Initialize horizontal scroll animation
    gsap.to('.gallery-container', {
        x: () => -(galleryContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: '.horizontal-gallery',
            start: "top top",
            end: () => `+=${galleryContainer.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
}

// Initialize marquee animation
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    const marqueeText = document.querySelector('.marquee-text');
    
    // Calculate the duration based on text length
    const textWidth = marqueeText.offsetWidth;
    const duration = textWidth * 0.02; // Adjust speed by changing this multiplier
    
    gsap.to(marqueeContent, {
        x: -textWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
            gsap.set(marqueeContent, { x: 0 });
        }
    });
}

// Event Listeners
cartTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleOverlay(cartOverlay);
});

infoTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleOverlay(infoOverlay);
});

manifestoTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleOverlay(manifestoOverlay);
});

// Close overlays when clicking outside content
document.addEventListener('click', (e) => {
    const overlays = [productOverlay, cartOverlay, infoOverlay, manifestoOverlay];
    overlays.forEach(overlay => {
        if (e.target === overlay) {
            toggleOverlay(overlay);
        }
    });
});

// Add to cart functionality
document.querySelector('.add-to-cart').addEventListener('click', () => {
    const productTitle = document.querySelector('.product-title').textContent;
    const product = products.find(p => p.title === productTitle);
    if (product) {
        const quantity = parseInt(document.querySelector('#quantity').value);
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
        cartCount += quantity;
        cartTrigger.textContent = `CART (${cartCount})`;
        
        // Animate cart count
        anime({
            targets: '.cart-trigger',
            scale: [1, 1.2, 1],
            duration: 400,
            easing: 'easeInOutQuad'
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initMarquee();
});
