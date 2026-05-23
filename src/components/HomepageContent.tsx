interface Props {
  onSearch: (q: string) => void
}

const services = [
  {
    title: 'Find a Doctor',
    desc: 'Search our network of board-certified physicians and specialists who are accepting new patients near you.',
    query: 'find a doctor',
  },
  {
    title: 'Make an Appointment',
    desc: 'Book in-person or virtual visits online through MyChart — available 24 hours a day, 7 days a week.',
    query: 'schedule an appointment',
  },
  {
    title: 'Heart & Vascular Care',
    desc: 'From prevention to advanced cardiac procedures, our Heart & Vascular team is here for every stage of your heart health.',
    query: 'heart care',
  },
  {
    title: 'Urgent Care',
    desc: 'Walk in for non-emergency care at locations throughout Kentucky. No appointment needed — check wait times online.',
    query: 'urgent care near me',
  },
  {
    title: 'Cancer Care',
    desc: 'Comprehensive oncology services including surgery, medical oncology, radiation therapy, and integrative support programs.',
    query: 'cancer care',
  },
  {
    title: 'Orthopedics & Joint Care',
    desc: 'Expert care for bones, joints, and muscles — including joint replacement, sports medicine, and spine care.',
    query: 'orthopedic care in Lexington',
  },
]

const communityCards = [
  {
    title: 'Baptist Health Louisville',
    subtitle: 'Comprehensive care at our flagship campus serving Louisville since 1924.',
    gradient: 'linear-gradient(160deg, #5a7a9a 0%, #2a4060 100%)',
  },
  {
    title: 'Baptist Health Lexington',
    subtitle: 'Regional excellence in cardiac, orthopedic, and women\'s health services.',
    gradient: 'linear-gradient(160deg, #4a6a55 0%, #2a4035 100%)',
  },
  {
    title: 'Baptist Health Corbin',
    subtitle: 'Serving southeastern Kentucky with advanced surgical and emergency care.',
    gradient: 'linear-gradient(160deg, #7a6a55 0%, #4a3a28 100%)',
  },
  {
    title: 'Baptist Health Paducah',
    subtitle: 'Western Kentucky\'s leading medical center for cancer, surgery, and behavioral health.',
    gradient: 'linear-gradient(160deg, #6a5a7a 0%, #3a2a50 100%)',
  },
]

export default function HomepageContent({ onSearch }: Props) {
  return (
    <div className="homepage">

      {/* ── Care Finder ── */}
      <section className="hp-care-finder">
        <div className="hp-care-finder-photo">
          <img src="/CareFinderImage.png" alt="Mother and child enjoying a telehealth visit with a doctor" />
        </div>
        <div className="hp-care-finder-card">
          <h2 className="hp-care-finder-title">Care Finder</h2>
          <p className="hp-care-finder-desc">
            Find the right care at the right time. Search for Baptist Health doctors, services, and locations near you.
          </p>
          <button className="hp-care-finder-btn" onClick={() => onSearch('find a doctor')}>
            FIND CARE NOW <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>

      {/* ── Here For A Healthier You ── */}
      <section className="hp-healthier">
        <div className="container">
          <div className="hp-healthier-header">
            <div className="hp-healthier-deco" aria-hidden="true">
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path opacity="0.07" fillRule="evenodd" clipRule="evenodd" d="M62 65C58 61 60 58 65 62C69 65 149 131 174 153L174 42C174 42 96 0 0 0C0 99 56 173 56 173L158 173C133 142 65 69 62 65Z" fill="#65043E"/>
              </svg>
            </div>
            <div className="hp-healthier-heading">
              <h2 className="hp-healthier-title">Here For A Healthier You</h2>
              <p className="hp-healthier-sub">
                Baptist Health offers the most comprehensive care in Kentucky — close to home and focused entirely on you.
              </p>
            </div>
          </div>
          <div className="hp-services-grid">
            {services.map(s => (
              <button
                key={s.title}
                className="hp-service-card"
                onClick={() => onSearch(s.query)}
              >
                <h3 className="hp-service-title">{s.title}</h3>
                <p className="hp-service-desc">{s.desc}</p>
                <span className="hp-service-link">Learn more →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stuffy Nose Promo ── */}
      <section className="hp-promo">
        <div className="hp-promo-content">
          <p className="hp-promo-eyebrow">Urgent Care &amp; Virtual Visits</p>
          <h2 className="hp-promo-title">Stuffy Nose? Get the Right Care on Your Schedule.</h2>
          <button className="hp-btn hp-btn--olive" onClick={() => onSearch('urgent care near me')}>
            Schedule Now ›
          </button>
        </div>
        <div className="hp-promo-photo" aria-hidden="true" />
      </section>

      {/* ── Baptist Health in the Community ── */}
      <section className="hp-community">
        <div className="container">
          <h2 className="hp-community-title">Baptist Health in the Community</h2>
          <div className="hp-community-grid">
            {communityCards.map(card => (
              <div key={card.title} className="hp-community-card">
                <div
                  className="hp-community-photo"
                  style={{ background: card.gradient }}
                  aria-hidden="true"
                />
                <div className="hp-community-info">
                  <h3 className="hp-community-card-title">{card.title}</h3>
                  <p className="hp-community-card-sub">{card.subtitle}</p>
                  <span className="hp-community-link">Learn more →</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hp-community-cta">
            <a href="#" className="hp-btn hp-btn--navy-outline">View All Locations</a>
          </div>
        </div>
      </section>

      {/* ── Careers ── */}
      <section className="hp-careers">
        <div className="hp-careers-content">
          <p className="hp-careers-eyebrow">Join Our Team</p>
          <h2 className="hp-careers-title">Careers at Baptist Health</h2>
          <p className="hp-careers-desc">
            Join a team committed to improving lives and building healthier communities across Kentucky.
            We offer competitive benefits, growth opportunities, and a mission-driven culture.
          </p>
          <a href="#" className="hp-btn">Learn More ›</a>
        </div>
        <div className="hp-careers-photo" aria-hidden="true" />
      </section>

      {/* ── Ways to Give ── */}
      <section className="hp-give">
        <div className="hp-give-content">
          <h2 className="hp-give-title">Ways to Give</h2>
          <p className="hp-give-desc">
            Your gift to Baptist Health Foundation supports life-saving programs, advanced technology,
            and compassionate care that transforms lives across our communities.
          </p>
          <a href="#" className="hp-btn hp-btn--outline">Donate Now ›</a>
        </div>
        <div className="hp-give-photo" aria-hidden="true" />
      </section>

      {/* ── Footer ── */}
      <footer className="hp-footer">
        <div className="container">
          <div className="hp-footer-inner">
            <div className="hp-footer-brand">
              <img src="/BH Logo.png" alt="Baptist Health" className="hp-footer-logo" />
              <p className="hp-footer-tagline">
                Committed to better health for the communities we serve.
              </p>
            </div>
            <div className="hp-footer-nav">
              <div className="hp-footer-col">
                <h4 className="hp-footer-col-title">Care &amp; Services</h4>
                <a href="#" className="hp-footer-link">Find a Doctor</a>
                <a href="#" className="hp-footer-link">Find a Location</a>
                <a href="#" className="hp-footer-link">Make an Appointment</a>
                <a href="#" className="hp-footer-link">MyChart</a>
                <a href="#" className="hp-footer-link">Robotic Surgery</a>
              </div>
              <div className="hp-footer-col">
                <h4 className="hp-footer-col-title">Patients &amp; Visitors</h4>
                <a href="#" className="hp-footer-link">Patient Resources</a>
                <a href="#" className="hp-footer-link">Visiting Hours</a>
                <a href="#" className="hp-footer-link">Billing &amp; Insurance</a>
                <a href="#" className="hp-footer-link">Medical Records</a>
                <a href="#" className="hp-footer-link">MyChart Login</a>
              </div>
              <div className="hp-footer-col">
                <h4 className="hp-footer-col-title">About</h4>
                <a href="#" className="hp-footer-link">About Baptist Health</a>
                <a href="#" className="hp-footer-link">Leadership</a>
                <a href="#" className="hp-footer-link">News &amp; Media</a>
                <a href="#" className="hp-footer-link">Careers</a>
                <a href="#" className="hp-footer-link">Community Health</a>
              </div>
              <div className="hp-footer-col">
                <h4 className="hp-footer-col-title">Connect</h4>
                <a href="#" className="hp-footer-link">Contact Us</a>
                <a href="#" className="hp-footer-link">Ways to Give</a>
                <a href="#" className="hp-footer-link">Connect &amp; Learn</a>
                <a href="#" className="hp-footer-link">Community Events</a>
                <a href="#" className="hp-footer-link">Volunteer</a>
              </div>
            </div>
          </div>
          <div className="hp-footer-bottom">
            <p>© 2026 Baptist Health. All rights reserved.</p>
            <div className="hp-footer-legal">
              <a href="#" className="hp-footer-legal-link">Privacy Policy</a>
              <a href="#" className="hp-footer-legal-link">Terms of Use</a>
              <a href="#" className="hp-footer-legal-link">Accessibility</a>
              <a href="#" className="hp-footer-legal-link">Non-Discrimination</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
