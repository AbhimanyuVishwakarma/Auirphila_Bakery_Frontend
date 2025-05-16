// API endpoints configuration
const API_CONFIG = {
    baseUrl: '../backend/api',
    endpoints: {
        orders: '/orders.php',
        products: '/products.php',
        users: '/users.php'
    }
};

// Generic API call function
async function apiCall(endpoint, method = 'GET', data = null) {
    const url = API_CONFIG.baseUrl + endpoint;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Order-related API functions
const orderAPI = {
    getAllOrders: async () => {
        return await apiCall(API_CONFIG.endpoints.orders);
    },
    
    getOrderById: async (orderId) => {
        return await apiCall(`${API_CONFIG.endpoints.orders}?id=${orderId}`);
    },
    
    updateOrderStatus: async (orderId, status) => {
        return await apiCall(API_CONFIG.endpoints.orders, 'PUT', {
            orderId,
            status
        });
    },
    
    deleteOrder: async (orderId) => {
        return await apiCall(`${API_CONFIG.endpoints.orders}?id=${orderId}`, 'DELETE');
    }
};

// Product-related API functions
const productAPI = {
    getAllProducts: async () => {
        return await apiCall(API_CONFIG.endpoints.products);
    }
};

// User-related API functions
const userAPI = {
    getAllUsers: async () => {
        return await apiCall(API_CONFIG.endpoints.users);
    }
};