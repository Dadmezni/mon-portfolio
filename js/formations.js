/* ===== PAGE FORMATIONS : données, recherche, filtres ===== */
(function () {
  'use strict';

  /* Pour ajouter une formation : ajoutez simplement une ligne dans COURSES. */
  var CATEGORIES = [
    { id: 'all',       label: 'Toutes' },
    { id: 'ia',        label: 'Intelligence artificielle' },
    { id: 'web',       label: 'Développement web' },
    { id: 'data',      label: 'Bases de données' },
    { id: 'ateliers',  label: 'Ateliers & évaluations' },
    { id: 'marketing', label: 'Marketing digital' }
  ];

  var CAT_SLOGANS = {
    all:       "Apprenez en construisant de vrais projets.",
    ia:        "L'intelligence artificielle, expliquée simplement.",
    web:       "Construisez des applications modernes, de l'idée à la mise en ligne.",
    data:      "Des données structurées, fiables et faciles à exploiter.",
    ateliers:  "Pratiquez, vérifiez, progressez.",
    marketing: "Créez, communiquez, convainquez."
  };

  /* Icônes dessinées en SVG (aucun fichier image). Les parties sombres utilisent currentColor : elles s'adaptent au thème. */
  var ICONS = {
    bootstrap: "<svg viewBox=\"0 0 100 100\"><defs><linearGradient id=\"gbs\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8f4df5\"/><stop offset=\"1\" stop-color=\"#6a1fe0\"/></linearGradient></defs><path fill=\"url(#gbs)\" d=\"M24 9h52c10 0 15 5 15 15v14c0 4 2 8 8 12-6 4-8 8-8 12v14c0 10-5 15-15 15H24c-10 0-15-5-15-15V62c0-4-2-8-8-12 6-4 8-8 8-12V24C9 14 14 9 24 9z\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M36 27h21c9 0 14 5 14 12 0 5-3 9-8 11 6 1.800 10 6 10 12 0 8-6 13-16 13H36zM46 35v12h9c4 0 6-2 6-6s-2-6-6-6zM46 55v13h10c4 0 7-2 7-6.500S60 55 56 55z\"/></svg>",
    laravel: "<svg viewBox=\"0 0 50 52\"><path fill=\"#FF2D20\" d=\"M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.028.048.062.072.093.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214L9.62 34.31l-.003-.002-.003-.002c-.032-.018-.06-.044-.09-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.015-.117-.003-.03-.01-.058-.01-.088V12.34L4.97 9.683 1.602 7.72v-.001zM10.01 1.82L2.003 6.43l8.006 4.61 8.005-4.61-8.005-4.61zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.96l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z\"/></svg>",
    devops: "<svg viewBox=\"0 12 100 76\"><path d=\"M50 50C42 36 30 28 22 28C11 28 5 38 5 50S11 72 22 72C30 72 42 64 50 50\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"9\" stroke-linecap=\"butt\" opacity=\".92\"/><path d=\"M50 50C58 36 70 28 78 28C89 28 95 38 95 50S89 72 78 72C70 72 58 64 50 50\" fill=\"none\" stroke=\"#00d26a\" stroke-width=\"9\"/><path d=\"M44 56l12-12\" stroke=\"none\"/><path fill=\"#00d26a\" d=\"M22.36 50.11Q22.36 51.4 21.79 52.4Q21.22 53.4 20.18 53.95Q19.13 54.5 17.76 54.5H14.47V45.73H17.76Q19.14 45.73 20.18 46.28Q21.22 46.83 21.79 47.82Q22.36 48.81 22.36 50.11ZM20.18 50.11Q20.18 48.9 19.51 48.22Q18.83 47.55 17.62 47.55H16.61V52.65H17.62Q18.83 52.65 19.51 51.99Q20.18 51.33 20.18 50.11ZM30.09 51.52H25.26Q25.31 52.17 25.67 52.52Q26.04 52.86 26.58 52.86Q27.38 52.86 27.69 52.19H29.97Q29.79 52.88 29.34 53.42Q28.88 53.98 28.19 54.29Q27.51 54.6 26.66 54.6Q25.63 54.6 24.83 54.16Q24.03 53.73 23.58 52.91Q23.13 52.1 23.13 51.01Q23.13 49.92 23.58 49.11Q24.02 48.3 24.82 47.86Q25.62 47.42 26.66 47.42Q27.67 47.42 28.46 47.85Q29.24 48.27 29.69 49.06Q30.13 49.85 30.13 50.9Q30.13 51.2 30.09 51.52ZM27.94 50.34Q27.94 49.79 27.57 49.46Q27.19 49.14 26.63 49.14Q26.09 49.14 25.73 49.45Q25.36 49.76 25.27 50.34ZM34.39 52.5 35.91 47.52H38.18L35.71 54.5H33.07L30.59 47.52H32.88Z\"/><path fill=\"currentColor\" d=\"M61.77 50.09Q61.77 48.8 62.38 47.77Q62.98 46.75 64.01 46.17Q65.04 45.6 66.28 45.6Q67.52 45.6 68.55 46.17Q69.58 46.75 70.17 47.77Q70.77 48.8 70.77 50.09Q70.77 51.38 70.17 52.41Q69.57 53.44 68.54 54.01Q67.52 54.59 66.28 54.59Q65.04 54.59 64.01 54.01Q62.98 53.44 62.38 52.41Q61.77 51.38 61.77 50.09ZM68.59 50.09Q68.59 48.92 67.96 48.23Q67.33 47.54 66.28 47.54Q65.22 47.54 64.59 48.23Q63.96 48.91 63.96 50.09Q63.96 51.25 64.59 51.94Q65.22 52.64 66.28 52.64Q67.33 52.64 67.96 51.94Q68.59 51.24 68.59 50.09ZM76.24 47.42Q77.11 47.42 77.81 47.86Q78.51 48.3 78.91 49.11Q79.32 49.92 79.32 51Q79.32 52.08 78.91 52.89Q78.51 53.71 77.81 54.16Q77.11 54.6 76.24 54.6Q75.52 54.6 74.96 54.3Q74.41 54 74.09 53.52V57.83H71.96V47.52H74.09V48.51Q74.41 48.02 74.96 47.72Q75.51 47.42 76.24 47.42ZM75.61 49.29Q74.97 49.29 74.53 49.75Q74.08 50.21 74.08 51.01Q74.08 51.81 74.53 52.27Q74.97 52.74 75.61 52.74Q76.24 52.74 76.69 52.27Q77.14 51.8 77.14 51Q77.14 50.2 76.7 49.74Q76.26 49.29 75.61 49.29ZM80.07 52.21H82.18Q82.22 52.58 82.52 52.8Q82.82 53.02 83.26 53.02Q83.66 53.02 83.88 52.87Q84.09 52.71 84.09 52.46Q84.09 52.16 83.78 52.02Q83.47 51.88 82.77 51.7Q82.02 51.52 81.52 51.33Q81.02 51.14 80.66 50.72Q80.29 50.3 80.29 49.59Q80.29 48.99 80.62 48.49Q80.96 48 81.6 47.71Q82.24 47.42 83.13 47.42Q84.44 47.42 85.2 48.08Q85.96 48.73 86.07 49.8H84.09Q84.04 49.44 83.78 49.23Q83.51 49.01 83.07 49.01Q82.69 49.01 82.49 49.16Q82.29 49.3 82.29 49.55Q82.29 49.85 82.61 50Q82.93 50.15 83.61 50.3Q84.38 50.5 84.87 50.69Q85.36 50.89 85.72 51.32Q86.09 51.75 86.11 52.48Q86.11 53.09 85.76 53.57Q85.42 54.05 84.78 54.33Q84.13 54.6 83.28 54.6Q82.37 54.6 81.66 54.29Q80.94 53.98 80.53 53.43Q80.12 52.89 80.07 52.21Z\"/></svg>",
    nextjs: "<svg viewBox=\"0 0 120 80\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.400\" stroke-linejoin=\"miter\"><path d=\"M6 54V22M6 22L38 64M38 22V54\"/><path d=\"M72 22H50V54H72M50 38H68\"/><path d=\"M76 54L96 22M96 54L76 22\" stroke-width=\"3.400\"/><path d=\"M104 8L86 38\"/><path d=\"M98 22H118M108 22V54\"/><path fill=\"currentColor\" stroke=\"none\" d=\"M102.22 63.08Q102.22 62.64 102.53 62.34Q102.84 62.04 103.34 62.04Q103.82 62.04 104.13 62.34Q104.45 62.64 104.45 63.08Q104.45 63.51 104.13 63.8Q103.82 64.09 103.34 64.09Q102.84 64.09 102.53 63.8Q102.22 63.51 102.22 63.08ZM110.4 56.28V61.54Q110.4 62.76 109.71 63.42Q109.02 64.08 107.86 64.08Q106.64 64.08 105.9 63.38Q105.16 62.69 105.16 61.41H107.03Q107.03 61.9 107.23 62.15Q107.43 62.39 107.8 62.39Q108.14 62.39 108.33 62.17Q108.52 61.95 108.52 61.54V56.28ZM111.7 61.69H113.7Q113.74 62.12 114 62.34Q114.25 62.57 114.66 62.57Q115.07 62.57 115.32 62.38Q115.56 62.19 115.56 61.84Q115.56 61.56 115.37 61.37Q115.17 61.18 114.89 61.06Q114.61 60.94 114.1 60.79Q113.35 60.56 112.87 60.33Q112.4 60.09 112.06 59.64Q111.72 59.19 111.72 58.47Q111.72 57.39 112.5 56.78Q113.28 56.17 114.54 56.17Q115.81 56.17 116.59 56.78Q117.37 57.39 117.43 58.48H115.39Q115.37 58.1 115.12 57.89Q114.87 57.67 114.47 57.67Q114.13 57.67 113.92 57.86Q113.71 58.04 113.71 58.38Q113.71 58.75 114.06 58.96Q114.41 59.17 115.16 59.41Q115.91 59.67 116.38 59.9Q116.85 60.13 117.19 60.57Q117.53 61.01 117.53 61.7Q117.53 62.36 117.19 62.9Q116.86 63.44 116.22 63.76Q115.58 64.08 114.71 64.08Q113.86 64.08 113.19 63.8Q112.52 63.53 112.12 62.99Q111.72 62.45 111.7 61.69Z\"/></svg>",
    programmation: "<svg viewBox=\"0 0 100 100\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"13\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M30 26L8 50L30 74M70 26L92 50L70 74\"/><path d=\"M57 14L43 86\"/></svg>",
    portfolio: "<svg viewBox=\"0 0 100 100\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><defs><mask id=\"mpf\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\"><rect width=\"100\" height=\"100\" fill=\"#fff\"/><rect x=\"4\" y=\"46\" width=\"42\" height=\"36\" rx=\"6\" fill=\"#000\"/><rect x=\"54\" y=\"52\" width=\"46\" height=\"46\" rx=\"8\" fill=\"#000\"/></mask></defs><g mask=\"url(#mpf)\"><rect x=\"24\" y=\"6\" width=\"56\" height=\"88\" rx=\"4\"/><path d=\"M24 20H80\" stroke=\"none\"/><path d=\"M62 13h4M71 13h4\"/><circle cx=\"52\" cy=\"38\" r=\"16\"/><circle cx=\"52\" cy=\"34\" r=\"5.500\"/><path d=\"M41 47c3-6 7-8 11-8s8 2 11 8\"/><path d=\"M54 62h22M60 70h16M54 78h22M31 88h4M40 88h30\" /></g><rect x=\"9\" y=\"51\" width=\"32\" height=\"26\" rx=\"4\"/><circle cx=\"17\" cy=\"59\" r=\"2.800\"/><path d=\"M14 73l9-10 6 6 4-4 6 8\"/><rect x=\"59\" y=\"57\" width=\"36\" height=\"36\" rx=\"6\"/><path d=\"M70 68l-8 7 8 7M84 68l8 7-8 7\" stroke-width=\"3.400\"/></svg>",
    postgresql: "<svg viewBox=\"0 0 100 104\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><g stroke=\"currentColor\" stroke-width=\"4.500\" fill=\"#336791\"><path d=\"M36 12C20 12 6 20 5 42c-1 22 10 40 22 48l12-14c-3-14-3-40-3-64z\"/><path d=\"M64 12c16 0 30 8 31 30 1 22-10 40-22 48L61 76c3-14 3-40 3-64z\"/><path d=\"M50 6C36 6 28 16 28 34c0 14 3 22 7 28 4 6 6 14 6 24 0 8 4 14 9 14s9-6 9-14c0-10 2-18 6-24 4-6 7-14 7-28C72 16 64 6 50 6z\"/></g><g fill=\"none\" stroke=\"#fff\" stroke-width=\"2.600\"><path d=\"M34 28c4 8 4 22 8 32M66 28c-4 8-4 22-8 32\"/><path d=\"M42 62c0 12 2 24 8 30M58 62c0 12-2 24-8 30\"/></g><g fill=\"#fff\" stroke=\"currentColor\" stroke-width=\"1.600\"><ellipse cx=\"42\" cy=\"38\" rx=\"3.600\" ry=\"2.800\" transform=\"rotate(20 42 38)\"/><ellipse cx=\"58\" cy=\"38\" rx=\"3.600\" ry=\"2.800\" transform=\"rotate(-20 58 38)\"/></g><g fill=\"currentColor\"><circle cx=\"42.800\" cy=\"38.400\" r=\"1.200\"/><circle cx=\"57.200\" cy=\"38.400\" r=\"1.200\"/></g></svg>",
    canva: "<svg viewBox=\"0 0 100 100\"><defs><linearGradient id=\"gcv\" x1=\".2\" y1=\"0\" x2=\".8\" y2=\"1\"><stop offset=\"0\" stop-color=\"#00c4cc\"/><stop offset=\".55\" stop-color=\"#2a9bd8\"/><stop offset=\"1\" stop-color=\"#7d2ae8\"/></linearGradient></defs><circle cx=\"50\" cy=\"50\" r=\"48\" fill=\"url(#gcv)\"/><path fill=\"#fff\" d=\"M6.03 49.47Q6.03 44.18 8.02 40.08Q10.02 35.97 13.44 33.72Q16.86 31.47 21.04 31.47Q24.93 31.47 26.94 33.47Q28.96 35.47 28.96 38.74Q28.96 40.94 28.18 42.27Q27.41 43.6 25.97 43.6Q24.96 43.6 24.39 43.14Q23.81 42.67 23.81 41.77Q23.81 41.44 23.95 40.58Q24.17 39.5 24.17 38.85Q24.17 35.58 20.68 35.58Q18.3 35.58 16.14 37.12Q13.98 38.67 12.65 41.68Q11.32 44.68 11.32 48.82Q11.32 53.14 13.73 55.5Q16.14 57.86 20.86 57.86Q23.2 57.86 25.59 57.27Q27.99 56.67 30.9 55.45Q31.44 55.23 31.8 55.23Q32.38 55.23 32.67 55.66Q32.95 56.1 32.95 56.78Q32.95 58.98 30.58 60.02Q28.02 61.14 25.27 61.66Q22.51 62.18 20.03 62.18Q15.75 62.18 12.58 60.61Q9.41 59.05 7.72 56.17Q6.03 53.29 6.03 49.47ZM29.68 56.31Q29.68 53.43 31.01 50.86Q32.34 48.28 34.56 46.72Q36.77 45.15 39.25 45.15Q40.05 45.15 40.32 45.46Q40.59 45.76 40.77 46.56Q41.52 46.41 42.35 46.41Q44.11 46.41 44.11 47.67Q44.11 48.43 43.57 51.27Q42.75 55.41 42.75 57.03Q42.75 57.57 43.02 57.9Q43.29 58.22 43.72 58.22Q44.4 58.22 45.37 57.34Q46.35 56.46 48 54.48Q48.43 53.97 48.97 53.97Q49.44 53.97 49.71 54.4Q49.98 54.84 49.98 55.59Q49.98 57.03 49.3 57.82Q47.82 59.66 46.17 60.92Q44.51 62.18 42.96 62.18Q41.77 62.18 40.78 61.37Q39.79 60.56 39.29 59.16Q37.42 62.18 34.57 62.18Q32.34 62.18 31.01 60.56Q29.68 58.94 29.68 56.31ZM38.43 55.12 39.76 48.5Q38.25 48.54 36.97 49.63Q35.69 50.73 34.93 52.53Q34.18 54.33 34.18 56.35Q34.18 57.46 34.63 58Q35.08 58.54 35.87 58.54Q36.66 58.54 37.38 57.61Q38.1 56.67 38.43 55.12ZM47.14 56.13Q47.14 51.45 48.47 47.24Q48.79 46.2 49.53 45.71Q50.27 45.22 51.6 45.22Q52.32 45.22 52.61 45.4Q52.9 45.58 52.9 46.09Q52.9 46.66 52.36 48.68Q52 50.12 51.78 51.2Q51.57 52.28 51.42 53.86Q52.61 50.77 54.09 48.82Q55.56 46.88 56.98 46.05Q58.41 45.22 59.59 45.22Q61.93 45.22 61.93 47.56Q61.93 48.97 61.14 52.64Q60.46 55.77 60.46 56.78Q60.46 58.22 61.5 58.22Q62.22 58.22 63.21 57.34Q64.2 56.46 65.86 54.48Q66.29 53.97 66.83 53.97Q67.3 53.97 67.57 54.4Q67.84 54.84 67.84 55.59Q67.84 57.03 67.15 57.82Q65.61 59.73 63.82 60.96Q62.04 62.18 59.77 62.18Q57.94 62.18 57 61.12Q56.07 60.06 56.07 58.04Q56.07 57.03 56.57 54.44Q57.04 52.17 57.04 51.31Q57.04 50.73 56.64 50.73Q56.17 50.73 55.33 51.94Q54.48 53.14 53.6 55.12Q52.72 57.1 52.18 59.3Q51.78 60.99 51.26 61.59Q50.74 62.18 49.62 62.18Q48.25 62.18 47.7 60.74Q47.14 59.3 47.14 56.13ZM83.1 51.02Q83.64 51.02 83.93 51.38Q84.22 51.74 84.22 52.35Q84.22 53.47 83.79 54.1Q83.35 54.73 82.49 55.02Q80.83 55.56 78.96 55.56Q77.38 55.56 75.97 55.12Q74.93 56.82 73.67 58.62Q72.23 60.67 71.19 61.42Q70.14 62.18 68.81 62.18Q67.33 62.18 66.49 61.03Q65.64 59.88 65.43 57.39Q64.99 52.35 64.99 48.57V47.31Q65.03 46.12 65.64 45.66Q66.25 45.19 67.48 45.19Q68.41 45.19 68.86 45.6Q69.31 46.02 69.31 46.99Q69.31 51.13 69.82 57.75Q71.98 54.55 73.06 52.64Q72.52 51.6 72.52 50.16Q72.52 48.93 73.06 47.78Q73.6 46.63 74.53 45.91Q75.47 45.19 76.66 45.19Q77.7 45.19 78.35 45.93Q79 46.66 79 48.07Q79 49.69 78.13 51.78Q79.5 51.7 81.77 51.24L82.74 51.06Q82.85 51.02 83.1 51.02ZM80.62 56.31Q80.62 53.43 81.95 50.86Q83.28 48.28 85.5 46.72Q87.71 45.15 90.19 45.15Q90.99 45.15 91.26 45.46Q91.53 45.76 91.71 46.56Q92.46 46.41 93.29 46.41Q95.05 46.41 95.05 47.67Q95.05 48.43 94.51 51.27Q93.69 55.41 93.69 57.03Q93.69 57.57 93.96 57.9Q94.23 58.22 94.66 58.22Q95.34 58.22 96.31 57.34Q97.29 56.46 98.94 54.48Q99.37 53.97 99.91 53.97Q100.38 53.97 100.65 54.4Q100.92 54.84 100.92 55.59Q100.92 57.03 100.24 57.82Q98.76 59.66 97.11 60.92Q95.45 62.18 93.9 62.18Q92.71 62.18 91.72 61.37Q90.73 60.56 90.23 59.16Q88.36 62.18 85.51 62.18Q83.28 62.18 81.95 60.56Q80.62 58.94 80.62 56.31ZM89.37 55.12 90.7 48.5Q89.19 48.54 87.91 49.63Q86.63 50.73 85.87 52.53Q85.12 54.33 85.12 56.35Q85.12 57.46 85.57 58Q86.02 58.54 86.81 58.54Q87.6 58.54 88.32 57.61Q89.04 56.67 89.37 55.12Z\"/></svg>"
  };

  var COURSES = [
    // Intelligence artificielle
    { cat: 'ia', title: "Comprendre l'IA", href: 'ia.html', slogan: "🤖 Robot : l'IA n'est plus un mystère, elle devient votre alliée.", desc: "Les concepts essentiels de l'intelligence artificielle, expliqués pas à pas." },
    { cat: 'ia', title: "Cours d'IA en arabe", href: 'iaCours.html', slogan: "🤖 الذكاء الاصطناعي بلغتك، خطوة بخطوة", lang: 'ar', desc: "Cours d'introduction à l'intelligence artificielle, en langue arabe." },
    { cat: 'ia', title: 'Machine Learning et RAG', href: 'rag.html', slogan: "🐘 Éléphant : n'oubliez jamais, donnez une mémoire à vos modèles.", desc: "Principes du Machine Learning et de la génération augmentée par récupération (RAG)." },
    { cat: 'ia', title: "Histoire de l'IA et du RAG", href: 'ragHistoire.html', slogan: "🦕 Dinosaure : pour comprendre demain, remontez le fil d'hier.", desc: "Les grandes étapes qui ont mené de l'IA classique au RAG." },
    { cat: 'ia', title: 'Embeddings', href: 'embedding.html', slogan: "🧭 Boussole : quand les mots deviennent des coordonnées.", desc: "Comprendre les représentations vectorielles et leur rôle dans la recherche sémantique." },
    { cat: 'ia', title: 'Technologies et prompts', href: 'prompts.html', slogan: "🦜 Perroquet : posez la bonne question, obtenez la bonne réponse.", desc: "Outils d'IA générative et bonnes pratiques pour écrire des prompts efficaces." },

    // Développement web
    { cat: 'web', title: 'Cours Laravel', href: 'laravelCours.html', slogan: "Du code élégant, des applications solides.", icon: 'laravel', desc: "Les bases de Laravel et la structure d'une application, étape par étape." },
    { cat: 'web', title: 'Formation DevOps', href: 'devopsCours.html', slogan: "Codez, livrez, recommencez, sans friction.", icon: 'devops', desc: "Initiation aux pratiques DevOps : automatisation, déploiement et CI/CD." },
    { cat: 'web', title: 'Docker', href: 'Docker.html', slogan: "🐳 Baleine : construisez une fois, exécutez partout.", desc: "Conteneuriser une application et simplifier son déploiement." },
    { cat: 'web', title: 'Next.js', href: 'Next.js.html', slogan: "Des sites rapides, pensés pour le web moderne.", icon: 'nextjs', desc: "Construire des applications web modernes avec Next.js." },
    { cat: 'web', title: 'React', href: 'React.html', slogan: "⚛️ Atome : des interfaces vivantes, composant par composant.", desc: "Créer des interfaces dynamiques avec React." },
    { cat: 'web', title: 'HTML', href: 'HTML.html', slogan: "🧱 Brique : donnez une structure claire à chaque page web.", desc: "Maîtriser les balises HTML et construire une page web accessible." },
    { cat: 'web', title: 'PHP — Développement web dynamique', href: 'PHP.html', slogan: "🐘 Éléphant : puissant, robuste, il n'oublie aucune donnée.", desc: "Apprendre PHP pour gérer les formulaires, les sessions et les données." },
    { cat: 'web', title: 'Python — Les bases du développement', href: 'Python.html', slogan: "🐍 Serpent : simple, souple, il se faufile partout.", desc: "Découvrir Python, ses fondamentaux et ses usages en programmation." },
    { cat: 'web', title: 'Apprendre la programmation', href: 'Apprendre la programmation.html', slogan: "Passez de la logique à vos premiers programmes.", icon: 'programmation', desc: "Acquérir les notions essentielles pour comprendre et écrire du code." },
    { cat: 'web', title: 'Cours Bootstrap 5', href: 'bootstrap-cours.html', slogan: "Un design responsive en un clin d'œil.", icon: 'bootstrap', desc: "Concevoir des pages responsives avec Bootstrap 5." },
    { cat: 'web', title: 'Guide du portfolio', href: 'guide-portfolio.html', slogan: "Votre vitrine professionnelle, en ligne.", icon: 'portfolio', desc: "Créer et publier votre portfolio professionnel." },
    { cat: 'web', title: 'Formation DevOps — Laravel, PostgreSQL, Docker & Render', href: 'Formation DevOps — Laravel 13, PostgreSQL, Docker & Render.html', slogan: "🐙 Pieuvre : plusieurs outils, un seul déploiement maîtrisé.", desc: "Déployer une application Laravel avec PostgreSQL, Docker, GitHub Actions et Render." },

    // Bases de données
    { cat: 'data', title: 'PostgreSQL', href: 'PostgreSQL.html', slogan: "Éléphant : une mémoire fiable pour vos données.", icon: 'postgresql', desc: "Modéliser et interroger une base de données relationnelle avec PostgreSQL." },
    { cat: 'data', title: 'MongoDB', href: 'mongodb.html', slogan: "🍃 Feuille : vos données, légères et sans carcan.", desc: "Découvrir les bases de données orientées documents avec MongoDB." },

    // Ateliers et évaluations
    { cat: 'ateliers', title: 'Atelier pratique', href: 'round3-vscode.html', slogan: "🐝 Abeille : apprendre en pratiquant, une ligne à la fois.", desc: "Atelier guidé pour mettre en pratique les notions avec VS Code." },
    { cat: 'ateliers', title: 'Explication du code', href: 'explication-code-round3.html', slogan: "🦉 Hibou : comprendre chaque ligne, pas seulement la copier.", desc: "Lecture et explication détaillée du code de l'atelier." },
    { cat: 'ateliers', title: 'Quiz récapitulatif IA + PHP', href: 'quiz-ia-php.html', slogan: "🦊 Renard : malin, testez-vous et progressez.", desc: "Testez vos connaissances en IA et en PHP." },
    { cat: 'ateliers', title: 'QCM PHP et IA', href: 'qcm.html', slogan: "🐬 Dauphin : intelligent, mesurez ce que vous savez vraiment.", desc: "Questions à choix multiples pour vous évaluer." },

    // Marketing digital
    { cat: 'marketing', title: 'Cours illustré', href: 'marketing-digital-visuel.html', slogan: "🦋 Papillon : le marketing digital, expliqué en images.", desc: "Introduction visuelle au marketing digital." },
    { cat: 'marketing', title: 'TP Canva', href: 'tp-canva.html', slogan: "Créez des visuels qui se remarquent.", icon: 'canva', desc: "Travaux pratiques de création visuelle avec Canva." }
  ];

  var grid = document.getElementById('course-grid');
  var filters = document.getElementById('course-filters');
  var search = document.getElementById('course-search');
  var info = document.getElementById('results-info');
  var catSlogan = document.getElementById('cat-slogan');
  if (!grid || !filters || !search || !catSlogan) return;

  var catLabel = {};
  CATEGORIES.forEach(function (c) { catLabel[c.id] = c.label; });

  var state = { cat: 'all', q: '' };

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function matches(course) {
    if (state.cat !== 'all' && course.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = norm(course.title + ' ' + course.slogan + ' ' + course.desc + ' ' + catLabel[course.cat]);
    return state.q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function countFor(id) {
    return COURSES.filter(function (c) { return id === 'all' || c.cat === id; }).length;
  }

  /* Filtres */
  function buildFilters() {
    CATEGORIES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.dataset.cat = cat.id;
      btn.setAttribute('aria-pressed', 'false');

      var label = document.createElement('span');
      label.textContent = cat.label;
      var count = document.createElement('span');
      count.className = 'chip-count';
      count.textContent = countFor(cat.id);

      btn.appendChild(label);
      btn.appendChild(count);
      btn.addEventListener('click', function () { setCategory(cat.id); });
      filters.appendChild(btn);
    });
  }

  function setCategory(id) {
    state.cat = id;
    try {
      history.replaceState(null, '', id === 'all' ? location.pathname + location.search : '#' + id);
    } catch (e) { /* ignoré */ }
    render();
  }

  /* Cartes */
  function card(course) {
    var a = document.createElement('a');
    a.className = 'course-card';
    a.href = course.href;

    /* Le premier "mot" du slogan est l'emoji : on l'affiche en grand, en haut de la carte */
    /* Icône : SVG dessiné (champ "icon") ; sinon, l'emoji au début du slogan */
    var icon, sloganText;
    icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    if (course.icon && ICONS[course.icon]) {
      sloganText = course.slogan;
      icon.className = 'course-icon course-icon--svg';
      icon.innerHTML = ICONS[course.icon]; /* chaînes constantes définies ci-dessus */
    } else {
      var parts = course.slogan.match(/^(\S+)\s+([\s\S]*)$/);
      sloganText = parts ? parts[2] : course.slogan;
      icon.className = 'course-icon';
      icon.textContent = parts ? parts[1] : '';
    }

    var cat = document.createElement('span');
    cat.className = 'course-cat';
    cat.textContent = catLabel[course.cat];

    var h = document.createElement('h2');
    h.textContent = course.title;
    if (course.lang) { h.lang = course.lang; a.setAttribute('hreflang', course.lang); }

    var slogan = document.createElement('p');
    slogan.className = 'course-slogan';
    slogan.textContent = sloganText;
    if (course.lang) { slogan.lang = course.lang; slogan.dir = 'rtl'; }

    var p = document.createElement('p');
    p.className = 'course-desc';
    p.textContent = course.desc;

    var open = document.createElement('span');
    open.className = 'course-open';
    open.textContent = 'Ouvrir la formation →';

    a.appendChild(icon);
    a.appendChild(cat);
    a.appendChild(h);
    a.appendChild(slogan);
    a.appendChild(p);
    a.appendChild(open);
    return a;
  }

  function render() {
    var list = COURSES.filter(matches);

    grid.textContent = '';
    if (!list.length) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      var msg = document.createElement('p');
      msg.textContent = 'Aucune formation ne correspond à votre recherche.';
      var reset = document.createElement('button');
      reset.type = 'button';
      reset.textContent = 'Réinitialiser les filtres';
      reset.addEventListener('click', function () {
        search.value = '';
        state.q = '';
        setCategory('all');
      });
      empty.appendChild(msg);
      empty.appendChild(reset);
      grid.appendChild(empty);
    } else {
      var frag = document.createDocumentFragment();
      list.forEach(function (c) { frag.appendChild(card(c)); });
      grid.appendChild(frag);
    }

    Array.prototype.forEach.call(filters.children, function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.cat === state.cat));
    });

    catSlogan.textContent = CAT_SLOGANS[state.cat] || '';
    info.textContent = list.length + (list.length > 1 ? ' formations' : ' formation');
  }

  /* Recherche */
  var timer;
  search.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.q = norm(search.value.trim());
      render();
    }, 120);
  });

  /* Raccourcis clavier : "/" ou Ctrl/Cmd+K pour chercher, Échap pour effacer */
  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName);
    if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      search.focus();
      search.select();
    }
  });
  search.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && search.value) {
      search.value = '';
      state.q = '';
      render();
      e.stopPropagation();
    }
  });

  /* Filtre initial depuis l'URL (ex. formations.html#ia) */
  var hash = location.hash.replace('#', '');
  if (catLabel[hash]) state.cat = hash;

  buildFilters();
  render();

  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    state.cat = catLabel[h] ? h : 'all';
    render();
  });
})();