import { IDefaultImage, IApiProduct, IProduct } from "@/types";
import { images } from "@/mock/dataCoffeImgs";

export const useProductTransform = (product: IApiProduct[]): IProduct[] => {
  const dataImages = images.map((img, index) => {
    return {
      id: index + 1,
      img,
    };
  });

  return product?.map((product) => ({
    ...product,
    quantity: 1,
    image_default: dataImages.find(
      (img) => img.id === product.id
    ) as IDefaultImage,
  }));
};
