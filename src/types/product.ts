import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { StaticImageData } from "next/image"

export type IDefaultImage = {
    id: number,
    img: StaticImport,
}

export type IApiProduct = {
    id: number,
    created_at: string,
    product_name: string,
    categoria: string,
    description: string,
    product_price: number,
    image: string
}
export type OrderItems = {
    id: number, 
    product_id: number, 
    order_id: number, 
    quantity: number, 
    price_unit: number
}

export type IOrder = {
    id:number,
    orders_items: OrderItems[]
    total_value:number,
    payment_method:string,
    client_id:number,
    status:string,
}

export type joinClientAndOrderClient = {
    id: number,
    name: string,
    orders: IOrder[]
}

export type IApiClient = {
    payment_method: string
    status: string
    total_value: string
    orders: IOrder[]
    id: number,
    name: string
}


export type IProduct = {
    id: number,
    created_at: string,
    product_name: string,
    categoria: string,
    quantity: number,
    description: string,
    product_price: number,
    image: string
    image_default?: IDefaultImage
}