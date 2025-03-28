/**
 * Parse URL query parameters into an object
 * @param {string} [url=window.location.href] - The URL to parse query parameters from
 * @return {Record<string, string | string[]>} Object containing the parsed query parameters
 */
export function getQueryParams(
  url: string = window.location.href
): Record<string, string | string[]> {
  // Create a URL object from the provided URL
  const urlObj = new URL(url);

  // Get the search params from the URL
  const params = urlObj.searchParams;

  // Create an object to store the parsed query parameters
  const queryParams: Record<string, string | string[]> = {};

  // Iterate through all search parameters and add them to the object
  params.forEach((value, key) => {
    // If the parameter already exists, convert it to an array
    if (queryParams[key]) {
      if (!Array.isArray(queryParams[key])) {
        queryParams[key] = [queryParams[key] as string];
      }
      (queryParams[key] as string[]).push(value);
    } else {
      queryParams[key] = value;
    }
  });

  return queryParams;
}
