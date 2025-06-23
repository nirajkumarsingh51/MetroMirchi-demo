import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaStar, FaUserTie, FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkedAlt } from 'react-icons/fa';
import './App.css';

// Menu data array
const menuData = [
  // Non Veg
  { name: 'Chicken Chilli (bone)', price: 70, category: 'Non Veg', image: '/asset/menu/Chicken-Chilli-bone.jpg' },
  { name: 'Boneless Butter Masala', price: 160, category: 'Non Veg', image: '/asset/menu/Boneless-Butter-Masala.jpg' },
  { name: 'Chicken Kolhapuri 4pcs', price: 230, category: 'Non Veg', image: '/asset/menu/Chicken-Kolhapuri-4pcs.jpg' },
  { name: 'Chicken Kassa', price: 115, category: 'Non Veg', image: '/asset/menu/Chicken-Kassa.jpg' },
  { name: 'Chicken Handi', price: 110, category: 'Non Veg', image: '/asset/menu/Chicken-Handi.jpg' },
  { name: 'Chicken Masala', price: 100, category: 'Non Veg', image: '/asset/menu/Chicken-Masala.jpg' },
  { name: 'Chicken Kadai', price: 110, category: 'Non Veg', image: '/asset/menu/Chicken-Kadai.jpg' },
  { name: 'Chicken Curry', price: 90, category: 'Non Veg', image: '/asset/menu/Chicken-Curry.jpg' },
  { name: 'Omlet Curry', price: 70, category: 'Non Veg', image: '/asset/menu/Omlet-Curry.jpg' },
  { name: 'Egg Bhujiya', price: 35, category: 'Non Veg', image: '/asset/menu/Egg-Bhujiya.jpg' },
  // ... (add all other items in this format, including Veg, Starters, Noodles, etc.) ...
  // Veg
  { name: 'Paneer Butter Masala', price: 120, category: 'Veg', image: '/asset/menu/Paneer-Butter-Masala.jpg' },
  { name: 'Veg Biryani', price: 95, category: 'Biryanis', image: '/asset/menu/Veg-Biryani.jpg' },
  { name: 'Dal Tadka', price: 60, category: 'Dal', image: '/asset/menu/Dal-Tadka.jpg' },
  { name: 'Veg Roll', price: 30, category: 'Rolls', image: '/asset/menu/Veg-Roll.jpg' },
  // ... (add more items as needed) ...
  // Roti (9)
  { name: 'Tandoor Roti', price: 10, category: 'Roti', image: '/asset/menu/Tandoor-Roti.jpg' },
  { name: 'Laccha Paratha', price: 20, category: 'Roti', image: '/asset/menu/Laccha-Paratha.jpg' },
  { name: 'Plain Naan', price: 20, category: 'Roti', image: '/asset/menu/Plain-Naan.jpg' },
  { name: 'Butter Naan', price: 25, category: 'Roti', image: '/asset/menu/Butter-Naan.jpg' },
  { name: 'Veg Stuffed Naan', price: 40, category: 'Roti', image: '/asset/menu/Veg-Stuffed-Naan.jpg' },
  { name: 'Paneer Stuffed', price: 45, category: 'Roti', image: '/asset/menu/Paneer-Stuffed.jpg' },
  { name: 'Chicken Stuffed', price: 60, category: 'Roti', image: '/asset/menu/Chicken-Stuffed.jpg' },
  { name: 'Aloo Stuffed Naan', price: 25, category: 'Roti', image: '/asset/menu/Aloo-Stuffed-Naan.jpg' },
  { name: 'Sattu Stuffed Paratha', price: 25, category: 'Roti', image: '/asset/menu/Sattu-Stuffed-Paratha.jpg' },
  // Biryanis (4)
  { name: 'Egg Biryani', price: 85, category: 'Biryanis', image: '/asset/menu/Egg-Biryani.jpg' },
  { name: 'Chicken Biryani', price: 110, category: 'Biryanis', image: '/asset/menu/Chicken-Biryani.jpg' },
  { name: 'Chicken Boneless Biryani', price: 120, category: 'Biryanis', image: '/asset/menu/Chicken-Boneless-Biryani.jpg' },
  // Dal (3)
  { name: 'Dal Makhani (egg)', price: 70, category: 'Dal', image: '/asset/menu/Dal-Makhani-egg.jpg' },
  { name: 'Dal Fry', price: 50, category: 'Dal', image: '/asset/menu/Dal-Fry.jpg' },
  // Soups (7)
  { name: 'Veg Soup', price: 40, category: 'Soups', image: '/asset/menu/Veg-Soup.jpg' },
  { name: 'Veg Clear Soup', price: 40, category: 'Soups', image: '/asset/menu/Veg-Clear-Soup.jpg' },
  { name: 'Veg Hot & Sour Soup', price: 45, category: 'Soups', image: '/asset/menu/Veg-Hot-and-Sour-Soup.jpg' },
  { name: 'Chicken Soup', price: 55, category: 'Soups', image: '/asset/menu/Chicken-Soup.jpg' },
  { name: 'Chicken Clear Soup', price: 60, category: 'Soups', image: '/asset/menu/Chicken-Clear-Soup.jpg' },
  { name: 'Chicken Hot & Sour Soup', price: 65, category: 'Soups', image: '/asset/menu/Chicken-Hot-and-Sour-Soup.jpg' },
  { name: 'Chicken Mushroom Soup', price: 80, category: 'Soups', image: '/asset/menu/Chicken-Mushroom-Soup.jpg' },
  // Rolls (10)
  { name: 'Veg Roll', price: 30, category: 'Rolls', image: '/asset/menu/Veg-Roll.jpg' },
  { name: 'Paneer Roll', price: 40, category: 'Rolls', image: '/asset/menu/Paneer-Roll.jpg' },
  { name: 'Mix Veg Roll', price: 45, category: 'Rolls', image: '/asset/menu/Mix-Veg-Roll.jpg' },
  { name: 'Egg Roll', price: 35, category: 'Rolls', image: '/asset/menu/Egg-Roll.jpg' },
  { name: 'Chicken Roll', price: 50, category: 'Rolls', image: '/asset/menu/Chicken-Roll.jpg' },
  { name: 'Egg Chicken Roll', price: 55, category: 'Rolls', image: '/asset/menu/Egg-Chicken-Roll.jpg' },
  { name: 'Double Egg Chicken Roll', price: 60, category: 'Rolls', image: '/asset/menu/Double-Egg-Chicken-Roll.jpg' },
  { name: 'Veg Spring Roll', price: 45, category: 'Rolls', image: '/asset/menu/Veg-Spring-Roll.jpg' },
  { name: 'Chicken Spring Roll', price: 65, category: 'Rolls', image: '/asset/menu/Chicken-Spring-Roll.jpg' },
  { name: 'Chicken Cheese Roll', price: 70, category: 'Rolls', image: '/asset/menu/Chicken-Cheese-Roll.jpg' },
  // Starters (4)
  { name: 'Egg Pakora', price: 60, category: 'Starters', image: '/asset/menu/Egg-Pakora.jpg' },
  { name: 'Chicken Leg Fry', price: 220, category: 'Starters', image: '/asset/menu/Chicken-Leg-Fry.jpg' },
  { name: 'Chicken Pakora', price: 140, category: 'Starters', image: '/asset/menu/Chicken-Pakora.jpg' },
  { name: 'Paneer Pakora', price: 100, category: 'Starters', image: '/asset/menu/Paneer-Pakora.jpg' },
];

const menuCategories = [
  'All',
  'Non Veg',
  'Veg',
  'Starters',
  'Noodles',
  'Rice',
  'Indian Pulao',
  'Rolls',
  'Soups',
  'Dal',
  'Lunch/dinner',
  'Biryanis',
  'Roti',
  'Others',
  'Food'
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Welcome to Metro Mirchi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Static quick replies
  const quickReplies = [
    { label: 'Menu', value: 'Show me the menu' },
    { label: 'Timing', value: 'What are your opening hours?' },
    { label: 'Location', value: 'Where is Metro Mirchi?' },
    { label: 'Call Now', value: 'Call for order' },
    { label: 'How to Order', value: 'How do I order?' },
  ];

  // Manual static bot responses
  const getBotReply = (msg) => {
    const txt = msg.toLowerCase();
    if (txt.includes('menu')) return { text: '🍽️ You can view our full menu on the Menu page! We serve delicious Indian, Chinese, and more.' };
    if (txt.includes('timing') || txt.includes('open')) return { text: '⏰ We are open every day from 12:00 pm to 10:00 pm.' };
    if (
      txt.includes('location') ||
      txt.includes('address') ||
      (txt.includes('where') && (txt.includes('metro mirchi') || txt.includes('restaurant')))
    ) {
      return { type: 'location' };
    }
    if (txt.includes('call')) return { text: '📞 For orders, please call us directly at 09308994848.' };
    if (txt.includes('how') && txt.includes('order')) return { html: '🛒 You can order by calling us directly: <a href="tel:09308994848" style="color:#e53935;font-weight:bold;">09308994848</a>' };
    return { text: '😊 Thank you for your message! For more info, use the quick buttons below.' };
  };

  const handleSend = (msg) => {
    if (!msg.trim()) return;
    setMessages([...messages, { from: 'user', text: msg }]);
    setTimeout(() => {
      const reply = getBotReply(msg);
      setMessages(msgs => [...msgs, { from: 'bot', ...reply }]);
    }, 600);
    setInput('');
  };

  return (
    <div className={`chatbot-widget${open ? ' open' : ''}`}>  
      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '×' : '💬'}
      </button>
      {open && (
        <div className="chatbot-box">
          <div className="d-flex align-items-center mb-2">
            <img src="/logo192.png" alt="Bot" style={{width: 32, height: 32, borderRadius: '50%', marginRight: 8, boxShadow: '0 2px 8px #ffa75155'}} />
            <span className="fw-bold text-danger">Metro Mirchi Bot</span>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              msg.type === 'location' ? (
                <div key={i} className={`msg bot bot-anim`}>
                  <div><b>Location</b></div>
                  <div>Address: Naya Tola Road, near Sai Mandir, Lalbagh, Patna, Bihar 800004</div>
                  <div>Google Maps: <a href="https://maps.app.goo.gl/8mqtFtqak2VkHxH38" target="_blank" rel="noopener noreferrer" style={{color:'#e53935',fontWeight:'bold'}}>Open in Google Maps</a></div>
                </div>
              ) : msg.html ? (
                <div key={i} className={`msg ${msg.from} ${msg.from === 'bot' ? 'bot-anim' : ''}`} dangerouslySetInnerHTML={{__html: msg.html ? msg.html : msg.text}} />
              ) : (
                <div key={i} className={`msg ${msg.from} ${msg.from === 'bot' ? 'bot-anim' : ''}`}>{msg.text}</div>
              )
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="mb-2 d-flex flex-wrap gap-2">
            {quickReplies.map(q => (
              <button key={q.label} className="btn btn-sm btn-outline-danger" style={{borderRadius: 20}} onClick={() => handleSend(q.value)}>{q.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Home = () => (
  <>
    {/* Hero Section */}
    <section className="home-hero-section d-flex align-items-center justify-content-center flex-column text-center py-5 position-relative" style={{background: 'linear-gradient(120deg, #ffe259 0%, #ffa751 100%)'}}>
      <img src="/logo512.png" alt="Metro Mirchi Logo" style={{height: 90, marginBottom: 16}} />
      <h1 className="display-3 fw-bold mb-2">Metro Mirchi</h1>
      <p className="lead mb-4">Patna's most loved restaurant for authentic taste & vibrant ambiance</p>
      <a href="tel:09308994848" className="btn btn-danger btn-lg mb-3">Call Now for Order</a>
      <div className="hero-bg-anim position-absolute w-100 h-100 top-0 start-0" style={{zIndex: 0, opacity: 0.04}}></div>
    </section>

    {/* About Section */}
    <section className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <h2>About Us</h2>
          <p>Metro Mirchi brings you the best of Indian cuisine with a modern twist. Our chefs use only the freshest ingredients to create mouth-watering dishes. Experience a vibrant ambiance, warm hospitality, and unforgettable flavors in the heart of Patna.</p>
        </div>
        <div className="col-md-6 text-center">
          <img src="/logo512.png" alt="Metro Mirchi" style={{height: 120, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}} />
        </div>
      </div>
    </section>

    {/* Popular Items Preview */}
    <section className="container py-4">
      <h2 className="text-center mb-4">Popular Dishes</h2>
      <div className="row g-4 justify-content-center">
        {menuData.slice(0, 4).map(item => (
          <div className="col-6 col-md-4 col-lg-3" key={item.name}>
            <div className="card h-100 shadow-sm">
              <img src={item.image} className="card-img-top" alt={item.name} onError={e => e.target.src='/logo512.png'} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <span className="badge bg-warning text-dark">₹{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/menu" className="btn btn-outline-danger btn-lg">See Full Menu</Link>
      </div>
    </section>

    {/* Menu Highlights */}
    <section className="container py-4">
      <h2 className="text-center mb-4">Popular Dishes</h2>
      <div className="row g-4 justify-content-center">
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img src="/asset/ALL-Images/dish/dish2.jpg" className="card-img-top" alt="Chicken Leg" />
            <div className="card-body">
              <h5 className="card-title">Chicken Leg</h5>
              <p className="card-text">Juicy grilled chicken leg marinated in special spices.</p>
              <span className="badge bg-warning text-dark">₹220</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img src="/asset/ALL-Images/dish/dish1.jpg" className="card-img-top" alt="Paneer Tikka" />
            <div className="card-body">
              <h5 className="card-title">Paneer Tikka</h5>
              <p className="card-text">Grilled paneer cubes marinated in aromatic spices.</p>
              <span className="badge bg-warning text-dark">₹180</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img src="/asset/ALL-Images/dish/dish4.jpg" className="card-img-top" alt="Dal Makhani" />
            <div className="card-body">
              <h5 className="card-title">Dal Makhani</h5>
              <p className="card-text">Creamy black lentils slow-cooked with butter and cream.</p>
              <span className="badge bg-warning text-dark">₹160</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img src="/asset/ALL-Images/images/bread.jpg" className="card-img-top" alt="Chicken Biryani" />
            <div className="card-body">
              <h5 className="card-title">Chicken Biryani</h5>
              <p className="card-text">Fragrant basmati rice cooked with tender chicken and spices.</p>
              <span className="badge bg-warning text-dark">₹260</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to="/menu" className="btn btn-outline-danger btn-lg">See Full Menu</Link>
      </div>
    </section>

    {/* Gallery Preview */}
    <section className="container py-4">
      <h2 className="text-center mb-4">Gallery</h2>
      <div className="row g-3 justify-content-center">
        <div className="col-6 col-md-3"><img src="/asset/ALL-Images/dish/dish1.jpg" alt="Gallery 1" className="img-fluid rounded shadow-sm" /></div>
        <div className="col-6 col-md-3"><img src="/asset/ALL-Images/dish/dish2.jpg" alt="Gallery 2" className="img-fluid rounded shadow-sm" /></div>
        <div className="col-6 col-md-3"><img src="/asset/ALL-Images/dish/dish3.jpg" alt="Gallery 3" className="img-fluid rounded shadow-sm" /></div>
        <div className="col-6 col-md-3"><img src="/asset/ALL-Images/dish/dish4.jpg" alt="Gallery 4" className="img-fluid rounded shadow-sm" /></div>
      </div>
      <div className="text-center mt-3">
        <Link to="/gallery" className="btn btn-outline-danger">See More Photos</Link>
      </div>
    </section>

    {/* Latest Reviews */}
    <section className="container py-4">
      <h2 className="text-center mb-4">Latest Reviews</h2>
      <div className="row g-4 justify-content-center">
        {defaultReviews.slice(0, 4).map((rev, idx) => (
          <div className="col-md-6 col-lg-3" key={idx}>
            <div className="card h-100 shadow-sm p-3">
              <div className="d-flex align-items-center mb-2">
                {[...Array(rev.rating)].map((_, i) => <FaStar key={i} className="text-warning me-1" />)}
                {[...Array(5-rev.rating)].map((_, i) => <FaStar key={i} className="text-secondary me-1" />)}
              </div>
              <p className="mb-1">“{rev.message}”</p>
              <div className="d-flex align-items-center mt-2"><FaUserTie className="me-2" /><span>{rev.name}</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/testimonials" className="btn btn-outline-danger btn-lg">See All Reviews</Link>
      </div>
    </section>

    {/* Team Section */}
    <section className="container py-4">
      <h2 className="text-center mb-4">Our Chefs</h2>
      <div className="row g-4 justify-content-center">
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <img src="/asset/ALL-Images/chefs/1.jpg" className="card-img-top rounded-circle mx-auto mt-3" alt="Chef Rakesh" style={{width: 90, height: 90, objectFit: 'cover'}} />
            <div className="card-body">
              <h5 className="card-title mb-0">Chef Rakesh</h5>
              <small className="text-muted">Head Chef</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <img src="/asset/ALL-Images/chefs/2.jpg" className="card-img-top rounded-circle mx-auto mt-3" alt="Chef Priya" style={{width: 90, height: 90, objectFit: 'cover'}} />
            <div className="card-body">
              <h5 className="card-title mb-0">Chef Priya</h5>
              <small className="text-muted">Pastry Chef</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <img src="/asset/ALL-Images/chefs/3.jpg" className="card-img-top rounded-circle mx-auto mt-3" alt="Chef Amit" style={{width: 90, height: 90, objectFit: 'cover'}} />
            <div className="card-body">
              <h5 className="card-title mb-0">Chef Amit</h5>
              <small className="text-muted">Grill Master</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Contact & Reservation CTA */}
    <section className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <h2>Contact & Location</h2>
          <p><FaMapMarkerAlt className="me-2 text-danger" />Address: Naya Tola Road, near Sai Mandir, Lalbagh, Patna, Bihar 800004</p>
          <p><FaPhoneAlt className="me-2 text-danger" /><a href="tel:09308994848" className="text-decoration-none text-dark">093089 94848</a></p>
          <p><strong>Hours:</strong><br/>
            Monday–Sunday: 12:00 pm – 10:00 pm
          </p>
        </div>
        <div className="col-md-6 text-center">
          <iframe title="Metro Mirchi Location" src="https://www.google.com/maps?q=Naya+Tola+Road,+near+Sai+Mandir,+Lalbagh,+Patna,+Bihar+800004&output=embed" width="100%" height="180" style={{border:0, borderRadius: 12}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className="mt-3">
            <Link to="/reservation" className="btn btn-danger btn-lg">Book a Table</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);
const About = () => (
  <section className="section container position-relative" style={{overflow: 'hidden'}}>
    {/* Decorative SVG Wave at Top */}
    <div style={{position: 'absolute', top: -40, left: 0, width: '100%', zIndex: 0, pointerEvents: 'none'}}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '100%', height: 80}}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffe259" fillOpacity="0.25" />
      </svg>
    </div>
    <h2 className="text-center mb-4 position-relative" style={{zIndex: 1}}>About Metro Mirchi</h2>
    <div className="row align-items-center mb-4 position-relative" style={{zIndex: 1}}>
      <div className="col-md-7">
        <div className="about-main position-relative" style={{backgroundImage: 'url(/asset/ALL-Images/images/food_icon01.jpg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: '80px', minHeight: 120, color: '#111'}}>
          <strong>Metro Mirchi</strong> is more than just a restaurant—it's a celebration of authentic Indian flavors and warm hospitality in the heart of Patna. Since our inception, we have been dedicated to serving delicious, freshly prepared dishes using the finest ingredients. Our chefs blend traditional recipes with modern culinary techniques to create a menu that delights every palate.
        </div>
      </div>
      <div className="col-md-5 text-center mb-3 mb-md-0">
        <img src="/logo512.png" alt="Metro Mirchi Logo" style={{height: 100, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}} />
      </div>
    </div>
    <div className="row g-4 mb-4 position-relative" style={{zIndex: 1}}>
      <div className="col-md-6">
        <div className="card h-100 about-card">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center"><img src="/asset/ALL-Images/images/food_icon02.jpg" alt="Hours" style={{width: 28, height: 28, marginRight: 10, borderRadius: 8}} /><span>Operating Hours</span></h4>
            <ul className="list-unstyled mb-0">
              <li><strong>Monday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Tuesday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Wednesday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Thursday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Friday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Saturday:</strong> 12:00 pm – 10:00 pm</li>
              <li><strong>Sunday:</strong> 12:00 pm – 10:00 pm</li>
            </ul>
            <p className="mt-3 mb-0 text-muted small">Enjoy breakfast, lunch, and dinner—freshly prepared for you every day!</p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card h-100 about-card">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center"><img src="/asset/ALL-Images/images/food_icon03.jpg" alt="Specialties" style={{width: 28, height: 28, marginRight: 10, borderRadius: 8}} /><span>Our Specialties</span></h4>
            <div className="about-special mb-2">Each dish is thoughtfully crafted with quality ingredients and authentic flavors that bring out the best in every cuisine we serve.</div>
            <h5 className="mt-3 mb-2 text-success d-flex align-items-center"><img src="/asset/ALL-Images/images/food_icon04.jpg" alt="Amenities" style={{width: 22, height: 22, marginRight: 8, borderRadius: 6}} />Pricing & Amenities</h5>
            <ul className="about-amenities mb-0">
              <li>Value-for-money menu for all occasions</li>
              <li>Drive-Through available</li>
              <li>High Chair available for kids</li>
              <li>Comfortable, family-friendly environment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="card shadow-sm border-0 mt-4 about-why position-relative" style={{border: '2px solid #ffe259', zIndex: 1}}>
      <div className="card-body">
        <h4 className="card-title text-danger mb-3 d-flex align-items-center"><img src="/asset/ALL-Images/images/food_icon05.jpg" alt="Why" style={{width: 26, height: 26, marginRight: 10, borderRadius: 7}} />Why Choose Metro Mirchi?</h4>
        <p className="mb-0">
          For those who appreciate quality food, a warm atmosphere, and attentive service, Metro Mirchi in Annie Besant Road, Patna is a must-visit destination. With its extensive menu, accessible location, and dedication to customer satisfaction, Metro Mirchi promises an unforgettable dining experience. Whether you're a local or a visitor, join us to discover why Metro Mirchi is a favorite spot for food lovers in the area.
        </p>
      </div>
    </div>
  </section>
);
const Menu = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container py-4">
      <h2 className="text-center mb-4">Our Menu</h2>
      <div className="row mb-3 g-2 align-items-center">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex flex-wrap gap-2 justify-content-md-end">
            {menuCategories.map(cat => (
              <button
                key={cat}
                className={`btn btn-sm ${category === cat ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row g-4">
        {filteredMenu.length === 0 && (
          <div className="col-12 text-center text-muted">No items found.</div>
        )}
        {filteredMenu.map(item => (
          <div className="col-6 col-md-4 col-lg-3" key={item.name}>
            <div className="card h-100 shadow-sm">
              <img src={item.image} className="card-img-top" alt={item.name} onError={e => e.target.src='/logo512.png'} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <span className="badge bg-warning text-dark mb-2">₹{item.price}</span>
                <p className="card-text small text-muted">{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const galleryImages = [
  '/asset/ALL-Images/dish/dish1.jpg',
  '/asset/ALL-Images/dish/dish2.jpg',
  '/asset/ALL-Images/dish/dish3.jpg',
  '/asset/ALL-Images/dish/dish4.jpg',
  '/asset/ALL-Images/images/slider1.jpg',
  '/asset/ALL-Images/images/slider2.jpg',
  '/asset/ALL-Images/images/slider3.JPG',
  '/asset/ALL-Images/images/featured.jpg',
  '/asset/ALL-Images/images/steak.jpg',
  '/asset/ALL-Images/images/breakfast.jpg',
  '/asset/ALL-Images/images/slider2.jpg',
  '/asset/ALL-Images/images/slider1.jpg',
];

const Gallery = () => (
  <section className="container py-4">
    <h2 className="text-center mb-4">Gallery</h2>
    <p className="text-center text-muted mb-4">A glimpse of our delicious dishes and vibrant ambiance. Click on any image to view it larger!</p>
    <div className="row g-3 justify-content-center">
      {galleryImages.map((img, idx) => (
        <div className="col-6 col-md-4 col-lg-3" key={idx}>
          <a href={img} target="_blank" rel="noopener noreferrer">
            <img src={img} alt={`Gallery ${idx+1}`} className="img-fluid rounded shadow-sm gallery-img-hover" style={{height: 180, objectFit: 'cover', width: '100%'}} />
          </a>
        </div>
      ))}
    </div>
  </section>
);
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    setError('');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="container py-4">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row g-4 align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card shadow-sm border-0 h-100 contact-card">
            <div className="card-body contact-form">
              <h5 className="mb-3 text-danger">Send Us a Message</h5>
              {submitted && <div className="alert alert-success py-2">Thank you for contacting us! We will get back to you soon.</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="name" placeholder="Your Name*" value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="Your Email*" value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" name="phone" placeholder="Your Phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="message" placeholder="Your Message*" rows={3} value={form.message} onChange={handleChange}></textarea>
                </div>
                {error && <div className="text-danger small mb-2">{error}</div>}
                <button className="btn btn-danger w-100" type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="contact-details mb-3">
            <h5 className="mb-2">Contact Details</h5>
            <p className="mb-1"><FaMapMarkerAlt className="me-2 text-danger" />Naya Tola Road, near Sai Mandir, Lalbagh, Patna, Bihar 800004</p>
            <p className="mb-1"><FaPhoneAlt className="me-2 text-danger" /><a href="tel:09308994848" className="text-decoration-none">093089 94848</a></p>
            <p className="mb-1"><strong>Hours:</strong> Monday–Sunday: 12:00 pm – 10:00 pm</p>
          </div>
          <div className="contact-map">
            <iframe title="Metro Mirchi Location" src="https://www.google.com/maps?q=Naya+Tola+Road,+near+Sai+Mandir,+Lalbagh,+Patna,+Bihar+800004&output=embed" width="100%" height="180" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
const Reservation = () => (
  <section className="section">
    <h2>Book A Table</h2>
    <form className="row g-3 justify-content-center">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Your Name" required />
      </div>
      <div className="col-md-6">
        <input type="email" className="form-control" placeholder="Your Email" required />
      </div>
      <div className="col-md-6">
        <input type="datetime-local" className="form-control" required />
      </div>
      <div className="col-md-6">
        <select className="form-select" required>
          <option value="">No. of People</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>
      </div>
      <div className="col-12">
        <textarea className="form-control" placeholder="Special Request" rows="2"></textarea>
      </div>
      <div className="col-12">
        <button className="btn btn-danger btn-lg w-100" type="submit">Book Now</button>
      </div>
    </form>
  </section>
);
const teamMembers = [
  {
    name: 'Amit Kumar',
    role: 'Owner',
    image: '/asset/ALL-Images/chefs/1.jpg',
    about: 'Founder and visionary behind Metro Mirchi, passionate about delivering authentic flavors and top-notch hospitality.'
  },
  {
    name: 'Priya Sharma',
    role: 'Manager',
    image: '/asset/ALL-Images/chefs/2.jpg',
    about: 'Ensures smooth operations and a welcoming environment for every guest.'
  },
  {
    name: 'Chef Rakesh',
    role: 'Head Chef',
    image: '/asset/ALL-Images/chefs/3.jpg',
    about: 'Expert in Indian cuisine, crafts every dish with love and perfection.'
  },
  {
    name: 'Simran Gupta',
    role: 'Service Staff',
    image: '/asset/ALL-Images/chefs/2.jpg',
    about: 'Always ready with a smile, making sure your dining experience is memorable.'
  },
];

const Team = () => (
  <section className="container py-4">
    <h2 className="text-center mb-4">Meet Our Team</h2>
    <p className="text-center text-muted mb-4">Our dedicated owner and staff work together to bring you the best food and service in Patna.</p>
    <div className="row g-4 justify-content-center">
      {teamMembers.map((member, idx) => (
        <div className="col-12 col-sm-6 col-lg-3" key={idx}>
          <div className="card h-100 shadow-sm border-0 text-center team-card">
            <img src={member.image} alt={member.name} className="card-img-top rounded-circle mx-auto mt-3" style={{width: 100, height: 100, objectFit: 'cover', border: '4px solid #ffa751'}} />
            <div className="card-body">
              <h5 className="card-title mb-1 text-danger">{member.name}</h5>
              <div className="mb-2 text-muted small">{member.role}</div>
              <p className="card-text small">{member.about}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
const Testimonials = () => {
  const [reviews, setReviews] = useState([
    { name: 'Rohit Kumar', rating: 5, message: 'Amazing food and great service! Will visit again.' },
    { name: 'Priya Singh', rating: 5, message: 'Best biryani in Patna! Highly recommended.' },
    { name: 'Arjun Verma', rating: 5, message: 'Lovely ambiance and friendly staff.' },
  ]);
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please enter your name and review.');
      return;
    }
    setReviews([{ ...form, rating: Number(form.rating) }, ...reviews]);
    setForm({ name: '', rating: 5, message: '' });
    setError('');
  };

  return (
    <section className="container py-4">
      <h2 className="text-center mb-4">Testimonials</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <form className="card shadow-sm p-3 mb-3" onSubmit={handleSubmit}>
            <h5 className="mb-3">Share Your Experience</h5>
            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <select className="form-select" name="rating" value={form.rating} onChange={handleChange}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5-r)}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <button className="btn btn-danger w-100" type="submit">Submit Review</button>
              </div>
            </div>
            <div className="mt-3">
              <textarea className="form-control" name="message" placeholder="Your Review" rows={2} value={form.message} onChange={handleChange}></textarea>
            </div>
            {error && <div className="text-danger mt-2 small">{error}</div>}
          </form>
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        {reviews.length === 0 && <div className="col-12 text-center text-muted">No reviews yet.</div>}
        {reviews.map((rev, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card h-100 shadow-sm p-3">
              <div className="d-flex align-items-center mb-2">
                {[...Array(rev.rating)].map((_, i) => <FaStar key={i} className="text-warning me-1" />)}
                {[...Array(5-rev.rating)].map((_, i) => <FaStar key={i} className="text-secondary me-1" />)}
              </div>
              <p className="mb-1">“{rev.message}”</p>
              <div className="d-flex align-items-center mt-2"><FaUserTie className="me-2" /><span>{rev.name}</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Default reviews for Home page preview (sync with Testimonials default)
const defaultReviews = [
  { name: 'Rohit Kumar', rating: 5, message: 'Amazing food and great service! Will visit again.' },
  { name: 'Priya Singh', rating: 5, message: 'Best biryani in Patna! Highly recommended.' },
  { name: 'Arjun Verma', rating: 5, message: 'Lovely ambiance and friendly staff.' },
  { name: 'Simran Gupta', rating: 4, message: 'Good food, quick service.' },
];

function App() {
  const navRef = useRef();
  // Function to close navbar on link click (for mobile)
  const closeNavbar = () => {
    if (window.innerWidth < 992) {
      // Try Bootstrap collapse instance
      if (navRef.current && window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navRef.current);
        bsCollapse.hide();
      }
      // Fallback: manually trigger click on toggler if collapse not found or not working
      setTimeout(() => {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler && toggler.getAttribute('aria-expanded') === 'true') {
          toggler.click();
        }
      }, 100);
    }
  };

  // Scroll to top when logo is clicked
  const handleLogoClick = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/" onClick={handleLogoClick}>Metro Mirchi🌶️</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" ref={navRef}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/" onClick={closeNavbar}>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about" onClick={closeNavbar}>About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/menu" onClick={closeNavbar}>Menu</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/gallery" onClick={closeNavbar}>Gallery</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reservation" onClick={closeNavbar}>Reservation</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/team" onClick={closeNavbar}>Team</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/testimonials" onClick={closeNavbar}>Testimonials</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact</Link></li>
            </ul>
            <a className="btn btn-danger ms-lg-3 call-btn d-flex align-items-center" href="tel:09308994848"><FaPhoneAlt className="me-2" />Call Now</a>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </main>
      <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-12 col-md-4 text-center text-md-start mb-2 mb-md-0">
              <div className="fw-bold fs-5 mb-2">Metro Mirchi</div>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-4"><FaFacebookF /></a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-4"><FaInstagram /></a>
                <a href="https://wa.me/919308994848" target="_blank" rel="noopener noreferrer" className="text-white fs-4"><FaWhatsapp /></a>
                <a href="https://g.co/kgs/NajfzG1" target="_blank" rel="noopener noreferrer" className="text-white fs-4"><FaMapMarkedAlt /></a>
              </div>
            </div>
            <div className="col-12 col-md-5 mb-2 mb-md-0">
              <nav className="d-flex flex-wrap gap-3 justify-content-center">
                <Link className="footer-link text-white text-decoration-none" to="/">Home</Link>
                <Link className="footer-link text-white text-decoration-none" to="/about">About</Link>
                <Link className="footer-link text-white text-decoration-none" to="/menu">Menu</Link>
                <Link className="footer-link text-white text-decoration-none" to="/gallery">Gallery</Link>
                <Link className="footer-link text-white text-decoration-none" to="/reservation">Reservation</Link>
                <Link className="footer-link text-white text-decoration-none" to="/team">Team</Link>
                <Link className="footer-link text-white text-decoration-none" to="/testimonials">Testimonials</Link>
                <Link className="footer-link text-white text-decoration-none" to="/contact">Contact</Link>
              </nav>
            </div>
            <div className="col-12 col-md-3 text-center text-md-end">
              <div className="small">&copy; {new Date().getFullYear()} Metro Mirchi.<br />All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
