import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts';

const router = express.Router();

// Public route for creating contacts (form submissions)
router.post('/', createContact);

// Protected routes for managing contacts (CMS)
router.get('/', authenticate, authorize('admin', 'editor'), getContacts);
router.get('/:id', authenticate, authorize('admin', 'editor'), getContact);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateContact);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteContact);

export default router;

