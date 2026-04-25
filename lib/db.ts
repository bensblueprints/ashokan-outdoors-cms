import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dir = process.env.DATA_DIR || '/app/data'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

export const db = new Database(path.join(dir, 'leads.db'))

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL')

// ─── Create Tables ───────────────────────────────────────────────────────────

db.exec(`CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  preferred_date TEXT,
  group_size TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT,
  subtitle TEXT,
  body TEXT,
  image TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  image TEXT,
  icon TEXT,
  href TEXT,
  sort_order INTEGER,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  label TEXT,
  price TEXT,
  details TEXT,
  sort_order INTEGER,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT,
  answer TEXT,
  sort_order INTEGER,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT,
  slug TEXT UNIQUE,
  excerpt TEXT,
  body TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'fishing',
  published INTEGER DEFAULT 0,
  author TEXT DEFAULT 'John Yanzek',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME
)`)

db.exec(`CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  filename TEXT,
  original_name TEXT,
  alt TEXT,
  size INTEGER,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// ─── Seed Data ───────────────────────────────────────────────────────────────

const seedSetting = db.prepare(
  `INSERT OR IGNORE INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))`
)

const settingsData: [string, string][] = [
  ['phone', '(917) 232-9951'],
  ['email', 'ashokanoutdoors@gmail.com'],
  ['address', '187 Watson Hollow Road, West Shokan, NY 12494'],
  ['instagram', 'https://www.instagram.com/ashokanoutdoors/'],
  ['facebook', 'https://www.facebook.com/ashokanoutdoors'],
  ['owner_name', 'John Yanzek'],
  ['owner_title', 'Owner & Lead Guide'],
  ['site_name', 'Ashokan Outdoors'],
  ['tagline', 'Guided Fly Fishing and Hiking trips in The Catskill Mountains'],
]

const seedSettings = db.transaction(() => {
  for (const [key, value] of settingsData) {
    seedSetting.run(key, value)
  }
})
seedSettings()

// ─── Sections ────────────────────────────────────────────────────────────────

const seedSection = db.prepare(
  `INSERT OR IGNORE INTO sections (id, slug, title, subtitle, body, image, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
)

const sectionsData: [string, string, string, string | null, string | null, string | null][] = [
  [
    'hero',
    'hero',
    'Guided Fly Fishing & Hiking in the Catskills',
    'Experience the birthplace of American fly fishing with over three decades of local expertise. Our licensed guides provide safe, unforgettable adventures on legendary Catskill waters and mountain trails.',
    null,
    '/images/hero-main.jpg',
  ],
  [
    'about',
    'about',
    'About Ashokan Outdoors',
    'Meet Your Guide',
    `Over three decades of experience guiding anglers and hikers through the Catskill Mountains. John's deep knowledge of these waters and trails ensures every trip is safe, productive, and unforgettable.

A dedicated conservationist, proud leader of the Ashokan-Pepacton Chapter of Trout Unlimited, and passionate about connecting people to the great Catskill outdoors.

It can take years to become familiar with Catskill rivers and mountain trails. Finding the less traveled fishing and hiking spots can be near impossible these days. In the last few years it has also been difficult to keep up with new rules, regulations, and changing public/private property boundaries in the exploding Catskill Region.

At Ashokan Outdoors we have been hiking, fishing, and living in the Catskill Mountains for over three decades. If you are looking to fish and/or hike this area and you want to get way more out of your Catskill visit -- we are sure that we can help you find your perfect mountain or stream.

We specialize in fly fishing. We are conveniently located on the northern banks of the Bush Kill Creek — one of the few tributaries that flows directly into the Upper Ashokan Reservoir in West Shokan, NY.

We are also very fortunate to be very close to many of the legendary Catskill streams such as: The Esopus Creek, Woodland Valley Creek, Rondout Creek, and the many other streams and tributaries that run through the Peekamoose Valley.

Ashokan Outdoors also offers guided hiking services. We are perfectly situated at the foot of the Burroughs Range — a series of mountains and trails that hold some of the best hiking and nature one can experience in the Catskills. Mountains such as: Slide, Peekamoose, Table, Wittenberg, and Cornell.

We are licensed New York State Outdoor Guides which means we are trained and certified in CPR, Water Safety, Outdoor First Aid and the latest NYS Fishing and Hiking Regulations.

We are also members of the NYS Outdoor Guides Association and we adhere to the business standards required by the NYSOGA organization.

At Ashokan Outdoors we are dedicated Catskill conservationists. We have a strong respect for the tradition of Catskill Fly Fishing and many of us are proud leaders of local conservation groups such as the Ashokan-Pepacton Chapter of Trout Unlimited. We donate our time and money to efforts protecting the pristine rivers and streams of the Catskills.

We embrace sustainable fishing and hiking practices, including catch/release and barbless hooks to minimize our impact. Our commitment to the environment extends beyond the water — as a rule we will always 'leave no trace' in all of our outdoor activities and will do whatever it takes to preserve the beauty of these wild places we call home.

At Ashokan Outdoors we love to connect people to nature, and we do it in a friendly and responsible way.`,
    '/images/john-yanzek.webp',
  ],
  [
    'catskill_fly_fishing',
    'catskill_fly_fishing',
    'Catskill Fly Fishing',
    'Heritage & Waters',
    `The Catskill region of New York's Hudson Valley is often called the 'Birthplace of American Fly Fishing,' a title earned through its pristine waters, rich history, and legendary anglers. Some of the most famous trout streams in the country flow through these mountains, including the Beaverkill, Willowemoc, Esopus Creek, and Neversink River — all known for their wild and stocked trout populations. These waters offer the perfect blend of challenging riffles, deep pools, and tree-lined banks, making them an angler's paradise and a hiker's dream. The Catskills' cold, oxygen-rich waters support thriving populations of brook, brown, and rainbow trout, providing anglers with the opportunity to test their skills against fish that are as cunning as they are beautiful.

The history of fly fishing in the Catskills is deeply rooted in innovation and conservation. In the late 19th and early 20th centuries, legendary anglers like Theodore Gordon helped shape the sport by developing the first American dry fly patterns, which closely mimicked the region's abundant aquatic insects. This adaptation revolutionized fly fishing in the U.S. and led to the creation of the Catskill-style dry fly, a pattern still used worldwide today. Another little-known fact is that the Neversink River was the birthplace of the modern dry fly technique, inspiring generations of anglers to refine their craft. The Catskills are also home to the Catskill Fly Fishing Center and Museum, a must-visit for those interested in the sport's deep-rooted history and evolution.

For those seeking an escape from the everyday, fly fishing in the Catskills offers a unique way to connect with nature and history simultaneously. Unlike conventional fishing, fly fishing is an immersive experience that requires patience, skill, and an understanding of the environment. Anglers learn to read the water, identify insect hatches, and master the art of the perfect cast, all while surrounded by the breathtaking beauty of the Catskill Mountains.

Whether you're a seasoned angler or a complete beginner, the thrill of watching a wild trout rise to a hand-tied fly is an unforgettable experience. Combined with the region's deep angling heritage and commitment to conservation, the Catskills remain a bucket-list destination for anyone who appreciates the art, tradition, and adventure of fly fishing.`,
    null,
  ],
  [
    'before_you_fish',
    'before_you_fish',
    'Before You Go Fly Fishing',
    'Preparation Guide',
    null,
    null,
  ],
  [
    'page_fly_fishing_guiding',
    'page_fly_fishing_guiding',
    'Guided Fly Fishing in the Catskills',
    'Fish legendary Catskill streams with expert local guides who\'ve spent three decades mastering these waters.',
    `Experience the thrill of fly fishing on the legendary rivers and streams of the Catskills. Our expert guides will help you discover and navigate these pristine waters, ensuring you safely make the most of your fishing adventure. We provide all rods, reels, and flies you will need to catch a trout on a fly. Join us for an unforgettable day on the water, surrounded by breathtaking scenery.

The Catskill region of New York's Hudson Valley is often called the "Birthplace of American Fly Fishing," a title earned through its pristine waters, rich history, and legendary anglers. Some of the most famous trout streams in the country flow through these mountains, including the Beaverkill, Willowemoc, Esopus Creek, and Neversink River — all known for their wild and stocked trout populations.

The Catskills' cold, oxygen-rich waters support thriving populations of brook, brown, and rainbow trout, providing anglers with the opportunity to test their skills against fish that are as cunning as they are beautiful.`,
    '/images/fly-fishing-guide.jpg',
  ],
  [
    'page_fly_fishing_instruction',
    'page_fly_fishing_instruction',
    'Catskills Fly Fishing Instruction',
    'Learn to fly fish in the birthplace of American fly fishing with licensed Catskill Mountain guides.',
    `Whether you are looking to refine your fly fishing skills or if you are just starting out — our knowledgeable fly fishing instructors will help you enhance your proficiency. When you are ready, we can take your new skills to the Catskill waters. We promise an unforgettable experience. Join us and confidently embark on your next fly fishing journey.

Learn and/or develop your fly casting skills on land with an Ashokan Outdoors Licensed Instructor. Our Guides will teach you about different fly rods, reels, lines, and how to use each of them. You can learn the basics or enhance your current skills. This instruction is conducted without hooks on open lawn so we can get a little crazy.`,
    '/images/hiking.jpg',
  ],
  [
    'page_guided_hikes',
    'page_guided_hikes',
    'Guided Catskill Hikes',
    'Summit breathtaking Catskill peaks with certified guides who know every trail and ridge.',
    `Discover the breathtaking beauty of the Catskill High Peaks, or opt for a more manageable hiking experience tailored to your preferences. Our trained and certified hiking guides prioritize your safety and preparation to ensure a worry-free adventure. Join us for an unforgettable journey where you can immerse yourself into the great Catskill outdoors.

Ashokan Outdoors is perfectly situated at the foot of the Burroughs Range — a series of mountains and trails that hold some of the best hiking and nature one can experience in the Catskills. Whether you want to summit a 3,500-foot Catskill Peak or take a more leisurely hike, our guides know great trails and would be happy to help you choose a suitable hike, prepare your route, and prioritize safety.`,
    '/images/hiking.jpg',
  ],
]

const seedSections = db.transaction(() => {
  for (const row of sectionsData) {
    seedSection.run(...row)
  }
})
seedSections()

// ─── Services ────────────────────────────────────────────────────────────────

const seedService = db.prepare(
  `INSERT OR IGNORE INTO services (title, description, image, icon, href, sort_order, updated_at)
   SELECT ?, ?, ?, ?, ?, ?, datetime('now')
   WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = ?)`
)

const servicesData: [string, string, string, string, string, number][] = [
  [
    'Fly Fishing Instruction',
    'Whether you are looking to refine your fly fishing skills or if you are just starting out - our knowledgeable fly fishing instructors will help you enhance your proficiency. When you are ready - we can take your new skills to the Catskill waters. We promise an unforgettable experience. Join us and confidently embark on your next fly fishing journey.',
    '/images/hiking.jpg',
    'Fish',
    '/fly-fishing-instruction',
    1,
  ],
  [
    'Guided Fly Fishing Trips',
    'Experience the thrill of fly fishing on the legendary rivers and streams of the Catskills. Our expert guides will help you navigate these pristine waters, ensuring you safely make the most of your fishing adventure. We also provide all rods, reels, and flies you will need to catch a trout on a fly. Join us for an unforgettable day on the water, surrounded by breathtaking scenery.',
    '/images/fall-fishing.jpg',
    'Compass',
    '/fly-fishing-guiding',
    2,
  ],
  [
    'Guided Catskill Hikes',
    'Discover the breathtaking beauty of the Catskill High Peaks, or opt for a more manageable hiking experience tailored to your preferences. Our trained and certified hiking guides prioritize your safety and preparation to ensure a worry-free adventure. Join us for an unforgettable journey where you can immerse yourself into the great Catskill outdoors.',
    '/images/hiking.jpg',
    'Mountain',
    '/guided-catskill-hikes',
    3,
  ],
]

const seedServices = db.transaction(() => {
  for (const [title, description, image, icon, href, sort_order] of servicesData) {
    seedService.run(title, description, image, icon, href, sort_order, title)
  }
})
seedServices()

// ─── Rates ───────────────────────────────────────────────────────────────────

const seedRate = db.prepare(
  `INSERT OR IGNORE INTO rates (category, label, price, details, sort_order, updated_at)
   SELECT ?, ?, ?, ?, ?, datetime('now')
   WHERE NOT EXISTS (SELECT 1 FROM rates WHERE category = ? AND label = ?)`
)

const ratesData: [string, string, string, string | null, number][] = [
  ['instruction', 'Each Angler', '$150', '90 minute session', 1],
  ['guiding_half', 'One Angler', '$400', null, 1],
  ['guiding_half', 'Two Anglers', '$500', null, 2],
  ['guiding_half', 'Three Anglers', '$750*', '* May Require Two Guides', 3],
  ['guiding_half', 'Four Anglers', '$900*', '* May Require Two Guides', 4],
  ['guiding_full', 'One Angler', '$550', null, 1],
  ['guiding_full', 'Two Anglers', '$750', null, 2],
  ['guiding_full', 'Three Anglers', '$900*', '* May Require Two Guides', 3],
  ['guiding_full', 'Four Anglers', '$1000*', '* May Require Two Guides', 4],
  ['hiking_half', 'Half Day', '$250', 'Small Group (4 or less)', 1],
  ['hiking_full', 'Full Day', '$400', 'Small Group (4 or less)', 1],
]

const seedRates = db.transaction(() => {
  for (const [category, label, price, details, sort_order] of ratesData) {
    seedRate.run(category, label, price, details, sort_order, category, label)
  }
})
seedRates()

// ─── FAQs ────────────────────────────────────────────────────────────────────

const seedFaq = db.prepare(
  `INSERT OR IGNORE INTO faqs (question, answer, sort_order, updated_at)
   SELECT ?, ?, ?, datetime('now')
   WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = ?)`
)

const faqsData: [string, string, number][] = [
  [
    'Will you be driving us?',
    'No. We will meet at beginning of our trip and from there we will move around as needed. You should bring your own vehicle and we will lead you to stream or trailhead.',
    1,
  ],
  [
    'Where can I change into my waders and boots?',
    "Most anglers slip off their waders on the roadside by their vehicles and wear whatever they have on underneath into local establishments. That said, there are lots of anglers in these parts, so you'll definitely see some wearing gear in restaurants and bars.",
    2,
  ],
  [
    "I'm very experienced. Can you just guide me to the best locations?",
    "Absolutely! We have decades of experience fishing and hiking in this area and have guided anglers of all levels. We understand that the experienced angler values time on the water above all else. We'll be happy to direct you to licensing and gear providers, guide you to great (some remote) spots, show you what insects the fish are interested in, and get out of your way.",
    3,
  ],
  [
    "I'm very inexperienced. Can you help me?",
    'Yes! We have decades of experience in this area and have guided with anglers of all levels. We love teaching beginners. It is a great feeling to help a beginning angler catch their first trout on a fly.',
    4,
  ],
  [
    'I have a mixed group of ages and levels. Can you accommodate this?',
    'Definitely. One Guide can usually handle up to three people, beyond that, we will arrange to bring in a second guide to make sure everyone gets the attention they require.',
    5,
  ],
  [
    'Will I have to do a lot of hiking?',
    'It is up to you. We can introduce you to easy access places with fairly flat entries or we can show you some challenging off grid spots that require substantial hiking.',
    6,
  ],
  [
    'Is it customary to tip a fishing guide?',
    "Whether the fish are biting or not, it's customary to tip a helpful, hard working, and knowledgeable guide.",
    7,
  ],
  [
    'Will there be cell service?',
    'Cellular phone service can be sketchy in the Catskills and in many of the areas we will be fishing it will be non-existent. Around the Ashokan Reservoir you will get service until just past Boiceville with occasional service in the town of Phoenicia. Be prepared to be off the network for a little while.',
    8,
  ],
]

const seedFaqs = db.transaction(() => {
  for (const [question, answer, sort_order] of faqsData) {
    seedFaq.run(question, answer, sort_order, question)
  }
})
seedFaqs()

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getSettings(): Record<string, string> {
  const rows = db.prepare('SELECT key, value FROM settings').all() as {
    key: string
    value: string
  }[]
  const result: Record<string, string> = {}
  for (const row of rows) {
    result[row.key] = row.value
  }
  return result
}

export function getSetting(key: string): string | undefined {
  const row = db
    .prepare('SELECT value FROM settings WHERE key = ?')
    .get(key) as { value: string } | undefined
  return row?.value
}

export function getServices() {
  return db
    .prepare('SELECT * FROM services ORDER BY sort_order ASC')
    .all() as {
    id: number
    title: string
    description: string
    image: string
    icon: string
    href: string
    sort_order: number
    updated_at: string
  }[]
}

export function getRates(category?: string) {
  if (category) {
    return db
      .prepare('SELECT * FROM rates WHERE category = ? ORDER BY sort_order ASC')
      .all(category) as {
      id: number
      category: string
      label: string
      price: string
      details: string | null
      sort_order: number
      updated_at: string
    }[]
  }
  return db.prepare('SELECT * FROM rates ORDER BY category, sort_order ASC').all() as {
    id: number
    category: string
    label: string
    price: string
    details: string | null
    sort_order: number
    updated_at: string
  }[]
}

export function getFaqs() {
  return db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC').all() as {
    id: number
    question: string
    answer: string
    sort_order: number
    updated_at: string
  }[]
}

export function getSection(slug: string) {
  return db.prepare('SELECT * FROM sections WHERE slug = ?').get(slug) as
    | {
        id: string
        slug: string
        title: string
        subtitle: string | null
        body: string | null
        image: string | null
        updated_at: string
      }
    | undefined
}

export function getPosts(category?: string, published?: boolean) {
  let query = 'SELECT * FROM posts'
  const conditions: string[] = []
  const params: (string | number)[] = []

  if (category) {
    conditions.push('category = ?')
    params.push(category)
  }
  if (published !== undefined) {
    conditions.push('published = ?')
    params.push(published ? 1 : 0)
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }

  query += ' ORDER BY created_at DESC'

  return db.prepare(query).all(...params) as {
    id: string
    title: string
    slug: string
    excerpt: string | null
    body: string | null
    cover_image: string | null
    category: string
    published: number
    author: string
    created_at: string
    updated_at: string | null
  }[]
}

export function getPost(slug: string) {
  return db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as
    | {
        id: string
        title: string
        slug: string
        excerpt: string | null
        body: string | null
        cover_image: string | null
        category: string
        published: number
        author: string
        created_at: string
        updated_at: string | null
      }
    | undefined
}
