export const DEALER = {
  name: 'Trade Wheels',
  tagline: 'Quality Pre-Owned Vehicles in Hillcrest, KZN',
  phone: '083 706 2520',
  phoneLink: 'tel:+27837062520',
  whatsapp: '27837062520',
  whatsappLink: 'https://wa.me/27837062520',
  email: 'info@tradewheels.co.za',
  address: '105 Inanda Road, Hillcrest, Durban, 3650',
  mapsQuery: '105+Inanda+Road+Hillcrest+Durban+3650',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.5!2d30.77!3d-29.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7a9b0a0a0a0a0%3A0x0!2s105+Inanda+Rd%2C+Hillcrest%2C+3610!5e0!3m2!1sen!2sza!4v1700000000000',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '8:00 AM – 1:00 PM' },
    { days: 'Sunday', time: 'Closed' },
    { days: 'Public Holidays', time: '8:00 AM – 1:00 PM' },
  ],
  social: {
    facebook: 'https://www.facebook.com/TradeWheels',
    instagram: 'https://www.instagram.com/tradewheels.co.za',
    youtube: 'https://www.youtube.com/@TradeWheels',
  },
  about: `With over 20 years in the motor industry, Trade Wheels has built a reputation for honesty, transparency, and attention to detail. Based in Hillcrest in the heart of KZN's Upper Highway, we hand-pick every vehicle in our showroom to ensure it meets our rigorous standards. Our friendly, knowledgeable team is passionate about matching you with the perfect car — whether you're after a fuel-efficient daily runner or a spacious family SUV. Experience the Trade Wheels difference: quality vehicles, fair prices, and a seamless buying experience.`,
  siteUrl: 'https://tradewheels.co.za',
} as const;

export const SITE = {
  title: 'Trade Wheels | Quality Used Cars in Hillcrest, KZN',
  description: 'Browse quality pre-owned vehicles at Trade Wheels, Hillcrest. Over 20 years in the motor industry. Finance available, trade-ins welcome.',
  ogImage: '/og-image.jpg',
} as const;
