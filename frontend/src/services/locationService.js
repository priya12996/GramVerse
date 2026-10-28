const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/reverse";

export async function getLocationName(latitude, longitude) {
  try {
    const url =
      `${NOMINATIM_URL}?format=jsonv2` +
      `&lat=${latitude}` +
      `&lon=${longitude}` +
      `&zoom=10` +
      `&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch location name");
    }

    const data = await response.json();

    return {
      displayName: data.display_name || "Unknown location",
      village:
        data.address?.village ||
        data.address?.town ||
        data.address?.city ||
        data.address?.municipality ||
        "",
      district:
        data.address?.county ||
        data.address?.state_district ||
        "",
      state: data.address?.state || "",
      country: data.address?.country || "",
    };
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);

    return {
      displayName: "Current Location",
      village: "",
      district: "",
      state: "",
      country: "",
    };
  }
}