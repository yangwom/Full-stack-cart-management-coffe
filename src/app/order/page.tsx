import { OrderList } from '@/components/OrderList/OrderList';
import { getClient } from '../actions';

export default async function Order() {
	const data = await getClient();
	return <OrderList joinClientAndOrderClient={data!}  />;
}
