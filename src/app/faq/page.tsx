import { Metadata } from 'next';
import Image from 'next/image';
import FAQAccordion from '@/components/faq/FAQAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Trade Wheels — vehicle finance, trade-ins, test drives, warranties, and more. Quality used cars in Hillcrest, KZN.',
};

const faqs = [
  {
    category: 'About Trade Wheels',
    items: [
      {
        q: 'Where is Trade Wheels located in Durban?',
        a: 'Trade Wheels is located at 105 Inanda Road, Hillcrest, Durban, 3650, in the Upper Highway area of KwaZulu-Natal. The dealership is conveniently situated in the heart of Hillcrest, near the Cotswold Downs area, making it easily accessible from Pinetown, Kloof, Waterfall, Assagay, and the greater Durban region.',
      },
      {
        q: 'How long has Trade Wheels been in the motor industry?',
        a: 'Trade Wheels has over 20 years of experience in the South African motor industry. The business successfully transitioned from a wholesale operation to a trusted retail car dealership, building a strong reputation for honesty, transparency, and customer satisfaction throughout the Hillcrest and Upper Highway community.',
      },
      {
        q: 'Is Trade Wheels a registered and reputable dealership?',
        a: 'Yes, Trade Wheels is a registered motor dealer with over two decades in the industry. The dealership holds a 4.6-star rating on AutoTrader based on verified customer reviews, and has built a trusted reputation in the Hillcrest, Upper Highway, and greater Durban community for transparent and honest business practices.',
      },
      {
        q: 'What are Trade Wheels\' operating hours?',
        a: 'For the most up-to-date operating hours, it is best to contact Trade Wheels directly on 083 706 2520 or visit the website at tradewheels.co.za. The dealership is generally open Monday to Friday during business hours and Saturday mornings, which is standard for Hillcrest car dealerships.',
      },
      {
        q: 'How do I contact Trade Wheels?',
        a: 'You can reach Trade Wheels by phone on 083 706 2520, or visit the dealership at 105 Inanda Road, Hillcrest, Durban, 3650. You can also browse available stock and make enquiries through the website at tradewheels.co.za. Trade Wheels is active on Facebook, Instagram, and YouTube.',
      },
      {
        q: 'What makes Trade Wheels different from other used car dealers in Hillcrest?',
        a: 'Trade Wheels stands out through its commitment to honesty, transparency, and over 20 years of industry experience. The dealership has earned a strong reputation for presenting immaculately clean, quality vehicles backed by friendly, knowledgeable staff. Customer reviews consistently highlight the exceptional service and personal attention that sets Trade Wheels apart from other dealers in the Upper Highway area.',
      },
      {
        q: 'How do customer reviews rate Trade Wheels?',
        a: 'Trade Wheels is highly rated by customers, holding a 4.6 out of 5-star rating on AutoTrader based on dozens of verified reviews. Customers frequently praise the dealership for its outstanding service, transparent pricing, vehicle quality, and the personal attention provided by the sales team — particularly for going above and beyond to ensure a smooth buying experience.',
      },
    ],
  },
  {
    category: 'Vehicles & Stock',
    items: [
      {
        q: 'What types of vehicles does Trade Wheels sell?',
        a: 'Trade Wheels specialises in quality pre-owned and used vehicles across a wide range of makes and models. The inventory includes popular brands such as Toyota, Volkswagen, BMW, Mercedes-Benz, Hyundai, Audi, Nissan, Ford, Land Rover, Mazda, and Porsche. Stock ranges from compact hatchbacks and sedans to SUVs, bakkies, and luxury vehicles — catering to every budget and lifestyle.',
      },
      {
        q: 'Does Trade Wheels sell bakkies and SUVs?',
        a: 'Yes, Trade Wheels stocks a range of bakkies, SUVs, and crossovers alongside sedans and hatchbacks. Popular models that regularly feature in stock include the Toyota Fortuner, Toyota Land Cruiser Prado, Toyota Hilux, BMW X1, BMW X3, Toyota RAV4, Hyundai Creta, and Nissan Magnite, among others.',
      },
      {
        q: 'What is the price range of vehicles at Trade Wheels?',
        a: 'Trade Wheels carries a diverse inventory with vehicles to suit a wide range of budgets. Prices typically start from under R100,000 for affordable hatchbacks and go up to R500,000+ for premium SUVs and luxury models. Every vehicle is competitively priced and clearly listed on the website and AutoTrader.',
      },
      {
        q: 'Can I browse Trade Wheels\' stock online before visiting?',
        a: 'Yes, Trade Wheels lists its full inventory online at tradewheels.co.za and on platforms like AutoTrader. You can view photos, pricing, mileage, and specifications for every vehicle from the comfort of your home before visiting the Hillcrest showroom.',
      },
      {
        q: 'Are the used cars at Trade Wheels inspected before sale?',
        a: 'Absolutely. Trade Wheels takes attention to detail seriously and prides itself on offering immaculately prepared vehicles that meet rigorous quality standards. Every car undergoes thorough inspection and preparation before being displayed for sale, so you can buy with confidence.',
      },
      {
        q: 'Does Trade Wheels offer any warranty on used cars?',
        a: 'Most quality pre-owned vehicles at Trade Wheels come with warranty options to give you peace of mind after your purchase. The specific warranty terms depend on the vehicle\'s age, mileage, and condition. Ask the sales team about warranty coverage and extended warranty plans when enquiring about a specific vehicle.',
      },
    ],
  },
  {
    category: 'Buying & Finance',
    items: [
      {
        q: 'Can I finance a used car through Trade Wheels?',
        a: 'Yes, Trade Wheels assists customers with vehicle finance applications through major South African banks and finance houses. The team will help you explore affordable monthly instalment options tailored to your budget. Simply visit the dealership or enquire online, and a consultant will guide you through the finance process.',
      },
      {
        q: 'Does Trade Wheels accept trade-ins?',
        a: 'Yes, Trade Wheels accepts trade-ins. If you have a current vehicle you\'d like to trade in against your next purchase, the team will assess your car and offer you a competitive trade-in value. This makes upgrading to a newer vehicle simple and convenient.',
      },
      {
        q: 'Can I test drive a car at Trade Wheels before buying?',
        a: 'Yes, Trade Wheels encourages customers to test drive vehicles before making a purchase decision. Contact the dealership on 083 706 2520 to book a test drive or simply visit the showroom at 105 Inanda Road, Hillcrest, during business hours.',
      },
      {
        q: 'What documents do I need to buy a car from Trade Wheels?',
        a: 'To purchase a vehicle from Trade Wheels, you will typically need your South African ID or valid passport, proof of residence (not older than 3 months), your latest payslip or proof of income (if applying for finance), and three months\' bank statements. The sales team will advise you on any additional requirements based on your specific purchase.',
      },
      {
        q: 'Does Trade Wheels help with vehicle licensing and registration?',
        a: 'Yes, Trade Wheels assists with the administrative side of your purchase, including vehicle registration, licence disc transfers, and related paperwork. The team handles the process to make your car-buying experience as seamless and hassle-free as possible.',
      },
      {
        q: 'Can I buy a car from Trade Wheels if I live outside Durban?',
        a: 'Yes, Trade Wheels serves customers from across KwaZulu-Natal and South Africa. You can browse the full inventory online, make enquiries via phone or the website, and arrange the purchase remotely. The team can assist with delivery logistics and finance applications regardless of your location.',
      },
      {
        q: 'Why should I buy a used car from a dealership like Trade Wheels instead of privately?',
        a: 'Buying from Trade Wheels offers several advantages over a private sale: every vehicle is professionally inspected and prepared, finance assistance is available, trade-ins are accepted, warranty options are offered, and all paperwork including registration and licensing is handled for you. You also have the security of dealing with a registered, reputable business with over 20 years of track record in the Hillcrest area, plus recourse through the Consumer Protection Act and Motor Industry Ombudsman if needed.',
      },
    ],
  },
  {
    category: 'Visiting from Out of Town',
    items: [
      {
        q: 'Is it worth travelling to Hillcrest to buy a car from Trade Wheels?',
        a: 'Absolutely — and we\'d encourage you to make a weekend of it. Hillcrest sits in the heart of the Valley of a Thousand Hills, one of KwaZulu-Natal\'s most beautiful areas, just 20 minutes from central Durban and 30 minutes from the coast. There are charming B&Bs and guesthouses throughout the area, incredible restaurants, and enough to see and do to fill a full weekend. Come view your car on a Friday afternoon, explore the area over the weekend, and drive your new wheels home on Monday. It\'s a car-buying experience you won\'t get at a dealership in an industrial park.',
      },
      {
        q: 'What is there to do near Trade Wheels in Hillcrest if I\'m visiting for the weekend?',
        a: 'Hillcrest and the surrounding Upper Highway area are packed with things to do. Start your Saturday morning at the famous Shongweni Farmers & Craft Market — over 150 stalls of fresh produce, artisan food, crafts, and live music from 7am to 1pm. Explore the Springside Nature Reserve for a peaceful walk through indigenous forest. Visit the 1000 Hills Brewing Company for craft beer, or take the family to Giba Gorge Mountain Bike Park. The Valley of a Thousand Hills scenic route offers breathtaking views, Zulu cultural experiences at Phezulu Safari Park, and the Inchanga Choo Choo steam train from nearby Kloof. And Durban\'s famous Golden Mile beaches are only a 30-minute drive away.',
      },
      {
        q: 'Are there good places to stay near Trade Wheels in Hillcrest?',
        a: 'Hillcrest and the surrounding Valley of a Thousand Hills are home to a wonderful selection of B&Bs, guesthouses, and boutique lodges. Popular options include Branley Lodge, Cybele Lodge Boutique B&B, Warren\'s Guest House, Rest Assured B&B, Valley Lodge, and Sibsons House — all offering warm KZN hospitality, beautiful gardens, and easy access to Trade Wheels on Inanda Road. Many are set in lush, tranquil surroundings that feel a world away from the city, yet you\'re only 20 minutes from Durban. It\'s the perfect excuse to turn your car purchase into a relaxing getaway.',
      },
      {
        q: 'How far is Trade Wheels in Hillcrest from Durban\'s beaches?',
        a: 'Trade Wheels is approximately 30 to 35 minutes from Durban\'s famous beachfront and Golden Mile, depending on traffic. You can easily combine a visit to the dealership with a day at the coast — enjoy the warm Indian Ocean waters, the promenade at uShaka Beach, or seafood on the Umhlanga coastline. Hillcrest\'s cooler, elevated climate (around 700 metres above sea level) also makes it a refreshing change from the coastal humidity, so many visitors enjoy the best of both worlds over a weekend trip.',
      },
      {
        q: 'What is the Shongweni Farmers Market near Trade Wheels?',
        a: 'The Shongweni Farmers & Craft Market is one of KZN\'s most popular Saturday morning markets, located just 10 minutes from Trade Wheels. Running every Saturday from 7am to 1pm, it features over 150 stalls with fresh produce, artisan foods, baked goods, crafts, clothing, and live music. It\'s the perfect way to start your Saturday if you\'re visiting Hillcrest to view a vehicle — grab a coffee, enjoy breakfast at the market, and then head over to Trade Wheels to find your next car.',
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = faqs.flatMap((s) => s.items);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Got Questions?</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Frequently Asked Questions</h1>
          <p className="text-white/50 mt-2 max-w-xl">
            Everything you need to know about buying a quality pre-owned vehicle from Trade Wheels.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {faqs.map((section, idx) => (
          <div key={section.category}>
            <div className="mb-10">
              <h2 className="text-xl font-extrabold text-text-primary mb-4">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((faq) => (
                  <FAQAccordion key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>

            {/* Photos between sections */}
            {idx === 0 && (
              <div className="grid grid-cols-2 gap-3 mb-10 rounded-xl overflow-hidden">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/lot-cars-row.webp" alt="Row of quality vehicles at Trade Wheels" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/desk-workspace.webp" alt="Trade Wheels professional workspace" fill className="object-cover" sizes="50vw" />
                </div>
              </div>
            )}
            {idx === 1 && (
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/audi-mini-lineup.webp" alt="Audi, MINI and BMW at Trade Wheels" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/sports-cars-closeup.webp" alt="Sports cars at Trade Wheels" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/vw-gti-closeup.webp" alt="VW GTI at Trade Wheels" fill className="object-cover" sizes="33vw" />
                </div>
              </div>
            )}
            {idx === 2 && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/lounge-table.webp" alt="Trade Wheels comfortable waiting area" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/dealership/office-art-wall.webp" alt="Trade Wheels office with automotive art" fill className="object-cover" sizes="50vw" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
