exports.handler = async function () {
  const hasRoastifyKey = !!process.env.ROASTIFY_API_KEY_TEST;

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      roastifyKeyFound: hasRoastifyKey
    })
  };
};
