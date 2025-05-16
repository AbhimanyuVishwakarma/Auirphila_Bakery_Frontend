// AuIrphila Bakery API Service
const orderAPI = {
    // Get all orders
    getAllOrders: async function() {
        try {
            // In a real application, this would be an actual API call
            // For now, we'll return mock data
            return [
                { id: 'ORD-001', customer: 'John Doe', date: '2023-06-15', total: 45.99, status: 'completed' },
                { id: 'ORD-002', customer: 'Jane Smith', date: '2023-06-15', total: 32.50, status: 'pending' },
                { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-06-14', total: 78.25, status: 'processing' },
                { id: 'ORD-004', customer: 'Emily Davis', date: '2023-06-14', total: 19.99, status: 'completed' },
                { id: 'ORD-005', customer: 'Michael Brown', date: '2023-06-13', total: 65.75, status: 'cancelled' },
                { id: 'ORD-006', customer: 'Sarah Wilson', date: '2023-06-13', total: 42.30, status: 'pending' },
                { id: 'ORD-007', customer: 'David Miller', date: '2023-06-12', total: 55.00, status: 'completed' },
                { id: 'ORD-008', customer: 'Lisa Taylor', date: '2023-06-12', total: 29.99, status: 'processing' }
            ];
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Get order by ID
    getOrderById: async function(orderId) {
        try {
            const orders = await this.getAllOrders();
            return orders.find(order => order.id === orderId);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Update order status
    updateOrderStatus: async function(orderId, newStatus) {
        try {
            // In a real application, this would be an API call
            console.log(`Order ${orderId} status updated to ${newStatus}`);
            return { success: true };
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};

// Product API
const productAPI = {
    // Get all products
    getAllProducts: async function() {
        try {
            // Mock product data
            return [
                { id: 'PRD-001', name: 'Chocolate Cake', price: 25.99, stock: 15 },
                { id: 'PRD-002', name: 'Sourdough Bread', price: 6.50, stock: 28 },
                { id: 'PRD-003', name: 'Blueberry Muffin', price: 3.25, stock: 42 },
                { id: 'PRD-004', name: 'Almond Croissant', price: 4.99, stock: 18 }
            ];
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};