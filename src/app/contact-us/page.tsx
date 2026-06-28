import { fetchLayout } from '@/services/layoutApi';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage() {
  const layout = await fetchLayout();
  const s = layout?.settings ?? {};

  return (
    <ContactPageClient
      phone={s.CONTACT_PHONE_NO ?? '+91 98480 32919'}
      whatsapp={s.CONTACT_WHATSAPP_NO ?? '+91 98480 32919'}
      email={s.CONTACT_EMAIL ?? 'support@scalexlearning.com'}
      address={s.CONTACT_ADDRESS ?? 'Koramangala, Bengaluru 560034'}
      addressState={s.CONTACT_ADDRESS_STATE ?? 'Karnataka'}
      addressCountry={s.CONTACT_ADDRESS_COUNTRY ?? 'India'}
      addressPincode={s.CONTACT_ADDRESS_PINCODE ?? ''}
    />
  );
}
