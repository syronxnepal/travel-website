import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './AboutPageSections.scss';

interface MissionItem {
  id: string;
  heading: string;
  paragraph: string;
}

const AboutIntroSectionPageContent: React.FC = () => {
  const { performAction } = useCRUD();
  const [introData, setIntroData] = useState({
    heading: 'Welcome to Our Travel Company',
    paragraph: 'We are dedicated to providing exceptional travel experiences around the world.'
  });
  
  const [missionData, setMissionData] = useState({
    heading: 'Our Mission',
    paragraph: 'Our mission is to inspire and enable travelers to explore the world in meaningful ways.'
  });
  
  const [missionItems, setMissionItems] = useState<MissionItem[]>([
    {
      id: '1',
      heading: 'Adventure',
      paragraph: 'Experience thrilling adventures in breathtaking destinations.'
    },
    {
      id: '2',
      heading: 'Excellence',
      paragraph: 'We strive for excellence in every aspect of our service.'
    }
  ]);
  
  const [isMissionItemModalOpen, setIsMissionItemModalOpen] = useState(false);
  const [editingMissionItem, setEditingMissionItem] = useState<MissionItem | null>(null);
  const [missionItemFormData, setMissionItemFormData] = useState<Partial<MissionItem>>({});

  const missionColumns = [
    {
      key: 'heading',
      label: 'Heading',
      render: (value: string) => (
        <div className="about-section__cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'paragraph',
      label: 'Paragraph',
      render: (value: string) => (
        <div className="about-section__cell">
          {value.length > 60 ? `${value.substring(0, 60)}...` : value}
        </div>
      )
    }
  ];

  const handleAddMissionItem = () => {
    setEditingMissionItem(null);
    setMissionItemFormData({});
    setIsMissionItemModalOpen(true);
  };

  const handleEditMissionItem = (item: MissionItem) => {
    setEditingMissionItem(item);
    setMissionItemFormData(item);
    setIsMissionItemModalOpen(true);
  };

  const handleDeleteMissionItem = (item: MissionItem) => {
    performAction(
      () => setMissionItems(missionItems.filter(i => i.id !== item.id)),
      'Mission item deleted successfully',
      'success'
    );
  };

  const handleSaveMissionItem = () => {
    if (editingMissionItem) {
      performAction(
        () => {
          setMissionItems(missionItems.map(item =>
            item.id === editingMissionItem.id
              ? { ...missionItemFormData as MissionItem }
              : item
          ));
          setIsMissionItemModalOpen(false);
          setEditingMissionItem(null);
          setMissionItemFormData({});
        },
        'Mission item updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newItem: MissionItem = {
            id: Date.now().toString(),
            heading: missionItemFormData.heading || '',
            paragraph: missionItemFormData.paragraph || ''
          };
          setMissionItems([...missionItems, newItem]);
          setIsMissionItemModalOpen(false);
          setEditingMissionItem(null);
          setMissionItemFormData({});
        },
        'Mission item added successfully',
        'success'
      );
    }
  };

  const handleSaveIntro = () => {
    performAction(
      () => {
        console.log('Intro saved:', introData);
      },
      'Intro section saved successfully',
      'success'
    );
  };

  const handleSaveMission = () => {
    performAction(
      () => {
        console.log('Mission saved:', missionData);
      },
      'Mission section saved successfully',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="about-section">
          <div className="about-section__header">
            <h3>About Page - Intro Section</h3>
            <p>Manage the intro and mission sections for your About page</p>
          </div>

          {/* Intro Section */}
          <div className="about-section__card">
            <div className="about-section__card-header">
              <h4>Intro Section</h4>
            </div>
            <div className="about-section__form">
              <FormField
                label="Heading"
                name="introHeading"
                type="text"
                value={introData.heading}
                onChange={(value) => setIntroData({ ...introData, heading: value })}
                placeholder="Enter intro heading"
              />
              <FormField
                label="Paragraph"
                name="introParagraph"
                type="textarea"
                value={introData.paragraph}
                onChange={(value) => setIntroData({ ...introData, paragraph: value })}
                placeholder="Enter intro paragraph"
                rows={4}
              />
              <button className="btn btn-primary" onClick={handleSaveIntro}>
                Save Intro
              </button>
            </div>
          </div>

          {/* Mission Section */}
          <div className="about-section__card">
            <div className="about-section__card-header">
              <h4>Mission Section</h4>
            </div>
            <div className="about-section__form">
              <FormField
                label="Heading"
                name="missionHeading"
                type="text"
                value={missionData.heading}
                onChange={(value) => setMissionData({ ...missionData, heading: value })}
                placeholder="Enter mission heading"
              />
              <FormField
                label="Paragraph"
                name="missionParagraph"
                type="textarea"
                value={missionData.paragraph}
                onChange={(value) => setMissionData({ ...missionData, paragraph: value })}
                placeholder="Enter mission paragraph"
                rows={4}
              />
              <button className="btn btn-primary" onClick={handleSaveMission}>
                Save Mission
              </button>
            </div>
          </div>

          {/* Mission Items Table */}
          <div className="about-section__card">
            <div className="about-section__card-header">
              <h4>Mission Items</h4>
            </div>
            <div className="about-section__content">
              <DataTable
                data={missionItems}
                columns={missionColumns}
                onAdd={handleAddMissionItem}
                onEdit={handleEditMissionItem}
                onDelete={handleDeleteMissionItem}
                searchable
                emptyMessage="No mission items yet"
              />
            </div>
          </div>

          {/* Mission Item Modal */}
          <Modal
            isOpen={isMissionItemModalOpen}
            onClose={() => setIsMissionItemModalOpen(false)}
            title={editingMissionItem ? 'Edit Mission Item' : 'Add Mission Item'}
            size="md"
          >
            <div className="about-section__form">
              <FormField
                label="Heading"
                name="heading"
                type="text"
                value={missionItemFormData.heading || ''}
                onChange={(value) => setMissionItemFormData({ ...missionItemFormData, heading: value })}
                placeholder="Enter item heading"
                required
              />
              <FormField
                label="Paragraph"
                name="paragraph"
                type="textarea"
                value={missionItemFormData.paragraph || ''}
                onChange={(value) => setMissionItemFormData({ ...missionItemFormData, paragraph: value })}
                placeholder="Enter item paragraph"
                rows={4}
                required
              />
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsMissionItemModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveMissionItem}>
                  {editingMissionItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const AboutIntroSectionPage: React.FC = () => {
  return (
    <CRUDProvider>
      <AboutIntroSectionPageContent />
    </CRUDProvider>
  );
};

export default AboutIntroSectionPage;
