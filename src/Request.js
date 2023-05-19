const request = {
  requestMovie:
    "https://kitsu.io/api/edge/anime?filter[subtype]=movie&sort=-startDate",
  requestWeeklyPopular:
    "https://kitsu.io/api/edge/anime?sort=-userCount&filter[status]=current&filter[seasonYear]=2023&filter[season]=spring",
};
export default request;
// to https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=8
