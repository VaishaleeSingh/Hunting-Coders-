'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
        
        .contact-title {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .contact-description {
          text-align: center;
          margin-bottom: 2rem;
          color: #666;
          font-size: clamp(0.9rem, 2vw, 1rem);
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: clamp(0.9rem, 2vw, 1rem);
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          font-size: clamp(0.9rem, 2vw, 1rem);
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }
        
        .form-group textarea {
          resize: vertical;
        }
        
        .submit-button {
          padding: 1rem 2rem;
          font-size: clamp(0.9rem, 2vw, 1rem);
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s;
        }
        
        .submit-button:hover {
          background: #0051cc;
        }
        
        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .status-message {
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
          font-size: clamp(0.9rem, 2vw, 1rem);
          margin-bottom: 1.5rem;
        }
        
        .status-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .status-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        @media (max-width: 768px) {
          .contact-container {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .contact-container {
            padding: 1rem;
          }
        }
      `}} />
      
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        
        <p className="contact-description">
          Have a question or suggestion? We'd love to hear from you!
        </p>
        
        {status === 'success' && (
          <div className="status-message status-success">
            {statusMessage}
          </div>
        )}
        
        {status === 'error' && (
          <div className="status-message status-error">
            {statusMessage}
          </div>
        )}
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="your.email@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
}