'use client';
import Image from 'next/image';

import { Header } from '@/components/Header/header';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useCartState, useCartActions } from '@/context/CartContext';
import { DEFAULT_QUANTITY } from '@/constants';
import mais from '@/assets/+.svg';
import menos from '@/assets/-.svg';
import deleted from '@/assets/deleted.svg';
import styles from './OrderList.module.css';
import { useState } from 'react';
import { joinClientAndOrderClient} from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteClient, deleteOrders } from '@/services/Product/deleteClienteAndOrders';
import React from 'react';

type TProps = {
  joinClientAndOrderClient : joinClientAndOrderClient[]
}

export const OrderList:React.FC<TProps> = ({joinClientAndOrderClient}) => {
	const { cart } = useCartState();
	const [client, setClient] = useState<joinClientAndOrderClient[] | undefined>(joinClientAndOrderClient);
	const { deleteCartItem, addToCart, removeFromCart } = useCartActions();

	const handleDeleteButtonClick = async (client:number, orderId: number) => {
		setClient(state => state?.filter(cli => cli.id != client));
		await deleteOrders(orderId);
		await deleteClient(client); 
	};

	return (
		<main>
			<Header />
			<section className={styles.cartContainer}>
				<header className={styles.Cartheader}>
					<h3>Todos os pedidos</h3>
				</header>
				<table className={styles.listItensOfTable}>
					<thead>
						<tr>
							<th className={styles.rowsStyle}>Nome</th>
							<th className={styles.rowsStyle}>Valor</th>
							<th className={styles.rowsStyle}>Status</th>
							<th className={styles.rowsStyle}>Método de pagamento</th>
							<th className={styles.rowsStyle}>Ações</th>
						</tr>
					</thead>
					<tbody>
            
						{
							client && client.map((cli) => (
								<tr key={cli.id}>
									<td className={styles.rowsStyle}>{cli.name}</td>
                
									{cli.orders.map(or => (
                
										<React.Fragment key={or.id}>
											<td className={styles.rowsStyle}>{or.status}</td><td className={styles.rowsStyle}>{or.total_value}</td><td className={styles.rowsStyle}>{or.payment_method}</td><td className={`${styles.rowsStyle} ${styles.actions}`}>
												<FontAwesomeIcon icon={faCircleCheck} className={styles.check} />
												<FontAwesomeIcon
													icon={faTrash}
													className={styles.bin}
													onClick={() => handleDeleteButtonClick(cli.id, or.id)} />


											</td>
										</React.Fragment>
              
									))}
								</tr>
							))
						} 
					</tbody>
				</table>
				{cart.map((productCart) => (
					<div className={styles.productSelected} key={productCart.id}>
						<Image
							src={productCart.image_default?.img as StaticImport}
							alt=""
						/>
						<div className={styles.productDetails}>
							<p>{productCart.product_name}</p>
							<div className={styles.quantityCartProduct}>
								<button onClick={() => addToCart(productCart, DEFAULT_QUANTITY)}>
									{' '}
									<Image className={styles.imageQuantity} src={mais} alt={''} />
								</button>
								<strong>{productCart.quantity}</strong>
								<button onClick={() => removeFromCart(productCart.id)}>
									<Image className={styles.imageQuantity} src={menos} alt={''} />
								</button>

								<button
									onClick={() => deleteCartItem(productCart.id)}
									className={styles.buttonDelete}
								>
									<Image className={styles.imageDelete} src={deleted} alt={''} />
									<p>REMOVER</p>
								</button>
							</div>
						</div>
            
						<strong>
							{' '}
							{`R$ ${(
								Math.round(
									productCart.product_price * productCart.quantity * 100
								) / 100
							).toFixed(2)}`}
						</strong>
					</div>
				))}
			</section>
		</main>
	);
};
