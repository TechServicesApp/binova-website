export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Subsidiaries', href: '/subsidiaries' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
] as const

export const STATS = [
  { value: 15, suffix: '+', label: 'Sectors of Activity' },
  { value: 2, suffix: '', label: 'Country Offices' },
  { value: 50, suffix: '+', label: 'Qualified Experts' },
  { value: null, symbol: '\u221E', label: 'Ambition' },
] as const

export const SERVICES = [
  {
    step: '01',
    title: 'Feasibility Studies',
    description: 'Market Study, Technical Study, Financial Study. Desk and field work for a well-thought techno-commercial decision.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Design & Execution',
    description: 'From concept to commissioning. Best-in-class engineering with sustainability goals at every stage.',
    icon: 'compass',
  },
  {
    step: '03',
    title: 'Furniture & Supply',
    description: "Best quality furniture and equipment sourced from the world's most reliable brands.",
    icon: 'package',
  },
  {
    step: '04',
    title: 'Project Management',
    description: 'Knowledge, tools and techniques to complete activities with efficacy and efficiency.',
    icon: 'gantt',
  },
] as const

export const PHILOSOPHY_PILLARS = [
  {
    icon: 'globe',
    title: 'VISION',
    description: 'Become a World Leading Conglomerate bridging continents and creating lasting value.',
  },
  {
    icon: 'lightbulb',
    title: 'INNOVATION',
    description: 'Smart and State-of-the-art industries that redefine standards across every sector.',
  },
  {
    icon: 'leaf',
    title: 'SUSTAINABILITY',
    description: 'Solutions for basic and high-standard development needs with minimal environmental footprint.',
  },
] as const

export const SOCIAL_CARDS = [
  {
    icon: 'leaf',
    title: 'ECO-FRIENDLY',
    description: 'All our projects and services respect nature and promote environmental preservation.',
  },
  {
    icon: 'users',
    title: 'COMMUNITY IMPACT',
    description: 'Empowering lives and communities through inclusive development and opportunity.',
  },
  {
    icon: 'check-circle',
    title: 'BEYOND COMPLIANCE',
    description: 'Driven by a desire to contribute meaningfully, not just meet minimum standards.',
  },
] as const

export const SECTORS = [
  { name: 'Banking & Finance', icon: 'landmark', size: 'large' },
  { name: 'Mining & Resources', icon: 'mountain', size: 'tall' },
  { name: 'Public Works & Real Estate', icon: 'building-2', size: 'wide' },
  { name: 'Agriculture', icon: 'wheat', size: 'small' },
  { name: 'Food & Beverage', icon: 'utensils', size: 'small' },
  { name: 'Electronics', icon: 'cpu', size: 'small' },
  { name: 'Energy Industry', icon: 'zap', size: 'small' },
  { name: 'Health & Sciences', icon: 'heart-pulse', size: 'wide' },
  { name: 'Education & Training', icon: 'graduation-cap', size: 'wide' },
  { name: 'Telecom & Media', icon: 'radio', size: 'small' },
  { name: 'Logistic & Transportation', icon: 'truck', size: 'small' },
  { name: 'Textile Industry', icon: 'shirt', size: 'small' },
  { name: 'Supermarkets', icon: 'shopping-cart', size: 'small' },
  { name: 'Automotive', icon: 'car', size: 'small' },
] as const

export const TEAM_MEMBERS = [
  { firstName: 'Rev. Fabien', lastName: 'SADJOUGUET', position: 'President and Cofounder, Head of Health and Sciences Department', department: 'Executive', image: '/teams/membre4.png', announced: true },
  { firstName: 'Ferdinand', lastName: 'TEMGWA', position: 'Head of Energy Department', department: 'Energy', image: '/teams/membre2.png', announced: true },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Mining Department', department: 'Mining', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Public Work & Real Estate  Department', department: 'Operations', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Marketing and Strategy Department', department: 'Marketing', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Education and Training Department', department: 'Strategy', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Textile, Plastic and Paper Department', department: 'Operations', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Banking and Finance Department', department: 'Finance', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Audit and Accounting Department', department: 'Finance', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Foods and Beverages Department', department: 'Operations', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Automotive and Aerospace Department', department: 'Engineering', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Human Resources Department', department: 'Operations', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Electronics Department', department: 'Technology', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Telecom and Media Department', department: 'Communications', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Agriculture and Livestock Department', department: 'Agriculture', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Logistics and Transportation Department', department: 'Operations', image: undefined, announced: false },
  { firstName: '◆', lastName: 'Incoming', position: 'Head of Supermarkets and Stores', department: 'Operations', image: undefined, announced: false },
  { firstName: 'Romaric', lastName: 'TENDA', position: 'Press Relations and Media Partnership Consultant (CEO of G&J Media)', department: 'Communications', image: '/teams/membre3.png', announced: true },
  { firstName: 'Rev. Ghislain', lastName: 'FONGANG', position: 'Civil and Architect Engineer (CEO of Mimschack Building Company)', department: 'Engineering', image: '/teams/membre1.png', announced: true },
  { firstName: 'Pradip ', lastName: 'BHALERAO ', position: 'CEO of Pharmadeep Turnkey Consultants & Engineers Pvt. Ltd', department: 'Health', image: undefined, announced: true },
] as const

export const OFFICES = [
  {
    country: 'Canada',
    flag: 'CA',
    city: 'Vancouver, British Columbia, Canada',
    email: 'contact@binova-holding.ca',
    phone: '+1(778)381-1325',
  },
  {
    country: 'Cameroon',
    flag: 'CM',
    city: "Bel'air Road, Kribi, Southern Cameroon.",
    email: 'contact@binova-holding.ca',
    phone: '(237)677151188',
  },
] as const

export const CAREERS_OPENINGS = [
  { title: 'Senior Project Manager', department: 'Operations', location: 'Toronto, CA', type: 'Full-time' },
  { title: 'Financial Analyst', department: 'Finance', location: 'Toronto, CA', type: 'Full-time' },
  { title: 'Mining Engineer', department: 'Engineering', location: 'Douala, CM', type: 'Full-time' },
  { title: 'Agricultural Consultant', department: 'Agriculture', location: 'Douala, CM', type: 'Contract' },
  { title: 'Digital Marketing Manager', department: 'Marketing', location: 'Remote', type: 'Full-time' },
] as const

export const PROJECTS = [
  {
    id: 1,
    title: 'Binova Staff Residence',
    sector: 'Public Work & Real Estate',
    year: '2026',
    status: 'In Progress',
    description: 'To house its staff, the group wants to build around 130 four-story buildings, 20 duplexes, and a leisure center to accommodate around 10,000 people in its new industrial city, for an investment of about 70 million euros. The completion date is estimated for early 2028, with construction starting in December 2026.',
    image: '/projets/binova-staff.jpg',
    details: 'A comprehensive industrial city designed to house over 10,000 people with modern amenities including recreational facilities.',
  },
  {
    id: 2,
    title: 'Binova Palace Hotel',
    sector: 'Public Work & Real Estate',
    year: '2026',
    status: 'In Progress',
    description: 'Project to build a 5-star, 250-room hotel in the Ocean department of southern Cameroon. The project represents an investment of 75 million euros and construction is scheduled to take two years.',
    image: '/projets/hotel.png',
    details: 'A 5-star hotel with 250 rooms offering world-class amenities and services for international business travelers and tourists.',
  },
  {
    id: 3,
    title: 'Southern Cameroon Airport',
    sector: 'Logistic & Transportation',
    year: '2026',
    status: 'In Progress',
    description: 'Private initiative to build an ultra-modern international airport with 6 runways up to 3 km long. Estimated at 5 billion euros, Binova plans phased deployment to transform air transport, tourism, and business in Cameroon.',
    image: '/projets/Airport.jpg',
    details: 'An ultra-modern international airport with 6 runways designed to transform regional air transport and economic development.',
  },
  {
    id: 4,
    title: '80MW Solar Power Plant',
    sector: 'Energy',
    year: '2026',
    status: 'In Progress',
    description: 'Estimated at 60 million euros, with a 20 MW storage unit and built on 100 hectares. Binova expects this project to reduce long-term electricity costs and guarantee clean, environmentally friendly energy for its factories.',
    image: '/projets/solar.jpg',
    details: 'A major renewable energy facility combining solar generation with cutting-edge energy storage technology.',
  },
  {
    id: 5,
    title: 'Dosage Form Pharmaceutical Manufacturing Unit',
    sector: 'Health & Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'With an investment of approximately 100 million euros for the construction phase on a 7-hectare area, Binova is building its first state-of-the-art pharmaceutical manufacturing unit in Africa. Construction starts in early 2027 for 24 months in southern Cameroon.',
    image: '/projets/pharmaceutical.jpg',
    details: 'A state-of-the-art pharmaceutical facility producing dosage forms with international quality standards.',
  },
  {
    id: 6,
    title: 'API and Biologics Manufacturing Unit',
    sector: 'Health & Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'With an investment of approximately 140 million euros for the construction phase on a 12-hectare area, Binova is building its first state-of-the-art biotech manufacturing unit in Africa. Construction starts in early 2027 for 24 months in southern Cameroon.',
    image: '/projets/api-biologic.png',
    details: 'A biotech manufacturing unit for active pharmaceutical ingredients and biologics production.',
  },
  {
    id: 7,
    title: 'Holyframe University',
    sector: 'Education & Training',
    year: '2027',
    status: 'In Progress',
    description: 'Construction on a dedicated 100-hectare area including administrative buildings, amphitheaters, classrooms, tutorial rooms, laboratories, library, and restaurant to ensure high-value scientific and technological training. Start is planned for early 2027 over 3 years, with an initial 300 million euros first phase.',
    image: '/projets/university.png',
    details: 'A comprehensive university campus designed for scientific and technological education with world-class facilities.',
  },
  {
    id: 8,
    title: 'Poultry Farming',
    sector: 'Agriculture & Livestock',
    year: '2027',
    status: 'In Progress',
    description: 'Plan to develop a modern farm with a capacity of 5 million animals for an investment of 60 million euros.',
    image: '/projets/poultry.jpg',
    details: 'A large-scale modern poultry facility with advanced farming practices and sustainable operations.',
  },
  {
    id: 9,
    title: 'Aluminium Production',
    sector: 'Mining',
    year: '2027',
    status: 'In Progress',
    description: 'Planned investment in aluminum production with a processing plant capacity of 750,000 tons per year to support demand from the automotive industry.',
    image: '/projets/aluminium.jpg',
    details: 'A major aluminum processing facility supporting regional and international automotive manufacturing.',
  },
  {
    id: 10,
    title: 'Hospitals',
    sector: 'Health & Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'Binova intends to build several reference hospitals and university hospitals in multiple African cities to improve medical care and patient experience.',
    image: '/projets/hospitals.jpg',
    details: 'A network of reference hospitals and medical centers providing world-class healthcare across Africa.',
  },
  {
    id: 11,
    title: 'Drugs Distribution',
    sector: 'Health & Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'Binova intends to build several drug distribution centers in all African capitals to facilitate access to quality medicine at the best prices.',
    image: '/projets/drugs.png',
    details: 'A continental network of pharmaceutical distribution centers ensuring quality medicine access across Africa.',
  },
] as const
