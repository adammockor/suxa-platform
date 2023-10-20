'use client';

import Card from '../profile/Card';
import { Database } from '@/types_db';
import ManageSubscriptionButton from './ManageSubscriptionButton';
import { Session } from '@supabase/supabase-js';
import { getStripe } from '@/utils/stripe-client';
import { postData } from '@/utils/helpers';
import { useState } from 'react';
import Button from '@/components/ui/Button';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

function CardSubscription({
  subscription,
  products,
  session
}: {
  subscription: SubscriptionWithProduct | null;
  session: Session | null;
  products: ProductWithPrices[];
}) {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (subscription) {
      return;
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const price = products[0].prices[0];
  const productPrice =
    price &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency!,
      minimumFractionDigits: 0
    }).format((price.unit_amount || 0) / 100);

  const endPeriodDate = new Date(subscription?.current_period_end ?? '');
  const endPeriod = endPeriodDate
    .toLocaleDateString('sk-SK')
    .replaceAll(' ', '');

  return (
    <Card
      title={`${subscription ? '✅ ' : ''}Ročný členský príspevok`}
      description={
        subscription
          ? `Ďakujeme 💙 Ročný členský príspevok máte uhradený do: ${endPeriod}`
          : 'Momentálne nemáte uhradený členský príspevok. (zalomit!) Zvážte, aký veľký príspevok je vo vašich silách. Minimálny je 5€.'
      }
      // footer={<ManageSubscriptionButton session={session} />}
    >
      <div className="mt-4 mb-2 text-xl font-semibold">
        {subscription ? `${subscriptionPrice}/rok` : `${productPrice}/rok`}
      </div>
      {[null, undefined, 'unpaid', 'past_due'].includes(
        subscription?.status ?? null
      ) ? (
        <Button
          variant="slim"
          type="button"
          disabled={false}
          loading={priceIdLoading === price.id}
          onClick={() => handleCheckout(price)}
          className="block w-full mt-2"
        >
          Zaplatiť členský príspevok
        </Button>
      ) : null}
    </Card>
  );
}

export default CardSubscription;
