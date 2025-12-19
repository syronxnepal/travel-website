// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
}

const UserManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=12',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-25',
      status: 'active'
    },
    {
      id: '2',
      email: 'editor@example.com',
      name: 'Editor User',
      role: 'editor',
      avatar: 'https://i.pravatar.cc/150?img=13',
      createdAt: '2024-01-05',
      lastLogin: '2024-01-24',
      status: 'active'
    },
    {
      id: '3',
      email: 'viewer@example.com',
      name: 'Viewer User',
      role: 'viewer',
      avatar: 'https://i.pravatar.cc/150?img=14',
      createdAt: '2024-01-10',
      lastLogin: '2024-01-20',
      status: 'inactive'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  const columns = [
    {
      key: 'avatar',
      label: 'Avatar',
      width: '80px',
      render: (_: string, item: User) => (
        <div className="user-cms__avatar-cell">
          <img src={item.avatar} alt={item.name} className="user-cms__avatar" />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <div className="user-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'role',
      label: 'Role',
      width: '120px',
      render: (value: string) => (
        <div className="user-cms__role-cell">
          <span className={`user-cms__role user-cms__role--${value}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      width: '110px'
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (_: string, item: User) => (
        <div className="user-cms__status-cell">
          <span className={`status-badge ${item.status}`}>
            {item.status}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ ...user });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    showDeleteConfirmation(user, () => {
      performAction(
        () => setUsers(users.filter(u => u.id !== user.id)),
        'User deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingUser) {
      performAction(
        () => {
          setUsers(users.map(user => 
            user.id === editingUser.id 
              ? { ...formData as User }
              : user
          ));
          setIsModalOpen(false);
          setEditingUser(null);
          setFormData({});
        },
        'User updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newUser: User = {
            id: Date.now().toString(),
            email: formData.email || '',
            name: formData.name || '',
            role: formData.role || 'viewer',
            avatar: formData.avatar || 'https://i.pravatar.cc/150?img=15',
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: '-',
            status: (formData.status as 'active' | 'inactive' | 'suspended') || 'active'
          };
          setUsers([...users, newUser]);
          setIsModalOpen(false);
          setEditingUser(null);
          setFormData({});
        },
        'User added successfully',
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
              <h3>User Management</h3>
              <p>Manage system users, roles, and permissions</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={users}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No users found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingUser ? 'Edit User' : 'Add New User'}
            size="lg"
          >
            <div className="cms-section__form">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Enter user name"
                required
              />
              
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="Enter email address"
                required
              />
              
              <FormField
                label="Role"
                name="role"
                type="select"
                value={formData.role || 'viewer'}
                onChange={(value) => setFormData({ ...formData, role: value as User['role'] })}
                options={['admin', 'editor', 'viewer']}
                required
              />
              
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || 'active'}
                onChange={(value) => setFormData({ ...formData, status: value as User['status'] })}
                options={['active', 'inactive', 'suspended']}
                required
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const UserManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        type: 'user'
      }}
    >
      <UserManagementContent />
    </CRUDProvider>
  );
};

export default UserManagement;

