import { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';
import { ContactInfo } from './_components/contact-info';

export const metadata: Metadata = {
  title: 'Contact Calobite | Get in Touch for Support & Inquiries',
  description: 'Have a question or feedback? Contact the Calobite team. We&apos;re here to help with support, partnership inquiries, and more. Reach out via our contact form or email.',
  openGraph: {
    title: 'Contact Calobite | We&apos;d Love to Hear From You',
    description: 'Get in touch with the Calobite team for support, feedback, or inquiries.',
    url: 'https://www.calobite.com/contact',
    type: 'website',
    images: [
      {
        url: 'https://www.calobite.com/images/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Calobite Support and Inquiry Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Calobite | Support & Inquiries',
    description: 'Reach out to the Calobite team. We are ready to assist you.',
    images: ['https://www.calobite.com/images/contact-twitter-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Contact Us</h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          We&apos;re here to help. Whether you have a question, a suggestion, or a partnership inquiry, we&apos;d love to hear from you.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
