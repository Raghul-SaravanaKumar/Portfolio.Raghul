import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiSend, FiPhone, FiUser, FiMessageSquare, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

/* ─────────────────────────────────────────────────────────────────────────────
   Web3Forms — completely free, no backend, emails straight to Gmail.
   Get YOUR key at https://web3forms.com → Enter gsri318@gmail.com → copy key.
   Replace WEB3FORMS_KEY below with your key.
   Until then, the form still works as a mailto: fallback.
───────────────────────────────────────────────────────────────────────────── */
const WEB3FORMS_KEY = '916b0e31-df65-4e15-9d6a-5a4cf5540b87'; 

const SOCIALS = [
  {
    id: 'contact-github',
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/Raghul-SaravanaKumar',
    color: '#e0e0e0',
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/raghul-saravanakumar/',
    color: '#0a66c2',
  },
  {
    id: 'contact-instagram',
    label: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/rex_.oxx',
    color: '#e1306c',
  },
];

const CONTACT_DETAILS = [
  {
    id: 'contact-email',
    icon: <FiMail />,
    label: 'Email',
    value: 'iamraghul18@gmail.com',
    href: 'mailto:iamraghul18@gmail.com',
  },
  {
    id: 'contact-phone',
    icon: <FiPhone />,
    label: 'Phone',
    value: '+91 8667540722',
    href: 'tel:+918667540722',
  },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

/* Real-time field validation */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.message.trim()) errors.message = 'Message cannot be empty';
  else if (form.message.trim().length < 10) errors.message = 'Message is too short (min 10 chars)';
  return errors;
}

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched to show errors
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    setStatus('sending');

    /* ── Try Web3Forms first ── */
    if (WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: form.name,
            email: form.email,
            subject: form.subject || `Portfolio message from ${form.name}`,
            message: form.message,
            from_name: 'Portfolio Contact Form',
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setForm(EMPTY_FORM);
          setTouched({});
          return;
        }
        throw new Error(data.message || 'Submission failed');
      } catch (err) {
        setErrorMsg(err.message);
        setStatus('error');
        return;
      }
    }

    /* ── Fallback: open mailto (works without an API key) ── */
    const mailBody =
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(
        `mailto:iamraghul18@gmail.com?subject=${encodeURIComponent(
          form.subject || `Portfolio message from ${form.name}`
        )}\u0026body=${encodeURIComponent(mailBody)}`,
      '_blank'
    );
    setStatus('success');
    setForm(EMPTY_FORM);
    setTouched({});
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMsg('');
    setForm(EMPTY_FORM);
    setTouched({});
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <div className="section-divider" />

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let's build something amazing together — I reply within 24 hours
        </motion.p>

        <div className="contact-grid">
          {/* ── LEFT: Info Panel ── */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3>
              Say Hello <span className="gradient-text">👋</span>
            </h3>
            <p>
              Whether you have a project idea, an internship opportunity, a
              collaboration proposal, or just want to connect — I'd love to hear
              from you!
            </p>

            {/* Direct contact details */}
            <div className="contact-direct">
              {CONTACT_DETAILS.map((c) => (
                <motion.a
                  key={c.id}
                  id={c.id}
                  className="contact-direct-item"
                  href={c.href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="contact-direct-icon">{c.icon}</span>
                  <div>
                    <div className="contact-direct-label">{c.label}</div>
                    <div className="contact-direct-value">{c.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="contact-socials-label">Find me on</div>
            <div className="social-links">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.id}
                  id={s.id}
                  className="social-btn"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.18 }}
                  style={{ '--social-color': s.color }}
                >
                  {s.icon}
                  {s.label}
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="contact-availability">
              <span className="contact-avail-dot" />
              <span>Available for internships & freelance work</span>
            </div>
          </motion.div>

          {/* ── RIGHT: Form Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {/* SUCCESS STATE */}
              {status === 'success' && (
                <motion.div
                  key="success"
                  className="contact-form form-state-card"
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <div className="form-state-icon form-state-icon--success">
                    <FiCheckCircle />
                  </div>
                  <h3>Message Sent! 🎉</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <motion.button
                    className="btn-outline form-state-btn"
                    onClick={resetForm}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {status === 'error' && (
                <motion.div
                  key="error"
                  className="contact-form form-state-card"
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <div className="form-state-icon form-state-icon--error">
                    <FiXCircle />
                  </div>
                  <h3>Something went wrong</h3>
                  <p>{errorMsg || 'Please try again or email me directly at raghullingesh58@gmail.com'}</p>
                  <motion.button
                    className="btn-outline form-state-btn"
                    onClick={resetForm}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              )}

              {/* FORM (idle / sending) */}
              {(status === 'idle' || status === 'sending') && (
                <motion.form
                  key="form"
                  ref={formRef}
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name + Email row */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">
                        <FiUser className="form-label-icon" /> Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className={`form-input ${touched.name && errors.name ? 'form-input--error' : ''} ${touched.name && !errors.name ? 'form-input--valid' : ''}`}
                        placeholder="Raghul S"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'sending'}
                        required
                        autoComplete="name"
                      />
                      {touched.name && errors.name && (
                        <span className="form-error">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">
                        <FiMail className="form-label-icon" /> Email Address *
                      </label>
                      <input
                        id="contact-email-input"
                        name="email"
                        type="email"
                        className={`form-input ${touched.email && errors.email ? 'form-input--error' : ''} ${touched.email && !errors.email ? 'form-input--valid' : ''}`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'sending'}
                        required
                        autoComplete="email"
                      />
                      {touched.email && errors.email && (
                        <span className="form-error">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">
                      Subject <span className="form-optional">(optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      className="form-input"
                      placeholder="Internship opportunity / Project idea / Just saying hi!"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">
                      <FiMessageSquare className="form-label-icon" /> Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`form-textarea ${touched.message && errors.message ? 'form-input--error' : ''} ${touched.message && !errors.message ? 'form-input--valid' : ''}`}
                      placeholder="Tell me about your project, idea, or anything on your mind..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'sending'}
                      required
                    />
                    <div className="form-char-count">
                      {form.message.length} characters
                    </div>
                    {touched.message && errors.message && (
                      <span className="form-error">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className={`form-submit ${!isValid && Object.keys(touched).length > 0 ? 'form-submit--disabled' : ''}`}
                    id="form-submit-btn"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                  >
                    {status === 'sending' ? (
                      <>
                        <FiLoader className="spin-icon" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="form-note">
                    🔒 Your information is never shared. Usually replies within 24h.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
