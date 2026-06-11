# ASERGMV Digital Platform
**Plateforme nationale de suivi de la Grande Muraille Verte — Sénégal**

> Développée par **Processingenierie** | Contact : mamadou.dia@processingenierie.com

[![Production](https://img.shields.io/badge/Production-eco--rho--hazel.vercel.app-emerald)](https://eco-rho-hazel.vercel.app)
[![Pages](https://img.shields.io/badge/Pages-74%2F74%20HTTP%20200-green)](https://eco-rho-hazel.vercel.app)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20TypeScript%20%7C%20Prisma-blue)](.)

---

## Description

Système d'information complet de l'ASERGMV couvrant le suivi de reforestation sur **850 km** et **131 communes** au Sénégal. La plateforme intègre 74 pages opérationnelles organisées en 13 groupes fonctionnels, incluant 8 modules d'IA avancée.

## Liens rapides
- **Production :** https://eco-rho-hazel.vercel.app
- **Documentation complète :** [DOCUMENTATION.md](./DOCUMENTATION.md)
- **Proposition commerciale :** [proposition/ASERGMV_Proposition_Commerciale_2026.html](./proposition/ASERGMV_Proposition_Commerciale_2026.html)
- **Credentials démo :** admin@asergmv.sn / asergmv2026

## Stack technique
- **Framework :** Next.js 15 App Router
- **Langage :** TypeScript
- **Style :** Tailwind CSS v4
- **Base de données :** PostgreSQL (Neon DB) + Prisma 5
- **Auth :** NextAuth v4 (JWT)
- **Déploiement :** Vercel (auto-deploy)
- **Cartes :** Leaflet.js
- **Icons :** Lucide React

## Modules IA avancée (nouveaux)
| Module | URL | Description |
|--------|-----|-------------|
| Observation de la Terre | /observation-terre | NDVI Sentinel-2, NASA FIRMS, LandTrendr 30 ans |
| ML & Prédiction | /ml-prediction | LSTM 87%, XGBoost 91%, Isolation Forest 93% |
| LLM Génératif | /llm-generatif | RAG 2847 docs, rapports auto, voix Wolof |
| IoT & Capteurs | /iot-capteurs | 247 capteurs LoRaWAN, stations météo, caméras faune |
| Vision IA | /vision-ia | Diagnostic phyto 94%, mensuration, canopée drone |
| Web3 & Blockchain | /web3-avance | NFT arbres, DAO gouvernance, DeFi carbone, TVL 853k USD |
| Jumeau Numérique | /jumeau-numerique | SWAT+ hydrologie, FARSITE feux, 3 scénarios RCP |
| Social & Gouvernance IA | /social-ia | Sentiment NLP, gamification, conflits, USSD *444# |

## Démarrage rapide

```bash
npm install
cp .env.example .env.local  # Configurer DATABASE_URL et NEXTAUTH_SECRET
npm run dev                  # http://localhost:3001
```

## Tests production (2026-06-11)
```
74 pages testées — 74/74 HTTP 200 ✅ — 0 échec
```

Voir [DOCUMENTATION.md](./DOCUMENTATION.md) pour le détail complet.