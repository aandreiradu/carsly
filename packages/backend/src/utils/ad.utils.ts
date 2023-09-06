import { BadRequestException } from '@nestjs/common';
import { CountriesTypes, FuelType } from '@prisma/client';
import { QueryAdDTO } from 'src/ads/dto/ad.dto';

export type SearchQueryModelMap = {
  brand?: {
    name: {
      equals: string;
    };
  };
  model?: {
    name: {
      equals: string;
    };
  };
  fuelType?: {
    equals: FuelType;
  };
  priceUpTo?: {
    lte: number;
  };
  year?: {
    equals: number;
  };
  kmUpTo?: {
    lte: number;
  };
  vehicleOrigin?: {
    equals: CountriesTypes;
  };
};

export const mapQueryDataToModel = (query: QueryAdDTO): SearchQueryModelMap => {
  /*
     * This helper will be used to search ads based on the query received from FE. 
     * Having relations between models, for example if we want to search for a specific brand
     * we need to get the name property from the Brand model: 
     *  where: {
        brand: {
          name: query.brand,
        },
      }
     * this helper will map the query received to the prisma model 
     */

  if (!query) {
    throw new BadRequestException('No query params provided');
  }

  let searchQuery = {};

  for (const key in query) {
    switch (key as keyof QueryAdDTO) {
      case 'brand': {
        searchQuery = {
          ...searchQuery,
          brand: {
            name: {
              equals: query[key].trim().toLowerCase(),
            },
          },
        };
        break;
      }
      case 'model': {
        searchQuery = {
          ...searchQuery,
          model: {
            name: {
              equals: query[key].trim().toLowerCase(),
            },
          },
        };
        break;
      }
      case 'fuel': {
        searchQuery = {
          ...searchQuery,
          fuelType: {
            equals: query[key],
          },
        };
        break;
      }

      case 'priceUpTo': {
        searchQuery = {
          ...searchQuery,
          price: {
            lte: query[key],
          },
        };
        break;
      }

      case 'year': {
        searchQuery = {
          ...searchQuery,
          year: {
            equals: query[key],
          },
        };
        break;
      }
      case 'kmUpTo': {
        searchQuery = {
          ...searchQuery,
          KM: {
            lte: query[key],
          },
        };
        break;
      }
      case 'vehicleOrigin': {
        searchQuery = {
          ...searchQuery,
          vehicleOrigin: {
            equals: query[key],
          },
        };
        break;
      }
    }
  }

  return searchQuery;
};
