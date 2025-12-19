import React, { useState } from 'react';
import './ContactForm.scss';
import SectionHeading from '../SectionHeading/Index';
import { useAppToast } from 'src/context/ToastContext';

const ContactForm: React.FC = () => {
  const { showToast } = useAppToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    comment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    showToast('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      title: '',
      comment: ''
    });
  };

  return (
        <div className="contact-form__content">
          <div className="contact-form__header">
            <SectionHeading 
              topTitle="SEND A MESSAGE" 
              title="Looking For Any Help?" 
              iconclassName="fa-solid fa-envelope"
            />
          </div>

          <div className="contact-form__form-container">
            <form className="contact-form__form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="name" className="contact-form__label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                    className="contact-form__input"
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="title" className="contact-form__label">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="contact-form__input"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="comment" className="contact-form__label">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Enter Comment"
                  className="contact-form__textarea"
                  rows={6}
                  required
                />
              </div>

              <div className="contact-form__submit">
                <button type="submit" className="btn btn--primary contact-form__button">
                  Submit
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

  );
};

export default ContactForm;
