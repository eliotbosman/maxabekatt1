// Sample product data - using the same data as main.js
const products = [
    {
        id: 1,
        title: "Product Title 1",
        price: 299,
        image: "assets/images/product1.jpg"
    },
    {
        id: 2,
        title: "Product Title 2",
        price: 399,
        image: "assets/images/product2.jpg"
    },
    {
        id: 3,
        title: "Product Title 3",
        price: 499,
        image: "assets/images/product3.jpg"
    },
    {
        id: 4,
        title: "Product Title 4",
        price: 499,
        image: "assets/images/product4.jpg"
    }
];

// Initialize grid
function initializeGrid() {
    const gridContainer = document.querySelector('.grid-container');
    
    // Repeat products 12 times to fill the grid
    for (let i = 0; i < 12; i++) {
        products.forEach(product => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="grid-item-title">${product.title}</div>
            `;
            
            gridItem.addEventListener('click', () => {
                window.location.href = `index.html?product=${product.id}`;
            });
            
            gridContainer.appendChild(gridItem);
        });
    }
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();
    initMarquee();
});
