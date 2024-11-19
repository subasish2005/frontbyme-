// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import styles from '../Footer.module.css';

export const LinkList = ({ links }) => (
  <nav className={styles.linkList}>
    {links.map((link, index) => (
      <a href="#" key={index} className={styles.link}>
        {link}
      </a>
    ))}
  </nav>
);

// Prop validation
LinkList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure links is an array of strings and required
};
