/* Endpoint */
const isLocalHost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostame === "[::1]" ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);
  /*  */
const convertImageBufferToUrl = async (imageBuffer) => {
  if (!imageBuffer || !Array.isArray(imageBuffer) || imageBuffer.length === 0) {
    return null;
  }
  const concatenatedHex = imageBuffer.join('').replace(/[^0-9a-fA-F]/g, '');
  const bytes = new Uint8Array(concatenatedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const blob = new Blob([bytes], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
};
/* Convert aql time */
function convertPostgreSQLTimestamp(postgresTimestamp) {
  const postgresTimestampInMillis = Date.parse(postgresTimestamp);
  const userTimeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const timestampInUserTimezone = new Date(postgresTimestampInMillis + userTimeZoneOffset);
  const formattedDate = timestampInUserTimezone.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
  return formattedDate;
}

/* EXPORTS */
const API_URL = isLocalHost ? "http://localhost:4000" : "https://sellyeviapi.artmoram.com";
export {API_URL, convertImageBufferToUrl, convertPostgreSQLTimestamp}; 