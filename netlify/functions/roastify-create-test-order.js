exports.handler = async () => {
  try {
    const grind = "whole_bean";

    const skuMap = {
      whole_bean: "COF-WHB-12O-COL-BOX",
      ground: "COF-GND-12O-COL-BOX"
    };

    const sku = skuMap[grind];

    const payload = {
      externalSourceId: "netlify-test-order-1",
      shippingAddress: {
        name: "Test Customer",
        address1: "123 Test St",
        city: "Miami",
        state: "FL",
        zip: "33101",
        country: "US"
      },
      items: [
        {
          sku: sku,
          artworkUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
          quantity: 1
        }
      ]
    };

    const response = await fetch("https://api.roastify.app/v1/orders", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ROASTIFY_API_KEY_TEST,
        "Content-Type": "application/json",
        "Idempotency-Key": "test-order-1"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify({
        ok: response.ok,
        status: response.status,
        selectedGrind: grind,
        selectedSku: sku,
        data: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        message: error.message
      })
    };
  }
};
