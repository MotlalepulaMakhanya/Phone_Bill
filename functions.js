// functions.js
import axios from 'axios';

export const fetchPlan = async () => {
    try {
        const result = await axios.get('http://localhost:3000/api/price_plans');
        return result.data;
    } catch (error) {
        console.error('Error fetching price plans:', error);
        throw error;
    }
};

export const calculateTotal = async (plan, actions) => {
    try {
        const response = await axios.post('http://localhost:3000/api/phonebill/', {
            "price_plan": plan,
            "actions": actions
        });
        return response.data.total;
    } catch (error) {
        console.error('Error calculating total:', error);
        throw error;
    }
};

export const createPricePlan = async (newPlan, smsCost, callCost) => {
    try {
        await axios.post('http://localhost:3000/api/price_plan/create', {
            "name": newPlan,
            "sms_cost": smsCost,
            "call_cost": callCost
        });
        return true;
    } catch (error) {
        console.error('Error creating price plan:', error);
        throw error;
    }
};

export const updatePricePlan = async (existingPlan, newSmsCost, newCallCost) => {
    try {
        await axios.post('http://localhost:3000/api/price_plan/update', {
            "name": existingPlan,
            "sms_cost": newSmsCost,
            "call_cost": newCallCost
        });
        return 'Price Plan updated successfully!';
    } catch (error) {
        console.error('Error updating price plan:', error);
        throw error;
    }
};

export const deletePricePlan = async (idNum) => {
    try {
        await axios.post('http://localhost:3000/api/price_plan/delete', {
            "id": idNum
        });
        return true;
    } catch (error) {
        console.error('Error deleting price plan:', error);
        throw error;
    }
};
