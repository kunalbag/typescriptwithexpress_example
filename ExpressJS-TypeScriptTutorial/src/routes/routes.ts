import { Router } from 'express';
import { insertRecord, deleteRecordByEmpId, getAllRecords, getRecordByEmpId, updateRecordByEmpId,deleteAllRecords } from '../controllers/posts.controller';

const router = Router();

router.route("/getallrecords").get(getAllRecords);
router.route("/getrecord/:empId").get(getRecordByEmpId);

router.route("/insertrecord").post(insertRecord);
router.route("/updaterecord/:empId").put(updateRecordByEmpId);

router.route("/deleterecord/:empId").delete(deleteRecordByEmpId);
router.route("/deleteallrecords").delete(deleteAllRecords);


export default router;