document.addEventListener('alpine:init', () => {
    Alpine.data('pricePlan', () => ({
        plans: [],
        plan: '',
        actions: '',
        newPlan: '',
        smsCost: '',
        callCost: '',
        idNum: '',
        total: '',
        message: '',
        existingPlan: '',
        newCallCost: '',
        newSmsCost: '',
        showPricePlan: false,

        // Fetch price plans from the API
        fetchPlan() {
            axios.get('http://localhost:3000/api/price_plans')
                .then(result => {
                    console.log(result.data);
                    this.plans = result.data;
                })
                .catch(error => {
                    console.error('Error fetching price plans:', error);
                });
        },

        togglePricePlan() {
            this.showPricePlan = !this.showPricePlan;
            console.log(this.showPricePlan ? "Table is shown" : "Table is hidden");
        },

        // Calculate total phone bill
        calculateTotal() {
            return axios.post('http://localhost:3000/api/phonebill/', {
                "price_plan": this.plan,
                "actions": this.actions
            })
                .then(response => {
                    this.total = response.data.total;
                    this.plan = '';
                    this.actions = '';

                    setTimeout(() => {
                        this.total = '';
                    }, 5000);
                });
        },

        // Create a new price plan
        createPricePlan() {
            return axios.post('http://localhost:3000/api/price_plan/create', {
                "name": this.newPlan,
                "sms_cost": this.smsCost,
                "call_cost": this.callCost
            })
                .then(response => {
                    this.newPlan = '';
                    this.smsCost = '';
                    this.callCost = '';
                    // Refresh the list after creating a price plan
                    this.fetchPlan();
                });
        },

        // Update an existing price plan
        updatePricePlan() {
            return axios.post('http://localhost:3000/api/price_plan/update', {
                "name": this.existingPlan,
                "sms_cost": this.newSmsCost,
                "call_cost": this.newCallCost
            })
                .then(response => {
                    this.message = 'Price Plan updated successfully!';
                    this.existingPlan = '';
                    this.newCallCost = '';
                    this.newSmsCost = '';
                    // Refresh the list after updating a price plan
                    this.fetchPlan();

                    setTimeout(() => {
                        this.message = '';
                    }, 5000);
                });
        },

        // Delete a price plan
        deletePricePlan() {
            return axios.post('http://localhost:3000/api/price_plan/delete', {
                "id": this.idNum
            })
                .then(response => {
                    this.idNum = '';
                    // Refresh the list after deleting a price plan
                    this.fetchPlan();
                });
        }
    }));
});
