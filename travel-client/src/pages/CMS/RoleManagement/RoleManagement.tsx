// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Role {
  id: string;
  name: string;
  slug: 'admin' | 'editor' | 'viewer';
  description: string;
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canManageContent: boolean;
    canManageSettings: boolean;
  };
  isActive: boolean;
}

const RoleManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Administrator',
      slug: 'admin',
      description: 'Full access to all features and settings',
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: true,
        canManageUsers: true,
        canManageContent: true,
        canManageSettings: true
      },
      isActive: true
    },
    {
      id: '2',
      name: 'Editor',
      slug: 'editor',
      description: 'Can create, edit, and manage content but cannot manage users or settings',
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: true,
        canManageUsers: false,
        canManageContent: true,
        canManageSettings: false
      },
      isActive: true
    },
    {
      id: '3',
      name: 'Viewer',
      slug: 'viewer',
      description: 'Read-only access to view content',
      permissions: {
        canView: true,
        canEdit: false,
        canDelete: false,
        canManageUsers: false,
        canManageContent: false,
        canManageSettings: false
      },
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<Partial<Role>>({});

  const columns = [
    {
      key: 'name',
      label: 'Role Name',
      render: (value: string, item: Role) => (
        <div>
          <strong>{value}</strong>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {item.description}
          </div>
        </div>
      )
    },
    {
      key: 'slug',
      label: 'Slug',
      render: (value: string) => (
        <code style={{ background: 'var(--background-light)', padding: '2px 6px', borderRadius: '4px' }}>
          {value}
        </code>
      )
    },
    {
      key: 'permissions',
      label: 'Permissions',
      render: (_: any, item: Role) => {
        const permissionCount = Object.values(item.permissions).filter(p => p).length;
        const totalPermissions = Object.keys(item.permissions).length;
        return (
          <div>
            <span className="badge badge--info">
              {permissionCount}/{totalPermissions} Permissions
            </span>
          </div>
        );
      }
    },
    {
      key: 'isActive',
      label: 'Status',
      width: '100px',
      render: (_: boolean, item: Role) => (
        <span className={`badge ${item.isActive ? 'badge--success' : 'badge--secondary'}`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      slug: 'viewer',
      description: '',
      permissions: {
        canView: true,
        canEdit: false,
        canDelete: false,
        canManageUsers: false,
        canManageContent: false,
        canManageSettings: false
      },
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({ ...role });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    showDeleteConfirmation(role, () => {
      performAction(
        () => setRoles(roles.filter(r => r.id !== role.id)),
        'Role deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      return;
    }

    if (editingRole) {
      performAction(
        () => {
          setRoles(roles.map(role => 
            role.id === editingRole.id 
              ? { ...formData as Role }
              : role
          ));
          setIsModalOpen(false);
          setEditingRole(null);
          setFormData({});
        },
        'Role updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newRole: Role = {
            id: Date.now().toString(),
            name: formData.name || '',
            slug: formData.slug || 'viewer',
            description: formData.description || '',
            permissions: formData.permissions || {
              canView: true,
              canEdit: false,
              canDelete: false,
              canManageUsers: false,
              canManageContent: false,
              canManageSettings: false
            },
            isActive: formData.isActive ?? true
          };
          setRoles([...roles, newRole]);
          setIsModalOpen(false);
          setEditingRole(null);
          setFormData({});
        },
        'Role added successfully',
        'success'
      );
    }
  };

  const updatePermission = (key: keyof Role['permissions'], value: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [key]: value
      } as Role['permissions']
    });
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Role Management</h3>
              <p>Manage user roles and their permissions</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={roles}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No roles found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingRole ? 'Edit Role' : 'Add New Role'}
            size="lg"
          >
            <div className="cms-section__form">
              <FormField
                label="Role Name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="e.g., Administrator, Editor"
                required
              />
              
              <FormField
                label="Slug"
                name="slug"
                type="select"
                value={formData.slug || 'viewer'}
                onChange={(value) => setFormData({ ...formData, slug: value as Role['slug'] })}
                options={[
                  { value: 'admin', label: 'admin' },
                  { value: 'editor', label: 'editor' },
                  { value: 'viewer', label: 'viewer' }
                ]}
                required
                helpText="URL-friendly identifier for the role"
              />
              
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Describe the role and its purpose"
                rows={3}
                required
              />
              
              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--spacing-md)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  Permissions
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-md)'
                }}>
                  <FormField
                    label="Can View"
                    name="canView"
                    type="checkbox"
                    value={formData.permissions?.canView ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canView', value === 'true')}
                  />
                  <FormField
                    label="Can Edit"
                    name="canEdit"
                    type="checkbox"
                    value={formData.permissions?.canEdit ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canEdit', value === 'true')}
                  />
                  <FormField
                    label="Can Delete"
                    name="canDelete"
                    type="checkbox"
                    value={formData.permissions?.canDelete ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canDelete', value === 'true')}
                  />
                  <FormField
                    label="Can Manage Users"
                    name="canManageUsers"
                    type="checkbox"
                    value={formData.permissions?.canManageUsers ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canManageUsers', value === 'true')}
                  />
                  <FormField
                    label="Can Manage Content"
                    name="canManageContent"
                    type="checkbox"
                    value={formData.permissions?.canManageContent ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canManageContent', value === 'true')}
                  />
                  <FormField
                    label="Can Manage Settings"
                    name="canManageSettings"
                    type="checkbox"
                    value={formData.permissions?.canManageSettings ? 'true' : 'false'}
                    onChange={(value) => updatePermission('canManageSettings', value === 'true')}
                  />
                </div>
              </div>
              
              <FormField
                label="Active"
                name="isActive"
                type="checkbox"
                value={formData.isActive ? 'true' : 'false'}
                onChange={(value) => setFormData({ ...formData, isActive: value === 'true' })}
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingRole ? 'Update' : 'Add'} Role
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const RoleManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Role',
        message: 'Are you sure you want to delete this role? Users with this role will need to be reassigned.',
        type: 'role'
      }}
    >
      <RoleManagementContent />
    </CRUDProvider>
  );
};

export default RoleManagement;

