// ========================================
// ADMIN.JS - Admin Panel Scripts
// ========================================

// Admin credentials (in production, use proper backend authentication)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Admin Login
function adminLogin() {
    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value.trim();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        sessionStorage.setItem('admin_logged_in', 'true');
        loadOrders();
    } else {
        alert('Invalid credentials!');
    }
}

// Admin Logout
function adminLogout() {
    sessionStorage.removeItem('admin_logged_in');
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Load Orders
function loadOrders(filter = 'all') {
    const orders = JSON.parse(localStorage.getItem('ff_orders') || '[]');
    const tbody = document.getElementById('ordersTableBody');
    const noOrders = document.getElementById('noOrders');

    // Filter orders
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(o => o.status === filter);
    }

    // Update stats
    updateStats(orders);

    if (filteredOrders.length === 0) {
        tbody.innerHTML = '';
        noOrders.style.display = 'block';
        return;
    }

    noOrders.style.display = 'none';

    tbody.innerHTML = filteredOrders.map((order, index) => `
        <tr>
            <td><strong>${order.orderId}</strong></td>
            <td>${order.playerId}</td>
            <td>${order.playerName}</td>
            <td>💎 ${order.diamonds}</td>
            <td><strong style="color: #00ff88;">₹${order.price}</strong></td>
            <td>${order.transactionId}</td>
            <td>
                <a href="https://wa.me/${order.senderPhone}" target="_blank" style="color: #25D366;">
                    ${order.senderPhone}
                </a>
            </td>
            <td>
                ${order.screenshot ?
            `<span class="view-ss" onclick="viewScreenshot('${order.orderId}')">View</span>` :
            'N/A'}
            </td>
            <td style="font-size: 11px;">${order.dateFormatted}</td>
            <td>
                <span class="status-badge ${order.status}">${order.status}</span>
            </td>
            <td>
                <div class="action-btns">
                    ${order.status === 'pending' ? `
                        <button class="action-btn approve" onclick="updateOrderStatus('${order.orderId}', 'completed')">
                            ✓ Approve
                        </button>
                        <button class="action-btn reject" onclick="updateOrderStatus('${order.orderId}', 'rejected')">
                            ✕ Reject
                        </button>
                    ` : `
                        <span style="font-size: 12px; color: rgba(255,255,255,0.3);">—</span>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// Update Stats
function updateStats(orders) {
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent =
        orders.filter(o => o.status === 'pending').length;
    document.getElementById('completedOrders').textContent =
        orders.filter(o => o.status === 'completed').length;

    const revenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + parseInt(o.price), 0);
    document.getElementById('totalRevenue').textContent = `₹${revenue}`;
}

// Update Order Status
function updateOrderStatus(orderId, status) {
    let orders = JSON.parse(localStorage.getItem('ff_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        localStorage.setItem('ff_orders', JSON.stringify(orders));
        loadOrders();

        const statusText = status === 'completed' ? 'approved ✅' : 'rejected ❌';
        alert(`Order ${orderId} has been ${statusText}`);
    }
}

// Filter Orders
function filterOrders(filter, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    loadOrders(filter);
}

// View Screenshot
function viewScreenshot(orderId) {
    const orders = JSON.parse(localStorage.getItem('ff_orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);

    if (order && order.screenshot) {
        document.getElementById('previewImage').src = order.screenshot;
        document.getElementById('imageModal').style.display = 'flex';
    }
}

// Close Image Modal
function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Check if already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('admin_logged_in') === 'true') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadOrders();
    }

    // Enter key for login
    document.getElementById('adminPass')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') adminLogin();
    });

    // Auto refresh orders every 10 seconds
    setInterval(() => {
        if (sessionStorage.getItem('admin_logged_in') === 'true') {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.textContent.toLowerCase() : 'all';
            loadOrders(filter);
        }
    }, 10000);
});
