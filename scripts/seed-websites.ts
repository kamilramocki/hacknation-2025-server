import 'dotenv/config';

const API_URL = process.env.API_URL || 'http://localhost:3000';

const websites = [
  { name: 'Zakład Ubezpieczeń Społecznych', domain: 'zus.gov.pl' },
  { name: 'Ministerstwo Finansów', domain: 'mf.gov.pl' },
  { name: 'Ministerstwo Infrastruktury', domain: 'mi.gov.pl' },
  { name: 'Ministerstwo Kultury i Dziedzictwa Narodowego', domain: 'kultura.gov.pl' },
  { name: 'Ministerstwo Cyfryzacji', domain: 'cyfryzacja.gov.pl' },
  { name: 'Ministerstwo Rolnictwa i Rozwoju Wsi', domain: 'minrol.gov.pl' },
  { name: 'Ministerstwo Spraw Zagranicznych', domain: 'msz.gov.pl' },
  { name: 'Ministerstwo Spraw Wewnętrznych i Administracji', domain: 'mswia.gov.pl' },
  { name: 'Najwyższa Izba Kontroli', domain: 'nik.gov.pl' },
  { name: 'Urząd Ochrony Konkurencji i Konsumentów', domain: 'uokik.gov.pl' },
  { name: 'Prokuratura Generalna', domain: 'prokuratura.gov.pl' },
  { name: 'Sejm Rzeczypospolitej Polskiej', domain: 'sejm.gov.pl' },
  { name: 'Senat Rzeczypospolitej Polskiej', domain: 'senat.gov.pl' },
  { name: 'Rząd Rzeczypospolitej Polskiej', domain: 'rzad.gov.pl' },
  { name: 'Główny Urząd Statystyczny', domain: 'stat.gov.pl' },
  { name: 'Urząd Skarbowy', domain: 'urzadskarbowy.gov.pl' },
  { name: 'Ministerstwo Zdrowia', domain: 'zdrowie.gov.pl' },
];

const uniqueWebsites = websites.filter(
  (website, index, self) =>
    index === self.findIndex((w) => w.domain === website.domain)
);

async function seedWebsites() {
  console.log(`Seeding ${uniqueWebsites.length} websites to ${API_URL}/websites\n`);

  for (const website of uniqueWebsites) {
    try {
      const response = await fetch(`${API_URL}/websites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: website.name,
          domainAddresses: [website.domain],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Created: ${website.name} (${website.domain}) - ID: ${data.id}`);
      } else {
        const error = await response.json();
        console.log(`Failed: ${website.name} - ${error.message || response.statusText}`);
      }
    } catch (error) {
      console.log(`Error: ${website.name} - ${error.message}`);
    }
  }

  console.log('\nSeeding complete!');
}

seedWebsites();

