const DISCOUNTS_STORAGE_KEY = 'dental_discounts';

function getActiveDiscountsForPrices() {
    const stored = localStorage.getItem(DISCOUNTS_STORAGE_KEY);
    if (!stored) return [];
    
    const discounts = JSON.parse(stored);
    const today = new Date().toISOString().split('T')[0];
    
    return discounts.filter(d => {
        if (!d.active) return false;
        if (d.startDate && d.endDate) {
            return today >= d.startDate && today <= d.endDate;
        }
        return d.active;
    });
}

function getDiscountForServiceForPrices(serviceId) {
    const discounts = getActiveDiscountsForPrices();
    return discounts.find(d => d.serviceId === serviceId);
}
let priceDisplay = '';
if (service.price === '0') {
    priceDisplay = 'Бесплатно';
} else {
    const discount = getDiscountForServiceForPrices(service.id);
    
    if (discount) {
        let discountedPrice = service.price;
        if (discount.type === 'percentage') {
            discountedPrice = (parseFloat(service.price) * (1 - discount.value / 100)).toFixed(0);
            priceDisplay = `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                            <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                            <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value}%</span>`;
        } else {
            discountedPrice = Math.max(0, parseFloat(service.price) - discount.value).toFixed(0);
            priceDisplay = `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                            <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                            <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value} BYN</span>`;
        }
    } else if (service.unit === 'BYN') {
        priceDisplay = `${service.price} <span class="currency-icon">BYN</span>`;
    } else {
        priceDisplay = `${service.price} ${service.unit}`;
    }
}