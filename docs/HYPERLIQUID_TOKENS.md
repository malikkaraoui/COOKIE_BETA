# Tokens disponibles sur Hyperliquid

**Dernière mise à jour** : 21 novembre 2025  
**Source** : API Hyperliquid Testnet (`https://api.hyperliquid-testnet.xyz/info`)  
**Endpoint** : `POST /info` avec `{"type":"meta"}`

## Total : 199 tokens

### Liste alphabétique

0G, 2Z, AAVE, ACE, ADA, AERO, AI, AI16Z, AIXBT, ALGO, ALT, ANIME, APE, APEX, APT, AR, ARB, ASTER, ATOM, AVAX, AVNT, AXL, BABY, BADGER, BANANA, BERA, BIGTIME, BIO, BLAST, BLUR, BLZ, BNB, BRETT, BSV, BTC, CAKE, CANTO, CATI, CC, CELO, CHILLGUY, CHZ, COMP, DOGE, DOOD, DYDX, DYM, EIGEN, ENS, ETC, ETH, FARTCOIN, FET, FIL, FRIEND, FTM, FTT, FXS, GALA, GAS, GMT, GOAT, GRASS, GRIFFAIN, HBAR, HEMI, HMSTR, HPOS, HYPE, HYPER, ICP, ILV, IMX, INIT, INJ, IO, IOTA, IP, JELLY, JELLYJELLY, JOE, JTO, JUP, KAITO, KAS, LAUNCHCOIN, LAYER, LDO, LINEA, LISTA, MANTA, MATIC, MAV, MAVIA, ME, MEGA, MELANIA, MEME, MERL, MET, MEW, MINA, MKR, MON, MOODENG, MORPHO, MOVE, NEAR, NEIROETH, NEO, NFTI, NIL, NOT, NTRN, NXPC, OM, OMNI, ONDO, OP, ORDI, OX, PANDORA, PAXG, PENDLE, PENGU, PEOPLE, PIXEL, PNUT, POL, POLYX, POPCAT, PROMPT, PROVE, PUMP, PURR, PYTH, RENDER, REQ, RESOLV, REZ, RLB, RNDR, RSR, RUNE, S, SAGA, SAND, SCR, SKY, SNX, SOL, SOPH, SPX, STBL, STG, STRAX, STX, SUI, SUPER, SUSHI, SYRUP, TAO, TIA, TNSR, TON, TRB, TRUMP, TST, TURBO, UMA, UNIBOT, USTC, USUAL, VET, VINE, VIRTUAL, VVV, W, WCT, WIF, WLD, WLFI, XAI, XLM, XPL, YZY, ZEC, ZEN, ZEREBRO, ZETA, ZK, ZORA, ZRO

### Tokens avec préfixe 'k' (milliers)

- kBONK
- kDOGS
- kLUNC
- kNEIRO
- kPEPE
- kSHIB

---

## Comment mettre à jour cette liste

### Méthode automatique (recommandée)

```bash
node scripts/update-hyperliquid-tokens.js
```

### Méthode manuelle via curl

```bash
curl -s -X POST https://api.hyperliquid-testnet.xyz/info \
  -H 'Content-Type: application/json' \
  -d '{"type":"meta"}' \
| python3 -c "import sys, json; data = json.load(sys.stdin); tokens = [u['name'] for u in data['universe']]; print(f'Total: {len(tokens)} tokens\n'); print(', '.join(sorted(tokens)))"
```

### Fréquence de mise à jour recommandée

- **Hebdomadaire** : Hyperliquid ajoute régulièrement de nouveaux tokens
- **Avant ajout massif** : Vérifier la liste avant d'ajouter 10+ tokens à tokenList.js
- **Automatisation** : Ajouter un cron job ou GitHub Action pour update automatique

---

## Notes techniques

- L'API retourne également `szDecimals` (précision) pour chaque token
- Le préfixe `k` indique une division par 1000 (ex: kPEPE = PEPE/1000)
- Certains tokens peuvent être délistés sans préavis
- Toujours vérifier avec `assetCtxs` avant d'intégrer un nouveau token
- Ce fichier est généré automatiquement par `scripts/update-hyperliquid-tokens.js`
