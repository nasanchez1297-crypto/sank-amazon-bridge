exports.handler = async () => {
  try {
    const grind = "ground";

    const skuMap = {
      whole_bean: "COF-WHB-12O-COL-BOX",
      ground: "COF-GND-12O-COL-BOX"
    };

    const sku = skuMap[grind];

    const payload = {
      externalSourceId: "netlify-test-order-ground",
      toAddress: {
        name: "Nicolas Sanchez",
        company: "SANK Coffee",
        street1: "1337 W 49th Pl Apt 408",
        street2: "",
        city: "Hialeah",
        state: "FL",
        zip: "33012",
        country: "US",
        phone: "7865551234",
        email: "test@example.com"
      },
      items: [
        {
          sku: sku,
          artworkUrl: "https://sankcoffee-connect.netlify.app/test.jpg",
          quantity: 1
        }
      ]
    };

    const response = await fetch("https://api.roastify.app/v1/orders", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ROASTIFY_API_KEY_TEST,
        "Content-Type": "application/json",
        "Idempotency-Key": "test-order-ground"
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
