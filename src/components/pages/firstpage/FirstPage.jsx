
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
// import {BackgroundLinesDemo} from "../../../components/backgroundlines/BackgroundLinesDemo";
import Card3D from './Card3D';
import './FirstPage.css';

// Button Component
// eslint-disable-next-line react/prop-types
const Button = ({ variant, className, children, ...props }) => (
  <button 
    className={cn('button', variant, className)}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired
};

const cardData = [
  {
    title: "Community Building",
    description: "Connect with like-minded individuals and build lasting relationships within your community.",
    icon: "🤝"
  },
  {
    title: "Skill Development",
    description: "Access resources and opportunities to enhance your skills and knowledge.",
    icon: "📚"
  },
  {
    title: "Achievement System",
    description: "Track your progress and earn recognition for your contributions to the community.",
    icon: "🏆"
  }
];

// FirstPage Component
const FirstPage = () => (
  <div className="relative min-h-screen">
    
    
    <div className="relative z-10">
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
      </section>

      <section className="cards-section">
        {cardData.map((card, index) => (
          <Card3D
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </section>
    </div>
  </div>
);

export { Button, FirstPage };
