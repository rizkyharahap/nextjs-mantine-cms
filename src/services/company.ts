import { sleep } from "@/utilities/sleep";

export interface GetCompaniesParams {
  page: number;
  limit: number;
}

export async function getCompanies(payload: GetCompaniesParams) {
  await sleep(2000);

  let result;

  if (payload.page === 1) {
    result = {
      data: [
        {
          id: "ksy6fuwbcs6qmn72o1igd2jm",
          name: "McKesson",
          city: "Irving",
          address: "6555 State Hwy 161",
          state: "TX",
          active: false,
        },
        {
          id: "d0hwldo93zp7sphwfii7dzoj",
          name: "AmerisourceBergen",
          city: "Conshohocken",
          address: "1 W 1st Ave",
          state: "PA",
          active: true,
        },
        {
          id: "lno5ynis56z6gl4y1z3l8ppz",
          name: "Alphabet",
          city: "Mountain View",
          address: "1600 Amphitheatre Parkway",
          state: "CA",
          active: false,
        },
        {
          id: "iezdrqu6e1odaf63qkep2k2c",
          name: "Walmart",
          city: "Bentonville",
          address: "702 SW 8th St",
          state: "AR",
          active: true,
        },
        {
          id: "wf57ogpnax0c1t4yy8eyrhcu",
          name: "Amazon",
          city: "Seattle",
          address: "410 Terry Ave N",
          state: "WA",
          active: false,
        },
        {
          id: "izi3im2g03kh3g6zpqeqzy3m",
          name: "ExxonMobil",
          city: "Irving",
          address: "5959 Las Colinas Blvd",
          state: "TX",
          active: true,
        },
        {
          id: "koeb4diy2yeot614oj5w5czg",
          name: "Apple",
          city: "Cupertino",
          address: "One Apple Park Way",
          state: "CA",
          active: true,
        },
        {
          id: "enu428ynf6rqzv8z2ie6lqf3",
          name: "CVS Health",
          city: "Woonsocket",
          address: "1 CVS Dr",
          state: "RI",
          active: false,
        },
        {
          id: "yn5sbmis8frfi9guambsgrpy",
          name: "Berkshire Hathaway",
          city: "Omaha",
          address: "3555 Farnam St",
          state: "NE",
          active: true,
        },
        {
          id: "v2ez95dx6kgz9c1cuir4xqj2",
          name: "UnitedHealth Group",
          city: "Minnetonka",
          address: "9900 Bren Rd E",
          state: "MN",
          active: true,
        },
      ],
      meta: {
        total: 30,
        perPage: payload.limit,
        currentPage: payload.page,
        lastPage: 3,
        firstPage: 1,
        firstPageUrl: "https://api.example.com/companies?page=1&limit=10",
        lastPageUrl: "https://api.example.com/companies?page=3&limit=10",
        nextPageUrl: "https://api.example.com/companies?page=2&limit=10",
        previousPageUrl: null,
      },
    };
  } else if (payload.page === 2) {
    result = {
      data: [
        {
          id: "enu428ynf6rqzv8z2ie6lqf3",
          name: "CVS Health",
          city: "Woonsocket",
          address: "1 CVS Dr",
          state: "RI",
          active: false,
        },
        {
          id: "yn5sbmis8frfi9guambsgrpy",
          name: "Berkshire Hathaway",
          city: "Omaha",
          address: "3555 Farnam St",
          state: "NE",
          active: true,
        },
        {
          id: "v2ez95dx6kgz9c1cuir4xqj2",
          name: "UnitedHealth Group",
          city: "Minnetonka",
          address: "9900 Bren Rd E",
          state: "MN",
          active: true,
        },
        {
          id: "ksy6fuwbcs6qmn72o1igd2jm",
          name: "McKesson",
          city: "Irving",
          address: "6555 State Hwy 161",
          state: "TX",
          active: false,
        },
        {
          id: "d0hwldo93zp7sphwfii7dzoj",
          name: "AmerisourceBergen",
          city: "Conshohocken",
          address: "1 W 1st Ave",
          state: "PA",
          active: true,
        },
        {
          id: "lno5ynis56z6gl4y1z3l8ppz",
          name: "Alphabet",
          city: "Mountain View",
          address: "1600 Amphitheatre Parkway",
          state: "CA",
          active: false,
        },
        {
          id: "iezdrqu6e1odaf63qkep2k2c",
          name: "Walmart",
          city: "Bentonville",
          address: "702 SW 8th St",
          state: "AR",
          active: true,
        },
        {
          id: "wf57ogpnax0c1t4yy8eyrhcu",
          name: "Amazon",
          city: "Seattle",
          address: "410 Terry Ave N",
          state: "WA",
          active: false,
        },
        {
          id: "izi3im2g03kh3g6zpqeqzy3m",
          name: "ExxonMobil",
          city: "Irving",
          address: "5959 Las Colinas Blvd",
          state: "TX",
          active: true,
        },
        {
          id: "koeb4diy2yeot614oj5w5czg",
          name: "Apple",
          city: "Cupertino",
          address: "One Apple Park Way",
          state: "CA",
          active: true,
        },
      ],
      meta: {
        total: 30,
        perPage: payload.limit,
        currentPage: payload.page,
        lastPage: 3,
        firstPage: 1,
        firstPageUrl: "https://api.example.com/companies?page=1&limit=10",
        lastPageUrl: "https://api.example.com/companies?page=3&limit=10",
        nextPageUrl: "https://api.example.com/companies?page=2&limit=10",
        previousPageUrl: null,
      },
    };
  } else {
    result = {
      data: [
        {
          id: "iezdrqu6e1odaf63qkep2k2c",
          name: "Walmart",
          city: "Bentonville",
          address: "702 SW 8th St",
          state: "AR",
          active: true,
        },
        {
          id: "wf57ogpnax0c1t4yy8eyrhcu",
          name: "Amazon",
          city: "Seattle",
          address: "410 Terry Ave N",
          state: "WA",
          active: false,
        },
        {
          id: "izi3im2g03kh3g6zpqeqzy3m",
          name: "ExxonMobil",
          city: "Irving",
          address: "5959 Las Colinas Blvd",
          state: "TX",
          active: true,
        },
        {
          id: "koeb4diy2yeot614oj5w5czg",
          name: "Apple",
          city: "Cupertino",
          address: "One Apple Park Way",
          state: "CA",
          active: true,
        },
        {
          id: "enu428ynf6rqzv8z2ie6lqf3",
          name: "CVS Health",
          city: "Woonsocket",
          address: "1 CVS Dr",
          state: "RI",
          active: false,
        },
        {
          id: "yn5sbmis8frfi9guambsgrpy",
          name: "Berkshire Hathaway",
          city: "Omaha",
          address: "3555 Farnam St",
          state: "NE",
          active: true,
        },
        {
          id: "v2ez95dx6kgz9c1cuir4xqj2",
          name: "UnitedHealth Group",
          city: "Minnetonka",
          address: "9900 Bren Rd E",
          state: "MN",
          active: true,
        },
        {
          id: "ksy6fuwbcs6qmn72o1igd2jm",
          name: "McKesson",
          city: "Irving",
          address: "6555 State Hwy 161",
          state: "TX",
          active: false,
        },
        {
          id: "d0hwldo93zp7sphwfii7dzoj",
          name: "AmerisourceBergen",
          city: "Conshohocken",
          address: "1 W 1st Ave",
          state: "PA",
          active: true,
        },
        {
          id: "lno5ynis56z6gl4y1z3l8ppz",
          name: "Alphabet",
          city: "Mountain View",
          address: "1600 Amphitheatre Parkway",
          state: "CA",
          active: false,
        },
      ],
      meta: {
        total: 30,
        perPage: payload.limit,
        currentPage: payload.page,
        lastPage: 3,
        firstPage: 1,
        firstPageUrl: "https://api.example.com/companies?page=1&limit=10",
        lastPageUrl: "https://api.example.com/companies?page=3&limit=10",
        nextPageUrl: "https://api.example.com/companies?page=2&limit=10",
        previousPageUrl: null,
      },
    };
  }

  return Promise.resolve(result);
}
