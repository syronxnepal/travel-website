import express from 'express';
import {
  getWishlists,
  getWishlist,
  createWishlist,
  deleteWishlist
} from '../controllers/wishlists';

const router = express.Router();

// Public routes for wishlist (no auth required for guest users)
router.get('/', getWishlists);
router.get('/:id', getWishlist);
router.post('/', createWishlist);
router.delete('/:id', deleteWishlist);
router.delete('/', deleteWishlist); // Delete by query params (itemId, itemType)

export default router;

