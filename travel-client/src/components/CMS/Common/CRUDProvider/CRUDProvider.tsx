import React, { useState, useCallback } from 'react';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ToastContainer from '../ToastContainer/ToastContainer';
import { useToast } from 'src/hooks/useToast';
import { useLoading } from 'src/hooks/useLoading';
import 'src/pages/CMS/CMSPage.scss';

interface CRUDContextValue {
  showDeleteConfirmation: (item: any, onConfirm: () => void) => void;
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  performAction: (action: () => void, successMessage: string, type?: 'success' | 'error') => Promise<void>;
}

const CRUDContext = React.createContext<CRUDContextValue | undefined>(undefined);

export const useCRUD = (): CRUDContextValue => {
  const context = React.useContext(CRUDContext);
  if (!context) {
    throw new Error('useCRUD must be used within CRUDProvider');
  }
  return context;
};

interface CRUDProviderProps {
  children: React.ReactNode;
  deleteConfig?: {
    title: string;
    message: string;
    itemName?: string;
    type?: string;
  };
}

export const CRUDProvider: React.FC<CRUDProviderProps> = ({ children, deleteConfig }) => {
  const { toasts, showToast, removeToast } = useToast();
  const { loading, startLoading, stopLoading } = useLoading();
  
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    item: any;
    onConfirm: () => void;
  }>({
    isOpen: false,
    item: null,
    onConfirm: () => {}
  });

  const showDeleteConfirmationHandler = useCallback((item: any, onConfirm: () => void) => {
    setDeleteConfirmation({
      isOpen: true,
      item,
      onConfirm
    });
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteConfirmation({
      isOpen: false,
      item: null,
      onConfirm: () => {}
    });
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    deleteConfirmation.onConfirm();
    setDeleteConfirmation({
      isOpen: false,
      item: null,
      onConfirm: () => {}
    });
  }, [deleteConfirmation]);

  const performAction = async (action: () => void, successMessage: string, type: 'success' | 'error' = 'success') => {
    startLoading();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      action();
      showToast(successMessage, type);
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      stopLoading();
    }
  };

  const defaultDeleteConfig = deleteConfig || {
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    type: 'item'
  };

  const contextValue: CRUDContextValue = {
    showDeleteConfirmation: showDeleteConfirmationHandler,
    loading,
    startLoading,
    stopLoading,
    showToast,
    performAction
  };

  return (
    <CRUDContext.Provider value={contextValue}>
      {children}
      
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={defaultDeleteConfig.title}
        message={defaultDeleteConfig.message}
        itemName={
          typeof deleteConfirmation.item?.title === 'string' 
            ? deleteConfirmation.item.title 
            : typeof deleteConfirmation.item?.name === 'string'
            ? deleteConfirmation.item.name
            : ''
        }
        type={defaultDeleteConfig.type}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <i className="fa-solid fa-spinner"></i>
          </div>
        </div>
      )}
    </CRUDContext.Provider>
  );
};

export default CRUDProvider;

