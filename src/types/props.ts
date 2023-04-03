export type GetPropType<T> = T extends (context: any) => Promise<{ props: infer P }> ? P : never;
