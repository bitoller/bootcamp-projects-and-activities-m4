export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

export interface ICleaningProduct extends IProduct {}

export type TCleaningProduct = Omit<ICleaningProduct, "id" | "expirationDate">;

export interface IFoodProduct extends IProduct {
  calories: number;
}

export type TFoodProduct = Omit<IFoodProduct, "id" | "expirationDate">;

export interface ITotal {
  total: number;
  marketProducts: (IFoodProduct | ICleaningProduct)[];
}
