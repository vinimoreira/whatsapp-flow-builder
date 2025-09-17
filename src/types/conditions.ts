export enum Comparison {
  HasValue = 1,
  Equals = 2,
  Always = 3,
  Empty = 4,
  NotEquals = 5,
  GreaterThan = 6,
  LessThan = 7,
  Gte = 10, // Greater Than or Equal
  Lte = 11, // Less Than or Equal
}

export type Condition = {
  Source: string;
  Comparison: Comparison;
  Values?: string[];
};

// TODO: i18n
export function summary(cond: Condition): string {
  const { Source, Comparison: comparison, Values } = cond;

  switch (comparison) {
    case Comparison.HasValue:
      return `${Source} possui valor`;
    case Comparison.Equals:
      return `${Source} é igual a ${Values?.join(', ')}`;
    case Comparison.Always:
      return 'Sempre';
    case Comparison.Empty:
      return `${Source} está vazio`;
    case Comparison.NotEquals:
      return `${Source} não é igual a ${Values?.join(', ')}`;
    case Comparison.GreaterThan:
      return `${Source} > ${Values?.[0]}`;
    case Comparison.LessThan:
      return `${Source} < ${Values?.[0]}`;
    case Comparison.Gte:
      return `${Source} >= ${Values?.[0]}`;
    case Comparison.Lte:
      return `${Source} <= ${Values?.[0]}`;
    default: {
      // const _exhaustiveCheck: never = comparison;
      return 'Condição desconhecida';
    }
  }
}

export function conditionsSummary(conditions: Condition[]): string {
  if (!conditions || conditions.length === 0) {
    return '';
  }
  if (conditions.length === 1) {
    return summary(conditions[0]);
  }
  return conditions.map(summary).join(' E ');
}
