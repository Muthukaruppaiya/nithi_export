export const GRADES = [
  {
    id: '8mm',
    name: 'Green Cardamom 8 mm',
    size: '8 mm',
    sizeMm: 8,
    badge: 'Bold',
    summary:
      'Our boldest grade. Large, plump, evenly green pods for premium retail packs, gifting and buyers who want the best appearance on the shelf.',
    uses: ['Premium retail packs', 'Gift and festive packs', 'High-end wholesale'],
    image: '/images/cardamom-pods-bowl',
  },
  {
    id: '7-8mm',
    name: 'Green Cardamom 7 to 8 mm',
    size: '7 to 8 mm',
    sizeMm: 7.5,
    badge: 'Most ordered',
    summary:
      'The everyday export grade for importers and wholesalers. Good size and colour at a balanced price, suited to repacking and steady trade.',
    uses: ['Wholesale and distribution', 'Spice packers', 'Hotel and food service'],
    image: '/images/cardamom-close-up',
  },
  {
    id: '6-7mm',
    name: 'Green Cardamom 6 to 7 mm',
    size: '6 to 7 mm',
    sizeMm: 6.5,
    badge: 'Value',
    summary:
      'A value grade with full aroma for grinding, blending and food processing, where pod size matters less than flavour and price.',
    uses: ['Grinding and powders', 'Masala and tea blends', 'Food processing'],
    image: '/images/cardamom-hundred-pods',
  },
]

export const PACKING = [
  {
    title: '10 kg cartons',
    detail: 'Corrugated export cartons with a food-grade inner liner. Clean and easy to stack.',
  },
  {
    title: '25 kg PP bags',
    detail: 'Woven polypropylene bags with a food-grade liner, for wholesale buyers.',
  },
  {
    title: '50 kg PP bags',
    detail: 'Large woven PP bags with a food-grade liner, for bulk and full-container orders.',
  },
]

export const QUALITY_STEPS = [
  {
    title: 'Sample-approved sourcing',
    text: 'We buy graded lots from trusted growers and dealers in Idukki. A sample is approved before any bag is bought.',
  },
  {
    title: 'Checked on arrival',
    text: 'Every lot is checked by sieve for size, by moisture meter, and by eye for colour, foreign matter and split pods.',
  },
  {
    title: 'Pesticide residue tested',
    text: 'Each export lot is tested for pesticide residue at an accredited laboratory. The report is shared with you.',
  },
  {
    title: 'Photo and video proof',
    text: 'We photograph and video each lot, the weighing and the loading, and send them to you before shipping.',
  },
  {
    title: 'Sealed reference sample',
    text: 'We keep a sealed 200 g sample of every lot for 6 months, so any question can be checked against the original.',
  },
]

export const DOCUMENTS = [
  'Commercial invoice',
  'Packing list',
  'Bill of lading',
  'Certificate of origin',
  'Phytosanitary certificate',
  'Fumigation certificate',
  'Pesticide residue lab report',
  'Spices Board certificate (where required)',
]

export const TERMS = [
  { label: 'Incoterms', value: 'FOB or CIF to your port' },
  {
    label: 'Payment',
    value:
      'New buyers: advance telegraphic transfer (TT), irrevocable LC at sight, or a split payment agreed in writing before shipping. Terms for repeat buyers by agreement.',
  },
  { label: 'Lead time', value: 'About 7 days from advance payment to shipment' },
  { label: 'Order size', value: 'Trial orders from 1 to 2 ton. A full 20ft container carries about 12 to 14 ton.' },
  { label: 'Pricing', value: 'Quoted weekly. Each quote is valid for 3 to 5 days.' },
]

export const ORDER_STEPS = [
  { title: 'Send your enquiry', text: 'Tell us your company name, country, grade, quantity and port.' },
  {
    title: 'Get quote and sample',
    text: 'We send the specification sheet, a price quote and, on request, a free 200 g sample.',
  },
  { title: 'Approve and confirm', text: 'You approve the sample and we issue a proforma invoice.' },
  { title: 'Source, check and pack', text: 'You pay the advance; we source, check, pack and photograph your lot.' },
  { title: 'Ship and release documents', text: 'We ship, send the documents and release them against the agreed payment.' },
  { title: 'Feedback and next order', text: 'After delivery we ask for your feedback and plan your next order.' },
]

export const LICENCES = [
  { label: 'Spices Board registration', value: 'CRES/SBCB/29621/2026-2027' },
  { label: 'Import Export Code (IEC)', value: 'DEIPN2997L' },
  { label: 'GST registration', value: '33DEIPN2997L1ZT' },
  { label: 'FSSAI licence', value: '12426997000518' },
]

export const STATS = [
  { value: '3', label: 'Export grades' },
  { value: '~7', label: 'Days from advance to shipment' },
  { value: '1–2 t', label: 'Trial order size' },
  { value: '12–14 t', label: 'Per 20ft container' },
]

export const MARKETS = [
  { country: 'United Arab Emirates', port: 'Jebel Ali', label: 'Jebel Ali, UAE', side: 'bottom', lat: 25.01, lon: 55.06 },
  { country: 'Saudi Arabia', port: 'Jeddah', label: 'Jeddah, KSA', side: 'left', lat: 21.49, lon: 39.19 },
  { country: 'Saudi Arabia', port: 'Dammam', label: 'Dammam, KSA', side: 'top', lat: 26.43, lon: 50.1 },
  { country: 'Bangladesh', port: 'Chattogram', label: 'Chattogram, Bangladesh', side: 'right', lat: 22.33, lon: 91.81 },
]

export const ORIGIN = { name: 'Kambam, India', side: 'bottom', lat: 9.73, lon: 77.28 }

export const FAQS = [
  {
    q: 'Which cardamom grades do you export?',
    a: 'We export green cardamom from Idukki in three sizes: 8 mm, 7 to 8 mm, and 6 to 7 mm.',
  },
  {
    q: 'What is your minimum order quantity?',
    a: 'Trial orders start from 1 to 2 ton. A full 20ft container carries about 12 to 14 ton.',
  },
  {
    q: 'Can I get a sample before ordering?',
    a: 'Yes. On request we send a free 200 g sample along with the specification sheet and a price quote.',
  },
  {
    q: 'What payment terms do you accept?',
    a: 'New buyers can pay by advance telegraphic transfer, irrevocable LC at sight, or a split payment agreed in writing before shipping. Terms for repeat buyers are by agreement.',
  },
  {
    q: 'How long does it take to ship?',
    a: 'About 7 days from receipt of the advance payment to shipment.',
  },
  {
    q: 'Do you ship FOB or CIF?',
    a: 'Both. We quote FOB or CIF to your port.',
  },
  {
    q: 'Is the cardamom tested for pesticide residue?',
    a: 'Yes. Each export lot is tested at an accredited laboratory and the report is shared with the buyer.',
  },
  {
    q: 'How long is a price quote valid?',
    a: 'Prices are quoted weekly and each quote is valid for 3 to 5 days.',
  },
]
