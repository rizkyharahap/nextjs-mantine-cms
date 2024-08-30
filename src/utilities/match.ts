/**
 * PHP like match function
 * @param conditions - Array of [condition, value]
 */
export function match<T>(...conditions: Array<[boolean, T]>) {
  const foundedCondition =
    conditions.find(([condition]) => condition) ?? conditions.at(-1);

  if (!foundedCondition) throw new Error("No conditions have been met");

  return foundedCondition[1];
}
