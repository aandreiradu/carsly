import { BadRequestException } from '@nestjs/common';
import { FuelType } from '@prisma/client';
import { QueryAdDTO } from 'src/ads/dto/ad.dto';

export type SearchQueryModelMap = {
  brand?: {
    name: string;
  };
  model?: {
    name: string;
  };
  fuelType?: FuelType;
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

  let searchQuery: SearchQueryModelMap = {};

  for (const key in query) {
    if (key === 'brand') {
      searchQuery = {
        ...searchQuery,
        brand: {
          name: query[key].trim().toLowerCase(),
        },
      };
    } else if (key === 'model') {
      searchQuery = {
        ...searchQuery,
        model: {
          name: query[key].trim().toLowerCase(),
        },
      };
    } else if (key === 'fuel') {
      searchQuery = {
        ...searchQuery,
        fuelType: query[key],
      };
    }
  }

  return searchQuery;
};
