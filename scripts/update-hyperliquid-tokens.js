#!/usr/bin/env node

// Script de mise à jour automatique de la liste des tokens Hyperliquid
// Usage: node scripts/update-hyperliquid-tokens.js

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://api.hyperliquid-testnet.xyz/info';
const OUTPUT_FILE = path.join(__dirname, '../docs/HYPERLIQUID_TOKENS.md');

function fetchTokens() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ type: 'meta' });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(API_URL, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🔄 Récupération de la liste des tokens Hyperliquid...');
  
  try {
    const data = await fetchTokens();
    const tokens = data.universe.map(u => u.name).sort();
    const kTokens = tokens.filter(t => t.startsWith('k'));
    const regularTokens = tokens.filter(t => !t.startsWith('k'));
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const doc = `# Tokens disponibles sur Hyperliquid

**Dernière mise à jour** : ${dateStr}  
**Source** : API Hyperliquid Testnet (\`${API_URL}\`)  
**Endpoint** : \`POST /info\` avec \`{"type":"meta"}\`

## Total : ${tokens.length} tokens

### Liste alphabétique

${regularTokens.join(', ')}

### Tokens avec préfixe 'k' (milliers)

${kTokens.map(t => `- ${t}`).join('\n')}

---

## Comment mettre à jour cette liste

### Méthode automatique (recommandée)

\`\`\`bash
node scripts/update-hyperliquid-tokens.js
\`\`\`

### Méthode manuelle via curl

\`\`\`bash
curl -s -X POST https://api.hyperliquid-testnet.xyz/info \\
  -H 'Content-Type: application/json' \\
  -d '{"type":"meta"}' \\
| python3 -c "import sys, json; data = json.load(sys.stdin); tokens = [u['name'] for u in data['universe']]; print(f'Total: {len(tokens)} tokens\\n'); print(', '.join(sorted(tokens)))"
\`\`\`

### Fréquence de mise à jour recommandée

- **Hebdomadaire** : Hyperliquid ajoute régulièrement de nouveaux tokens
- **Avant ajout massif** : Vérifier la liste avant d'ajouter 10+ tokens à tokenList.js
- **Automatisation** : Ajouter un cron job ou GitHub Action pour update automatique

---

## Notes techniques

- L'API retourne également \`szDecimals\` (précision) pour chaque token
- Le préfixe \`k\` indique une division par 1000 (ex: kPEPE = PEPE/1000)
- Certains tokens peuvent être délistés sans préavis
- Toujours vérifier avec \`assetCtxs\` avant d'intégrer un nouveau token
- Ce fichier est généré automatiquement par \`scripts/update-hyperliquid-tokens.js\`
`;

    fs.writeFileSync(OUTPUT_FILE, doc, 'utf8');
    
    console.log(`✅ ${tokens.length} tokens mis à jour dans ${OUTPUT_FILE}`);
    console.log(`   - ${regularTokens.length} tokens standards`);
    console.log(`   - ${kTokens.length} tokens avec préfixe 'k'`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des tokens:', error.message);
    process.exit(1);
  }
}

main();
