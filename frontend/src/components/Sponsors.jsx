import React from 'react';
import sponsor1 from '../assets/sponsor1.jpg';
import sponsor2 from '../assets/sponsor2.jpg';
import sponsor3 from '../assets/sponsor3.jpg';
import sponsor4 from '../assets/sponsor4.jpg';


const Sponsors = () => {
  return (
    <section className="sponsors container">
      <h2 className="section-title">Our Sponsors</h2>
      <p className="section-sub">We are proud to partner with these amazing brands!</p>
      <div className="sponsor-grid">
        <img src={sponsor1} alt="Sponsor 1" />
        <img src={sponsor2} alt="Sponsor 2" />
        <img src={sponsor3} alt="Sponsor 3" />
        <img src={sponsor4} alt="Sponsor 4" />
      </div>
    </section>
  );
};

export default Sponsors;
