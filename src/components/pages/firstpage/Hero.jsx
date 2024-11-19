// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button } from './Button';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.titleColumn}>
          <h1 className={styles.title}>
            Empower Your Community, Unlock Your Potential
          </h1>
        </div>
        
        <div className={styles.contentColumn}>
          <p className={styles.description}>
            Join our innovative platform designed to foster community development 
            and connection. Earn points, showcase your achievements, and collaborate 
            with friends to create a vibrant community.
          </p>
          
          <div className={styles.actions}>
            <Button variant="primary">Join</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </div>

      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/462e594ec0270288553719c3b654ce01190e113c0070937d23926fc4c43b6798?placeholderIfAbsent=true&apiKey=e9ee7be21485443cb29464c0cdeb06f4"
        alt="Community platform interface showcase"
        loading="lazy"
        className={styles.heroImage}
      />
    </section>
  );
};