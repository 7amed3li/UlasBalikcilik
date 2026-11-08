export const GTM_EVENTS = {
  VIEW_ITEM_LIST: "view_item_list",
  VIEW_ITEM: "view_item",
  ADD_TO_CART: "add_to_cart",
};

/**
 * Enhanced eCommerce Tracking for Google Ads & GA4
 */
export const trackViewItemList = (items, listName = "Menu") => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: GTM_EVENTS.VIEW_ITEM_LIST,
      ecommerce: {
        item_list_name: listName,
        items: items.map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          index: index + 1,
        })),
      },
    });
  }
};

export const trackViewItem = (item) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: GTM_EVENTS.VIEW_ITEM,
      ecommerce: {
        currency: "TRY",
        value: item.price,
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
            index: 1,
          },
        ],
      },
      // Specifically for Google Ads Dynamic Remarketing
      ecomm_prodid: item.id,
      ecomm_pagetype: "product",
      ecomm_totalvalue: item.price,
    });
  }
};
