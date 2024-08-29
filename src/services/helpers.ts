/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { useState } from "react";

import { isAxiosError } from "axios";
import { z } from "zod";

import {
  type QueryClient,
  type UndefinedInitialDataOptions,
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";

import { client } from "./axios";

/* eslint-disable @typescript-eslint/no-empty-object-type */

interface EnhancedMutationParams<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> extends Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "onSuccess" | "onError" | "onSettled"
  > {
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext,
    queryClient: QueryClient,
  ) => unknown;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
    queryClient: QueryClient,
  ) => unknown;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
    queryClient: QueryClient,
  ) => unknown;
}

/**
 * Create a URL with query parameters and route parameters
 *
 * @param base - The base URL with route parameters
 * @param queryParams - The query parameters
 * @param routeParams - The route parameters
 * @returns The URL with query parameters
 * @example
 * createUrl('/api/users/:id', { page: 1 }, { id: 1 });
 * // => '/api/users/1?page=1'
 */
function createUrl(
  base: string,
  queryParams?: Record<string, string | number>,
  routeParams?: Record<string, string | number>,
) {
  const url = Object.entries(routeParams ?? {}).reduce(
    (acc, [key, value]) => acc.replaceAll(`:${key}`, String(value)),
    base,
  );

  if (!queryParams) return url;

  const query = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.append(key, String(value));
  });

  return `${url}?${query.toString()}`;
}

/** Handle request errors */
function handleRequestError(error: unknown) {
  if (isAxiosError(error)) {
    throw error.response?.data;
  }

  throw error;
}

/* ----------------------------------- GET ---------------------------------- */

interface CreateGetQueryHookArgs<ResponseSchema extends z.ZodType> {
  /** The endpoint for the GET request */
  endpoint: string;
  /** The Zod schema for the response data */
  responseSchema: ResponseSchema;
  /** The query parameters for the react-query hook */
  rQueryParams: Omit<UndefinedInitialDataOptions, "queryFn" | "queryKey"> & {
    queryKey: string | string[];
  };
}

/**
 * Create a custom hook for performing GET requests with react-query and Zod validation
 *
 * @example
 * const useGetUser = createGetQueryHook<typeof userSchema, { id: string }>({
 *   endpoint: '/api/users/:id',
 *   responseSchema: userSchema,
 *   rQueryParams: { queryKey: 'getUser' },
 * });
 *
 * const { data, error } = useGetUser({ route: { id: 1 } });
 */
export function createGetQueryHook<
  ResponseSchema extends z.ZodType,
  RouteParams extends Record<string, string | number> = {},
  QueryParams extends Record<string, string | number> = {},
>({
  endpoint,
  responseSchema,
  rQueryParams,
}: CreateGetQueryHookArgs<ResponseSchema>) {
  const queryFn = async (params?: {
    query?: QueryParams;
    route?: RouteParams;
  }) => {
    const url = createUrl(endpoint, params?.query, params?.route);
    return client
      .get(url)
      .then((response) => responseSchema.parse(response.data))
      .catch(handleRequestError);
  };

  return (params?: { query?: QueryParams; route?: RouteParams }) =>
    useQuery({
      ...rQueryParams,
      queryKey: [
        ...[rQueryParams.queryKey].flat(),
        ...Object.values(params?.query ?? {}).map(String),
        ...Object.values(params?.route ?? {}).map(String),
      ],
      queryFn: () => queryFn(params),
    }) as UseQueryResult<z.infer<ResponseSchema>>;
}

/* ---------------------------------- POST ---------------------------------- */

interface CreatePostMutationHookArgs<
  BodySchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
> {
  /** The endpoint for the POST request */
  endpoint: string;
  /** The Zod schema for the request body */
  bodySchema: BodySchema;
  /** The Zod schema for the response data */
  responseSchema: ResponseSchema;
  /** The mutation parameters for the react-query hook */
  rMutationParams?: EnhancedMutationParams<
    z.infer<ResponseSchema>,
    Error,
    z.infer<BodySchema>
  >;
}

/**
 * Create a custom hook for performing POST requests with react-query and Zod validation
 *
 * @example
 * const useCreateUser = createPostMutationHook({
 *  endpoint: '/api/users',
 *  bodySchema: createUserSchema,
 *  responseSchema: userSchema,
 *  rMutationParams: { onSuccess: () => queryClient.invalidateQueries('getUsers') },
 * });
 */
export function createPostMutationHook<
  BodySchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
  RouteParams extends Record<string, string | number> = {},
  QueryParams extends Record<string, string | number> = {},
>({
  endpoint,
  bodySchema,
  responseSchema,
  rMutationParams,
}: CreatePostMutationHookArgs<BodySchema, ResponseSchema>) {
  return (params?: { query?: QueryParams; route?: RouteParams }) => {
    const queryClient = useQueryClient();
    const baseUrl = createUrl(endpoint, params?.query, params?.route);

    const mutationFn = async ({
      variables,
      route,
      query,
    }: {
      variables: z.infer<BodySchema>;
      query?: QueryParams;
      route?: RouteParams;
    }) => {
      const url = createUrl(baseUrl, query, route);
      return client
        .post(url, bodySchema.parse(variables))
        .then((response) => responseSchema.parse(response.data))
        .catch(handleRequestError);
    };

    return useMutation({
      ...rMutationParams,
      mutationFn,
      onSuccess: (data, variables, context) =>
        rMutationParams?.onSuccess?.(data, variables, context, queryClient),
      onError: (error, variables, context) =>
        rMutationParams?.onError?.(error, variables, context, queryClient),
      onSettled: (data, error, variables, context) =>
        rMutationParams?.onSettled?.(
          data,
          error,
          variables,
          context,
          queryClient,
        ),
    });
  };
}

/* ----------------------------------- PUT ---------------------------------- */

interface CreatePutMutationHookArgs<
  BodySchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
> {
  /** The endpoint for the PUT request */
  endpoint: string;
  /** The Zod schema for the request body */
  bodySchema: BodySchema;
  /** The Zod schema for the response data */
  responseSchema: ResponseSchema;
  /** The mutation parameters for the react-query hook */
  rMutationParams?: EnhancedMutationParams<
    z.infer<ResponseSchema>,
    Error,
    z.infer<BodySchema>
  >;
}

/**
 * Create a custom hook for performing PUT requests with react-query and Zod validation
 *
 * @example
 * const useUpdateUser = createPutMutationHook<typeof updateUserSchema, typeof userSchema, { id: string }>({
 *  endpoint: '/api/users/:id',
 *  bodySchema: updateUserSchema,
 *  responseSchema: userSchema,
 *  rMutationParams: { onSuccess: () => queryClient.invalidateQueries('getUsers') },
 * });
 */
export function createPutMutationHook<
  BodySchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
  RouteParams extends Record<string, string | number> = {},
  QueryParams extends Record<string, string | number> = {},
>({
  endpoint,
  bodySchema,
  responseSchema,
  rMutationParams,
}: CreatePutMutationHookArgs<BodySchema, ResponseSchema>) {
  return (params?: { query?: QueryParams; route?: RouteParams }) => {
    const queryClient = useQueryClient();
    const baseUrl = createUrl(endpoint, params?.query, params?.route);
    const mutationFn = async ({
      variables,
      route,
      query,
    }: {
      variables: z.infer<BodySchema>;
      query?: QueryParams;
      route?: RouteParams;
    }) => {
      const url = createUrl(baseUrl, query, route);
      return client
        .put(url, bodySchema.parse(variables))
        .then((response) => responseSchema.parse(response.data))
        .catch(handleRequestError);
    };

    return useMutation({
      ...rMutationParams,
      mutationFn,
      onSuccess: (data, variables, context) =>
        rMutationParams?.onSuccess?.(data, variables, context, queryClient),
      onError: (error, variables, context) =>
        rMutationParams?.onError?.(error, variables, context, queryClient),
      onSettled: (data, error, variables, context) =>
        rMutationParams?.onSettled?.(
          data,
          error,
          variables,
          context,
          queryClient,
        ),
    });
  };
}

/* --------------------------------- DELETE --------------------------------- */

interface CreateDeleteMutationHookArgs<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> {
  /** The endpoint for the DELETE request */
  endpoint: string;
  /** The mutation parameters for the react-query hook */
  rMutationParams?: EnhancedMutationParams<TData, TError, TVariables, TContext>;
}

/**
 * Create a custom hook for performing DELETE requests with react-query
 *
 * @example
 * const useDeleteUser = createDeleteMutationHook<typeof userSchema, { id: string }>({
 *  endpoint: '/api/users/:id',
 *  rMutationParams: { onSuccess: () => queryClient.invalidateQueries('getUsers') },
 * });
 */
export function createDeleteMutationHook<
  ModelSchema extends z.ZodType,
  RouteParams extends Record<string, string | number> = {},
  QueryParams extends Record<string, string | number> = {},
>({
  endpoint,
  rMutationParams,
}: CreateDeleteMutationHookArgs<
  z.infer<ModelSchema>,
  Error,
  z.infer<ModelSchema>
>) {
  return (params?: { query?: QueryParams; route?: RouteParams }) => {
    const queryClient = useQueryClient();
    const baseUrl = createUrl(endpoint, params?.query, params?.route);

    const mutationFn = async ({
      model,
      route,
      query,
    }: {
      model: z.infer<ModelSchema>;
      query?: QueryParams;
      route?: RouteParams;
    }) => {
      const url = createUrl(baseUrl, query, route);
      return client
        .delete(url)
        .then(() => model)
        .catch(handleRequestError);
    };

    return useMutation({
      ...rMutationParams,
      mutationFn,
      onSuccess: (data, variables, context) =>
        rMutationParams?.onSuccess?.(data, variables, context, queryClient),
      onError: (error, variables, context) =>
        rMutationParams?.onError?.(error, variables, context, queryClient),
      onSettled: (data, error, variables, context) =>
        rMutationParams?.onSettled?.(
          data,
          error,
          variables,
          context,
          queryClient,
        ),
    });
  };
}

/* ------------------------------- PAGINATION ------------------------------- */

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export function usePagination(params?: PaginationParams) {
  const [page, setPage] = useState(params?.page ?? 1);
  const [limit, setLimit] = useState(params?.limit ?? 15);

  return { page, limit, setPage, setLimit };
}

export const PaginationMetaSchema = z.object({
  total: z.number().int().positive(),
  perPage: z.number().int().positive(),
  currentPage: z.number().int().positive().nullable(),
  lastPage: z.number().int().positive(),
  firstPage: z.number().int().positive(),
  firstPageUrl: z.string(),
  lastPageUrl: z.string(),
  nextPageUrl: z.string().nullable(),
  previousPageUrl: z.string().nullable(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

interface CreatePaginationQueryHookArgs<DataSchema extends z.ZodType> {
  /** The endpoint for the GET request */
  endpoint: string;
  /** The Zod schema for the data attribute in response */
  dataSchema: DataSchema;
  /** The query parameters for the react-query hook */
  rQueryParams: Omit<UndefinedInitialDataOptions, "queryFn" | "queryKey"> & {
    queryKey: string | string[];
  };
}

/**
 * Create a custom hook for performing paginated GET requests with react-query and Zod validation
 *
 * @example
 * const useGetUsers = createPaginatedQueryHook<typeof userSchema>({
 *  endpoint: '/api/users',
 *  dataSchema: userSchema,
 *  queryParams: { queryKey: 'getUsers' },
 * });
 */
export function createPaginationQueryHook<
  DataSchema extends z.ZodType,
  QueryParams extends Record<string, string | number> = {},
  RouteParams extends Record<string, string | number> = {},
>({
  endpoint,
  dataSchema,
  rQueryParams,
}: CreatePaginationQueryHookArgs<DataSchema>) {
  const queryFn = async (params: {
    query?: QueryParams & PaginationParams;
    route?: RouteParams;
  }) => {
    const url = createUrl(endpoint, params?.query, params?.route);

    const schema = z.object({
      data: z.array(dataSchema),
      meta: PaginationMetaSchema,
    });

    return client
      .get(url)
      .then((response) => schema.parse(response.data))
      .catch(handleRequestError);
  };

  return (params?: {
    query: QueryParams & PaginationParams;
    route?: RouteParams;
  }) => {
    const query = {
      page: 1,
      limit: 25,
      ...params?.query,
    } as unknown as QueryParams;
    const route = params?.route ?? ({} as RouteParams);

    return useQuery({
      ...rQueryParams,
      queryKey: [
        ...[rQueryParams.queryKey].flat(),
        ...Object.values(query).map(String),
        ...Object.values(route).map(String),
      ],
      queryFn: () => queryFn({ query, route }),
    }) as UseQueryResult<{ meta: PaginationMeta; data: z.infer<DataSchema>[] }>;
  };
}
