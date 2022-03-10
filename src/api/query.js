export const placeQuery = `*[_type == "place"]`;

export const getPlaceSearchQuery = (target) =>
  target
    ? `*[_type == "place" && (placeName match "${target}" || placeName match "*${target}*" || address match "${target}" || address match "*${target}*")]`
    : placeQuery;

export const getPlaceImagesQuery = (placeId) =>
  `*[_type == "photo" && (place._ref == "${placeId}")]`;
