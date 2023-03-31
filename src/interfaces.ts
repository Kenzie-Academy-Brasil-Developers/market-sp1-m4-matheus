interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: 'food' | 'cleaning';
    expirationDate: Date;
}
type tProductRequest = Omit<IProduct, 'id'>;

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
    calories: number;
}

export { IProduct, tProductRequest, ICleaningProduct, IFoodProduct };
