export type Enum<TEnumValues extends object> = Readonly<TEnumValues[keyof TEnumValues]>;
