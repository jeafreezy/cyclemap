import countryData from "@/data/countries.json";

/**
 *  Utility function to get the country name from a country code.
 * @param countryCode - The country code to look up.
 * @returns  The name of the country corresponding to the provided country code.
 */
export const getCountryNameFromCode = (countryCode: string): string => {
  const country = countryData.data.find(
    (country) => country.code === countryCode,
  );
  return country?.name || countryCode;
};
