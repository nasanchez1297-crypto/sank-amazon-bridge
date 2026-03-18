exports.handler = async function () {
  try {
    const productId = "clnxjwfpm0001jq0fq6gohfgn";

    const response = await fetch(
      `https://api.roastify.app/v1/variants/product/${productId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.ROASTIFY_API_KEY_TEST,
          "Accept": "*/*",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify({
        ok: response.ok,
        status: response.status,
        count: Array.isArray(data) ? data.length : null,
        data
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
