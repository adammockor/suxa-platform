'use client';

import Card from '../profile/Card';
import { Database } from '@/types_db';
import ManageSubscriptionButton from './ManageSubscriptionButton';
import { Session } from '@supabase/supabase-js';
import { getStripe } from '@/utils/stripe-client';
import { postData } from '@/utils/helpers';
import { FormEventHandler, useState } from 'react';
import Button from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/ui/radio-group';
import { Label } from '@/components/ui/ui/label';

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
  const productClenske = products.find((product) => product.name === 'Členské');

  const subscriptionPrice =
    subscription?.prices?.unit_amount &&
    formatStripePrice(
      subscription.prices.unit_amount,
      subscription.prices.currency!
    );

  const endPeriodDate = new Date(subscription?.current_period_end ?? '');
  const endPeriod = endPeriodDate
    .toLocaleDateString('sk-SK')
    .replaceAll(' ', '');

  return (
    <Card
      title={`${subscription ? '✅ ' : ''}Ročný členský príspevok`}
      description={
        subscription ? (
          `Ďakujeme 💙 Ročný členský príspevok máte uhradený do: ${endPeriod}`
        ) : (
          <>
            Členský príspevok ešte nemáš uhradený.
            <br />
            Prispieť môžeš koľko je v tvojich silách.
            <br />
            Minimálna výška príspevku je 5€
          </>
        )
      }
      footer={
        subscription ? <ManageSubscriptionButton session={session} /> : null
      }
    >
      <div className="mt-4">
        {subscription ? <div>{subscriptionPrice}/rok</div> : null}
        <BuySubscription product={productClenske} subscription={subscription} />
      </div>
    </Card>
  );
}

export default CardSubscription;

interface BuySubscriptionForm extends HTMLFormElement {
  price: HTMLInputElement;
}

function BuySubscription({
  product,
  subscription
}: {
  product?: ProductWithPrices | null;
  subscription?: SubscriptionWithProduct | null;
}) {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout: FormEventHandler<BuySubscriptionForm> = async (
    event
  ) => {
    event.preventDefault();

    if (!product?.prices || subscription) {
      return alert('Zaplatenie členského príspevku nie je dostupné');
    }

    const price = product.prices.find(
      (price) => price.id === event.currentTarget.price.value
    );

    if (!price) {
      return alert('Zvolená cena nie je podporovaná');
    }

    setPriceIdLoading(price.id);

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

  if (!product?.prices) {
    return (
      <span className="text-red-600">
        Zaplatenie členského príspevku nie je dostupné
      </span>
    );
  }

  return (
    <form onSubmit={handleCheckout}>
      <RadioGroup
        name="price"
        defaultValue={product.prices[0].id}
        className="grid grid-cols-3 gap-4"
      >
        {product?.prices.map((price, index) => (
          <div key={price.id}>
            <RadioGroupItem
              value={price.id}
              id={price.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={price.id}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-zinc-600"
            >
              {formatStripePrice(price.unit_amount!, price.currency!)}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {[null, undefined, 'unpaid', 'past_due'].includes(
        subscription?.status ?? null
      ) ? (
        <Button
          variant="slim"
          type="submit"
          disabled={false}
          loading={!!priceIdLoading}
          className="block w-full mt-2"
        >
          Zaplatiť členský príspevok
        </Button>
      ) : null}
    </form>
  );
}

function formatStripePrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format((price || 0) / 100);
}