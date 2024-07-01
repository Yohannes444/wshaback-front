// config.js
let BASE_URL_LOGIN;

async function getPublicIP() {
  try {
    const response = await fetch('http://localHost:5454/api/getLocalIP');
    const data = await response.json();
    return data.localIP;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
}

async function setBaseURLLogin() {
  const ip = await getPublicIP();
  if (ip) {
    BASE_URL_LOGIN = `http://${ip}:5454`;
  } else {
    console.error('Failed to get IP address. Using default BASE_URL_LOGIN.');
    // BASE_URL_LOGIN = 'http://192.168.10.25:5454'; // fallback to default
  }
}

async function getBaseURLLogin() {
  if (!BASE_URL_LOGIN) {
    await setBaseURLLogin();
  }
  return BASE_URL_LOGIN;
}

// Ensure BASE_URL_LOGIN is set when the module is imported
setBaseURLLogin();

export { getBaseURLLogin };
