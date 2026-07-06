import PaymentForm from './PaymentForm'
import OrderSummary from './OrderSummary'
import { Container } from '@/components'

const page = () => {
  return (
    <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PaymentForm />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
    </Container>
  )
}

export default page