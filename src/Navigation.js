const Navigation = () => {
    return (
      <nav className="container">
        <div className="logo">
          <img src="/images/brand_logo.png" alt="logo" />
        </div>
        <ul>
          <li href="#">Menu</li>
          <li href="#">Location</li>
          <li href="#">About</li>
          <li href="#">Contact</li>
        </ul>
  
        <button style={{ backgroundColor: 'red', zIndex: 1000 }}>login</button>

      </nav>
    );
  };
  
  export default Navigation;