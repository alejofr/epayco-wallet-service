import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Model,
  Document,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export type FilterQuery<T> = Record<string, any>;

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?:
  | string
  | { [key: string]: 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1 };
  filters?: {
    [key: string]: {
      op: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
      value: any;
    };
  };
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

@Injectable()
export abstract class AbstractRepositoryMongoBase<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(entity: Partial<T>): Promise<T> {
    const create = new this.model(entity);
    return await create.save();
  }

  async findAll(
    filter: FilterQuery<T> = {},
    populate?: PopulateOptions | (string | PopulateOptions)[],
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    let query = this.model.find(filter, projection, options);

    if (populate) {
      query = query.populate(populate as any);
    }

    return await query.exec();
  }

  async findAllPaginated(
    options: PaginationOptions,
    populate?: PopulateOptions | (string | PopulateOptions)[],
    projection?: ProjectionType<T>,
  ): Promise<PaginationResult<T>> {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<T> = {};

    if (options.filters) {
      Object.keys(options.filters).forEach((key) => {
        const { op, value } = options.filters![key];

        if (value === undefined || value === null || value === '') return;

        switch (op) {
          case 'equals':
            (filter as any)[key] = value;
            break;
          case 'contains':
            (filter as any)[key] = { $regex: value, $options: 'i' };
            break;
          case 'gt':
            (filter as any)[key] = { ...(filter as any)[key], $gt: value };
            break;
          case 'lt':
            (filter as any)[key] = { ...(filter as any)[key], $lt: value };
            break;
          case 'gte':
            (filter as any)[key] = { ...(filter as any)[key], $gte: value };
            break;
          case 'lte':
            (filter as any)[key] = { ...(filter as any)[key], $lte: value };
            break;
          case 'in':
            (filter as any)[key] = {
              $in: Array.isArray(value) ? value : [value],
            };
            break;
        }
      });
    }

    let query = this.model.find(filter, projection);

    if (populate) {
      query = query.populate(populate as any);
    }

    if (options.sort) {
      query = query.sort(options.sort as any);
    }

    query = query.skip(skip).limit(limit);

    const [data, total] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findOne(
    filter: FilterQuery<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[],
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    let query = this.model.findOne(filter, projection, options);

    if (populate) {
      query = query.populate(populate as any);
    }

    const find = await query.exec();

    if (!find) throw new NotFoundException();

    return find;
  }

  async updateById(filter: FilterQuery<T>, update: Partial<T>): Promise<T> {
    const find = await this.findOne(filter);

    find.set(update);
    return await find.save();
  }

  async updateByEntity(entity: T): Promise<T> {
    return await entity.save();
  }

  async deleteById(filter: FilterQuery<T>): Promise<T> {
    const find = await this.findOne(filter);
    await this.model.deleteOne(filter).exec();
    return find;
  }

  async deleteByEntity(entity: T): Promise<T> {
    await entity.deleteOne();
    return entity;
  }

  async checkOrFailId(filter: FilterQuery<T>): Promise<T> {
    const find = await this.model.findOne(filter).exec();
    if (!find) throw new NotFoundException();
    return find;
  }

  async existCheck(
    filter: FilterQuery<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[],
  ): Promise<T | null> {
    let query = this.model.findOne(filter);
    if (populate) query = query.populate(populate as any);
    return await query.exec();
  }
}
