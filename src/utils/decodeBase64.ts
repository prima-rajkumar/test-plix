/**
 * Decode a Base64 string to a UTF-8 string
 * @param {string} base64String - The Base64 encoded string to decode
 * @return {string} The decoded UTF-8 string
 */
export function decodeBase64(base64String: string): string {
  try {
    // For browser environments
    if (typeof window !== "undefined") {
      return atob(base64String);
    }
  } catch (error) {
    console.error("Error decoding Base64 string:", error);
    return "";
  }

  return "";
}
