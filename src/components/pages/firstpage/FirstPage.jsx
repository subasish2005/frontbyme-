import PropTypes from 'prop-types';
import './FirstPage.css';

// Button Component
const Button = ({ variant, children, ...props }) => (
  <button 
    className={`button ${variant}`}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  children: PropTypes.node.isRequired
};

// FirstPage Component (formerly Hero)
const FirstPage = () => (
  <section className="hero">
    <div className="hero-content">
      <div className="hero-title-column">
        <h1 className="hero-title">
          Empower Your Community, Unlock Your Potential
        </h1>
      </div>
      
      <div className="hero-content-column">
        <p className="hero-description">
          Join our innovative platform designed to foster community development 
          and connection. Earn points, showcase your achievements, and collaborate 
          with friends to create a vibrant community.
        </p>
        
        <div className="hero-actions">
          <Button variant="primary">Join</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
    </div>

    <img 
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/462e594ec0270288553719c3b654ce01190e113c0070937d23926fc4c43b6798?placeholderIfAbsent=true&apiKey=e9ee7be21485443cb29464c0cdeb06f4"
      alt="Community platform interface showcase"
      loading="lazy"
      className="hero-image"
    />
  </section>
);

export { Button, FirstPage };
