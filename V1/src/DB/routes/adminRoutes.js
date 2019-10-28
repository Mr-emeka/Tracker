import express from 'express';
import AdminController from '../controllers/adminController';
import adminAuthentication from '../middlewares/adminAuth';
import checkRequest from '../middlewares/checkRequest';


const router = express.Router();

router.get('/requests', adminAuthentication.verifyAdmin, AdminController.getAll);

//would use a switch statement later on
// router.get('/approved', adminAuthentication.verifyAdmin, AdminController.getAllApproved);

// router.get('/pending', adminAuthentication.verifyAdmin, AdminController.getAllPending);

// router.get('/resolved', adminAuthentication.verifyAdmin, AdminController.getAllResolved);

router.put(
  '/:requestId/approve',
  adminAuthentication.verifyAdmin,
  checkRequest.requestCheckPending,
  AdminController.approveRequest,
);

router.put(
  '/:requestId/disapprove',
  adminAuthentication.verifyAdmin,
  checkRequest.requestCheckPending,
  AdminController.disapproveRequest,
);
router.put(
  '/:requestId/resolve',
  checkRequest.requestCheckApprove,
  adminAuthentication.verifyAdmin,
  AdminController.resolveRequest,
);

export default router;