import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; 

export const getSensorData = async (page=1, limit=20) => {
    try{
        const res = await axios.get(`${BASE_URL}/api/sensor-data/` , {
            params: {page, limit}
        });
        return res.data;
    }
    catch(err){
        console.error('Error fetching sensor data:', err);
        throw err;
    }
}

export const getLatestSensorData = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/api/sensor-data/latest/`); 
        return res.data;
    }
    catch(err){
        console.error('Error fetching latest sensor data:', err);
        throw err;
    }
}

export const getStats = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/api/stats/`); 
        return res.data;
    }       
    catch(err){
        console.error('Error fetching stats:', err);
        throw err;
    }
}  


export const getAlerts = async (page=1, limit=20) => {
    try{
        const res = await axios.get(`${BASE_URL}/api/alerts/` , {
            params: {page, limit}
        });     
        return res.data;
    }   
    catch(err){
        console.error('Error fetching alerts:', err);
        throw err;
    }
}

export const getRecentAlerts = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/api/alerts/recent/`); 
        return res.data;
    }       
    catch(err){
        console.error('Error fetching recent alerts:', err);
        throw err;
    }
}