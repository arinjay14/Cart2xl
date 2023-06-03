chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'convertToExcel') {
        var cartItems = document.querySelectorAll('.cart-item');
        var csvData = [];

        // Extract cart details
        cartItems.forEach(function(item) {
            var productName = item.querySelector('.product-name').innerText;
            var productPrice = item.querySelector('.product-price').innerText;
            var quantity = item.querySelector('.quantity-input').value;

            csvData.push([productName, productPrice, quantity]);
        });

        // Convert to CSV
        var csv = Papa.unparse(csvData);

        // Trigger file download
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        chrome.downloads.download({ url: url, filename: 'cart_details.csv' });
    }
});