// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

const ContactManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      subject: 'Tour Inquiry',
      message: 'I would like to know more about the Everest Base Camp Trek.',
      date: '2024-01-20',
      status: 'new'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1987654321',
      subject: 'Booking Information',
      message: 'Need details about the booking process and cancellation policy.',
      date: '2024-01-18',
      status: 'read'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1122334455',
      subject: 'Group Discount',
      message: 'Looking for group booking discounts for 10+ people.',
      date: '2024-01-15',
      status: 'replied'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<Partial<Contact>>({});

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <div className="contact-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'phone',
      label: 'Phone'
    },
    {
      key: 'subject',
      label: 'Subject'
    },
    {
      key: 'message',
      label: 'Message',
      render: (value: string) => (
        <div className="contact-cms__message">
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      width: '100px'
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (_: string, item: Contact) => (
        <div className="contact-cms__status-cell">
          <span className={`status-badge ${item.status}`}>
            {item.status}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingContact(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({ ...contact });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (contact: Contact) => {
    showDeleteConfirmation(contact, () => {
      performAction(
        () => setContacts(contacts.filter(c => c.id !== contact.id)),
        'Contact deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingContact) {
      performAction(
        () => {
          setContacts(contacts.map(contact => 
            contact.id === editingContact.id 
              ? { ...formData as Contact }
              : contact
          ));
          setIsModalOpen(false);
          setEditingContact(null);
          setFormData({});
        },
        'Contact updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newContact: Contact = {
            id: Date.now().toString(),
            name: formData.name || '',
            email: formData.email || '',
            phone: formData.phone || '',
            subject: formData.subject || '',
            message: formData.message || '',
            date: formData.date || new Date().toISOString().split('T')[0],
            status: (formData.status as 'new' | 'read' | 'replied') || 'new'
          };
          setContacts([...contacts, newContact]);
          setIsModalOpen(false);
          setEditingContact(null);
          setFormData({});
        },
        'Contact added successfully',
        'success'
      );
    }
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Contact Management</h3>
              <p>Manage customer inquiries and messages from the contact form</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={contacts}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No contacts found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingContact ? 'Edit Contact' : 'Add New Contact'}
            size="lg"
          >
            <div className="cms-section__form">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Enter name"
                required
              />
              
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="Enter email"
                required
              />
              
              <FormField
                label="Phone"
                name="phone"
                type="text"
                value={formData.phone || ''}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Enter phone number"
                required
              />
              
              <FormField
                label="Subject"
                name="subject"
                type="text"
                value={formData.subject || ''}
                onChange={(value) => setFormData({ ...formData, subject: value })}
                placeholder="Enter subject"
                required
              />
              
              <FormField
                label="Message"
                name="message"
                type="textarea"
                value={formData.message || ''}
                onChange={(value) => setFormData({ ...formData, message: value })}
                placeholder="Enter message"
                rows={4}
                required
              />
              
              <FormField
                label="Date"
                name="date"
                type="date"
                value={formData.date || ''}
                onChange={(value) => setFormData({ ...formData, date: value })}
                required
              />
              
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || 'new'}
                onChange={(value) => setFormData({ ...formData, status: value as Contact['status'] })}
                options={['new', 'read', 'replied']}
                required
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingContact ? 'Update' : 'Add'} Contact
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const ContactManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Contact',
        message: 'Are you sure you want to delete this contact?',
        type: 'contact'
      }}
    >
      <ContactManagementContent />
    </CRUDProvider>
  );
};

export default ContactManagement;

