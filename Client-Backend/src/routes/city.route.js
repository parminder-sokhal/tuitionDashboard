import express from 'express'
import { getAllCities,createCity, updateCity, deleteCity, getCityById, updateLive } from '../controllers/city.controller.js';


const router =express.Router();
router.get('/getAllCities',getAllCities);
router.post('/createCity/:AreaId',createCity);
router.put('/updateCity/:cityId', updateCity);
router.delete('/deleteCity/:cityId', deleteCity);

//get city by id
router.get('/city/:id', getCityById);

//update live
router.patch('/updateLive/:cityId', updateLive);


export default router;