// functions.test.mjs
import assert from 'assert';
import sinon from 'sinon';
import axios from 'axios';
import { fetchPlan, calculateTotal, createPricePlan, updatePricePlan, deletePricePlan } from '../functions.js';

describe('Price Plan Functions', function () {

    beforeEach(() => {
        sinon.restore();
    });

    it('should fetch price plans', async function () {
        const mockResponse = [{ id: 1, plan_name: 'Basic', sms_price: 0.5, call_price: 1.0 }];
        sinon.stub(axios, 'get').resolves({ data: mockResponse });

        const result = await fetchPlan();
        assert.deepStrictEqual(result, mockResponse);
    });

    it('should calculate total for a price plan', async function () {
        const plan = 'Basic';
        const actions = 'sms';
        const mockTotal = 2.0;
        sinon.stub(axios, 'post').resolves({ data: { total: mockTotal } });

        const result = await calculateTotal(plan, actions);
        assert.strictEqual(result, mockTotal);
    });

    it('should create a new price plan', async function () {
        const newPlan = 'Standard';
        const smsCost = 0.3;
        const callCost = 1.2;
        sinon.stub(axios, 'post').resolves();

        const result = await createPricePlan(newPlan, smsCost, callCost);
        assert.strictEqual(result, true);
    });

    it('should update an existing price plan', async function () {
        const existingPlan = 'Standard';
        const newSmsCost = 0.4;
        const newCallCost = 1.3;
        sinon.stub(axios, 'post').resolves();

        const result = await updatePricePlan(existingPlan, newSmsCost, newCallCost);
        assert.strictEqual(result, 'Price Plan updated successfully!');
    });

    it('should delete a price plan', async function () {
        const idNum = 1;
        sinon.stub(axios, 'post').resolves();

        const result = await deletePricePlan(idNum);
        assert.strictEqual(result, true);
    });
});
