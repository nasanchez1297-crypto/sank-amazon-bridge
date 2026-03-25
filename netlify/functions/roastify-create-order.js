exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true })
      };
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          ok: false,
          message: "Method not allowed"
        })
      };
    }

    const body = JSON.parse(event.body || "{}");

    const grind = body.grind || "whole_bean";
    const quantity = Number(body.quantity || 1);

    const skuMap = {
      whole_bean: "COF-WHB-12O-COL-BOX",
      ground: "COF-GND-12O-COL-BOX"
    };

    const sku = skuMap[grind];

    if (!sku) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          ok: false,
          message: "Invalid grind. Use whole_bean or ground."
        })
      };
    }

    const payload = {
      externalSourceId: body.externalSourceId || `manual-${Date.now()}`,
      toAddress: {
        name: body.name || "Nicolas Sanchez",
        company: body.company || "SANK Coffee",
        street1: body.street1 || "1337 W 49th Pl Apt 408",
        street2: body.street2 || "",
        city: body.city || "Hialeah",
        state: body.state || "FL",
        zip: body.zip || "33012",
        country: body.country || "US",
        phone: body.phone || "7865551234",
        email: body.email || "test@example.com"
      },
      items: [
        {
          sku: sku,
          artworkUrl: body.artworkUrl || "https://sankcoffee-connect.netlify.app/test.jpg",
          quantity: quantity
        }
      ]
    };

    const response = await fetch("https://api.roastify.app/v1/orders", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ROASTIFY_API_KEY_TEST,
        "Content-Type": "application/json",
        "Idempotency-Key": body.idempotencyKey || `manual-${Date.now()}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({
        ok: response.ok,
        status: response.status,
        selectedGrind: grind,
        selectedSku: sku,
        payloadSent: payload,
        data: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        message: error.message
      })
    };
  }
};
