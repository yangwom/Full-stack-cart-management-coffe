import supabase from '@/supabase';
import { IApiClient, IOrder, joinClientAndOrderClient } from '@/types';

type IGetClient = () => Promise<(IApiClient & IOrder)[] | undefined>;

export const getClient = async () => {
	try {
		const { data, error } = await supabase
			.from('clientes')
			.select(`
      id,
      name,
      orders (
        id,
        total_value,
        payment_method,
        client_id,
        status,
        orders_items (
          id,
          product_id,
          order_id,
          quantity,
          price_unit
        )
      )
    `);
		console.log(data);
		return data as joinClientAndOrderClient[];
	} catch (e) {
		console.error(e);
	}
};

export const getOrderItems = async () => {
	try {
		const { data, error } = await supabase
			.from('orders_items').select('*');
		if (error) {
			throw error;
		}
		return data;
	} catch (e) {
		console.error(e);
	}
};

export const deleteOrderItems = async (orderItemId: number) => {
	try {
		const { error } = await supabase
			.from('orders_items')
			.delete()
			.eq('id', orderItemId);

		if (error) {
			throw error;
		}

	} catch (e) {
		console.error(e);
	}
};
