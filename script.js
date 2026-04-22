const products = [
    { 
        id: 1, name: "VapeCloud BC Pro 40000 – Juice Peach 5%", 
        image: "barack.png",
        price: 0.0021, oldPrice: 0.0035,
        short: "A zamatos barack parádés ízesítésével kápráztat el.",
        desc: "Az <b>VapeCloud BC PRO 40000</b> eldobható vape az egyik legújabb eszköz. 40.000 slukk normál módban, turbo módban 30.000. USB-C gyorstöltés és átlátszó tank.",
        comments: [{user: "Vape_Master", text: "Nagyon finom, egész nap ezt szívom!"}, {user: "Dani", text: "A turbo mód tényleg brutális."}]
    },
    { 
        id: 2, name: "Green Ghost XL Turbo", price: 0.0019, oldPrice: 0.0025,
        image: "greenghost.png",
        short: "Láthatatlan erő, hatalmas felhök.",
        desc: "Speciális hütőbordákkal ellátott kivitel a leghidegebb gőzért. XL tartály.",
        comments: [{user: "Anonym", text: "Ez a legjobb íz sztem."}]
    },
    { 
        id: 3, name: "Purple Hazze Max 2026", price: 0.0025, oldPrice: 0.0032,
        image: "purplehaze.png",
        short: "Lila köd, ami mindent elfed.",
        desc: "Klasszikus aroma modern köntösben. A legnépszerübb választásunk.",
        comments: []
    },
    { 
        id: 4, name: "Lemon Kushh S-Tier", price: 0.0022, oldPrice: 0.0029,
        image: "citrom.png",
        short: "Citrusos frissesség, S-Tier minőség.",
        desc: "Frissítő citromos utóíz, ami órákig tart. 5% erősség.",
        comments: [{user: "Sanyi", text: "Tiszta citrom, imádom."}]
    },
    { 
        id: 5, name: "Candy Cloudz Special", price: 0.0028, oldPrice: 0.0038,
        image: "candy.png",
        short: "Édes, mint a vattacukor.",
        desc: "Limitált kiadású édes élmény. Csak a készlet erejéig!",
        comments: []
    },
    { 
        id: 6, name: "VaporWavve Retro", price: 0.0030, oldPrice: 0.0040,
        image: "retro.png",
        short: "80-as évek stílusa.",
        desc: "Exkluzív retro design, brutális teljesítmény. Igazi gyüjtői darab.",
        comments: [{user: "RetroFan", text: "A kinézete miatt vettem meg, de az íze is jó."}]
    }
];

let cart = [];
let currentQty = 1;
let currentBasePrice = 0;

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openDetails(p.id);
        card.innerHTML = `
            <img src="${p.image}" style="width:100%; height:120px; object-fit:cover; margin-bottom:10px; border-radius:10px;">
            <h3>${p.name}</h3>
            <p style="color:var(--neon-blue); font-weight:bold; margin-bottom:15px;">${p.price} BTC</p>
            <button class="stylish-btn" style="padding: 8px 15px; font-size: 0.8rem;">MEGTEKINTÉS</button>
        `;
        grid.appendChild(card);
    });
}

function openDetails(id) {
    const p = products.find(item => item.id === id);
    if(!p) return;
    currentBasePrice = p.price;
    currentQty = 1;
    
    document.getElementById('detail-main-img').src = p.image;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `${p.price} BTC`;
    document.getElementById('detail-old-price').innerText = `${p.oldPrice} BTC`;
    document.getElementById('detail-short-info').innerText = p.short;
    document.getElementById('detail-desc').innerHTML = p.desc;
    document.getElementById('qty-val').innerText = currentQty;
    
    updateBtnPrice();
    const reviewsDiv = document.getElementById('reviews-container');
    reviewsDiv.innerHTML = p.comments.length ? '' : '<p>Még nincs vélemény.</p>';
    p.comments.forEach(c => {
        reviewsDiv.innerHTML += `<div style="background:rgba(255,255,255,0.05); padding:8px; margin-bottom:5px; border-radius:5px; font-size:0.8rem;">
            <b style="color:var(--neon-blue)">${c.user}:</b> ${c.text}
        </div>`;
    });
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(p.id, currentQty);
    document.getElementById('product-detail-view').classList.remove('hidden');
}

function updateBtnPrice() {
    document.getElementById('btn-price').innerText = (currentBasePrice * currentQty).toFixed(4);
}

function changeQty(val) {
    currentQty += val;
    if (currentQty < 1) currentQty = 1;
    document.getElementById('qty-val').innerText = currentQty;
    updateBtnPrice();
}

function closeDetails() {
    document.getElementById('product-detail-view').classList.add('hidden');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('hidden');
}

function addToCart(id, qty) {
    const p = products.find(item => item.id === id);
    for(let i=0; i<qty; i++) cart.push(p);
    updateCartUI();
    closeDetails();
    document.getElementById('cart-sidebar').classList.remove('hidden');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        list.innerHTML += `<div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:8px; border-bottom:1px solid #222;">
            <span>${item.name}</span>
            <span>${item.price} BTC</span>
        </div>`;
    });
    document.getElementById('cart-total').innerText = total.toFixed(4);
}

function openPayment() {
    if (cart.length === 0) return alert("Üres a koszár!");
    document.getElementById('final-amount').innerText = document.getElementById('cart-total').innerText;
    document.getElementById('payment-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

window.onload = renderProducts;