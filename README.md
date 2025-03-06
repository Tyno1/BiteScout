
```
BiteScout
├─ .DS_Store
├─ backend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ controllers
│  │  │  ├─ authController.ts
│  │  │  ├─ foodCatalogueController.ts
│  │  │  ├─ notificationController.ts
│  │  │  ├─ restaurantController.ts
│  │  │  ├─ reviewController.ts
│  │  │  └─ userTypeController.ts
│  │  ├─ index.ts
│  │  ├─ middleware
│  │  │  └─ auth.js
│  │  ├─ models
│  │  │  ├─ Allergen.js
│  │  │  ├─ Course.js
│  │  │  ├─ CuisineType.js
│  │  │  ├─ FoodCatalogue.js
│  │  │  ├─ RestaurantData.d.ts
│  │  │  ├─ RestaurantData.js
│  │  │  ├─ User.js
│  │  │  └─ UserType.js
│  │  ├─ routes
│  │  │  ├─ auth.ts
│  │  │  ├─ foodCatalogue.ts
│  │  │  ├─ notification.ts
│  │  │  ├─ restaurant.ts
│  │  │  ├─ review.ts
│  │  │  └─ userType.ts
│  │  └─ types
│  │     ├─ foodCatalogue.ts
│  │     ├─ next-auth.d.ts
│  │     └─ restaurantData.ts
│  └─ tsconfig.json
├─ web
│  ├─ .DS_Store
│  ├─ .env
│  ├─ .eslintrc.json
│  ├─ .next
│  │  ├─ app-build-manifest.json
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ .tsbuildinfo
│  │  │  ├─ eslint
│  │  │  │  └─ .cache_ht984y
│  │  │  ├─ images
│  │  │  │  ├─ 2vHqzVMympAa-73vP7PoshttLRZVJ4ieXCTQzEEYQkw
│  │  │  │  │  └─ 60.1738326501974.k0HKr8V9NYABuQ8M1f8HAmQ_yr7vTTCJiUuPdqUbJfY.Vy8iM2JhNDlmLTE5NGI4OWU2MTYwIg.webp
│  │  │  │  ├─ Iv_5d09XYcDyVpG897e24kOA09RGp3w318qRh8fuIeY
│  │  │  │  │  └─ 60.1738190400907.irHNT3vEJp3DSVDUzEqjs3OZxyxa7XbnXSvlTNmmYpU.Vy8iMzZkNTc5LTE5NGI0MzdiOGJkIg.webp
│  │  │  │  ├─ LF_ZDqkS6uXKfiSsbRtTzd-l6k4KSBb2yi3crSXjJ5s
│  │  │  │  │  └─ 60.1737882854832.m4aT9U7_l1_cJ80tXIapGqtJessxCG3f9DAyNpFTJjo.Vy8iM2JhNDlmLTE5NGExYzMwNDM3Ig.webp
│  │  │  │  ├─ Pz_yubX-AA1cGy03rcYHINirV18XwWP2kN2eWcaU0Po
│  │  │  │  │  └─ 60.1739741069367.66RI55lwwaiErTGUlCZQLCoH8l6tamPEejysh3unOPo.Vy8iNTFmOTAtMTk1MTBhNGRjMGYi.webp
│  │  │  │  ├─ SMtC7GDXMqOxHA2XCpU0ToNKkh-cBTHhmsLnwGn4iD4
│  │  │  │  │  └─ 60.1738622593799.FtMRdjppJwt1waxF4hy9FI7jo-btZBd1QRCLlwDXhME.Vy8iNDVjZjEtMTk0Y2NmYWMzNzAi.webp
│  │  │  │  ├─ WecBqfmMqENNLUjxnE9h5SyxzBLadk0663JY66VO4YU
│  │  │  │  │  └─ 60.1737790081765.GXqSb71Tptsglo61TajL0BJW2ufg2CN9xqREiC447uE.Vy8iM2JhNDlmLTE5NDljNWI0OTUwIg.webp
│  │  │  │  ├─ XBd4NKbE_DBgDWG_Oq-XwASyItggnMz9Kb5r8QjU6Vo
│  │  │  │  │  └─ 60.1739836186373.yjv_GJKEXuS7QAx_SqAAKDmqNbcEOTgj1mm-ls8EsAY.Vy8iNTFmOTAtMTk1MTBhNGRjMGYi.webp
│  │  │  │  ├─ XR1kwbTM-cs2jW1sW6Y4hr_uV4yYC8cL-kjYo-01IXk
│  │  │  │  │  └─ 60.1738326501886.Adlqm7kWAr-8-_O3r_F1uSkhNbhHrueCtOHYo6T5GJ4.Vy8iNDgyMzBjLTE5NGI4OWU2MTYxIg.webp
│  │  │  │  ├─ Z61QfnKp4ZfzjxWNAZo1OIKTemzU2tI75WiYXIbbgMc
│  │  │  │  │  └─ 60.1738189412290.GeuL1i5Wdh7AZoAOe_VKT9F87Z6h9IXQlHggZ4SUQsQ.Vy8iM2JhNDlmLTE5NGI0Mjg5ZjUwIg.webp
│  │  │  │  ├─ aoDw_huEptCGas0_0YLQMQd-WplWuhInQ_t_t5AzLqE
│  │  │  │  │  └─ 60.1737848073673.Mljt1sNgFZCrY0vRTahhen0SDQW-0-xvjFTMlJdFAKg.Vy8iM2JhNDlmLTE5NDlmZDAzODE2Ig.webp
│  │  │  │  ├─ dLqeq7zuWM-Xbuywb5bhFTtDaqoQdXk5BGomsF-wVWE
│  │  │  │  │  └─ 60.1737882854564.kvy5f6Z3pAf93JtdihupUQJvrlwUHGtj5EizOv3zvmo.Vy8iNDgyMzBjLTE5NGExYzMwNDM3Ig.webp
│  │  │  │  ├─ dV4-KvIZYr-vQ-SOBBLcYlpkkoEEPL-cHZbRFqnu8oU
│  │  │  │  │  └─ 60.1739060117833.O2O58Cd9jtPMyum8663jgCUSRcCZbOWh2mrfxDAMk6k.Vy8iNTFmOTAtMTk0ZTgwZTNiMmUi.webp
│  │  │  │  ├─ ir_hLHyxbBSIpmj_IgEiqywiy08cnEkAeldCqlUlGuE
│  │  │  │  │  └─ 60.1740071651292.IyN0GF9KoAm08mIF-dMqK2n9_1cT6KqScK2Zf-StIAw.Vy8iMzZkNTc5LTE5NTFhNmJiNTIyIg.webp
│  │  │  │  ├─ lfaezGKVuKQfZSQZYpkdbMdRj7jg3PGHCwJsDwGNUlI
│  │  │  │  │  └─ 60.1739741657136.0DJiLfttvV3x0QnKB9c2gPgOZhHI89ibAqx0woIJ6d4.Vy8iMzZkNTc5LTE5NTEwYTRkYzBlIg.webp
│  │  │  │  ├─ mfbcM44g_hKCP0PaSSDlKLCcoaUk1rlH6M_QbGOMdlM
│  │  │  │  │  └─ 60.1737882853699.ckXGe7z36Z0fY_90ZDLFGYqJnb_Rbuv9RfTHuC88hqU.Vy8iNDVjZjEtMTk0YTFjMzA0MzYi.webp
│  │  │  │  ├─ oyTpE6ZfMPvlOFSjebOyRsq79u03bDODDAjsiV-TYXU
│  │  │  │  │  └─ 60.1738189412069.qnFDHTBEKDTQ-vhBk_xw8-xtsZ2zAdzfB8zXHkpG9Fs.Vy8iNDgyMzBjLTE5NGI0Mjg5ZjUxIg.webp
│  │  │  │  ├─ p0oaWzB5Q_F6biWKx5cBNUJEQLy5Zbcm-pR126FABYM
│  │  │  │  │  └─ 60.1738573092805.X_DDdqE5crWyv0wR2y7hQ7dsSqmEMBVN8jwcLARj3rA.Vy8iNTFmOTAtMTk0YzM0NjZjZjci.webp
│  │  │  │  ├─ pLGHBl4py1A9fm8mhnnjUGLDUD4C08siwqsYB6wu1dU
│  │  │  │  │  └─ 60.1739651923288.33nD6I10TKaA0j1g2wcuOshfY47J1W1hQgkfUr3nCD8.Vy8iMzZkNTc5LTE5NTBiNDJhNDQwIg.webp
│  │  │  │  ├─ yHX51dMoDJhS94iumhNzS3kdylTmU5a1L5nTtBiMSaU
│  │  │  │  │  └─ 60.1737848073168.QUMkCm57PsUB-gj8GJo_eeWgnYlZ9lOn_gqYBdTdpMc.Vy8iNDgyMzBjLTE5NDlmZDAzODE3Ig.webp
│  │  │  │  └─ yn-UYUmgNNLJayhqLnzPP9tE291dcFJpZPttVQGCmzw
│  │  │  │     └─ 60.1737790080324.BSIN-xkomwa9pHhgFUeFHP0k0gbfbuiGCcJLSldhb3w.Vy8iNDgyMzBjLTE5NDljNWI0OTUwIg.webp
│  │  │  ├─ swc
│  │  │  │  └─ plugins
│  │  │  │     └─ v7_macos_aarch64_4.0.0
│  │  │  └─ webpack
│  │  │     ├─ client-development
│  │  │     │  ├─ 0.pack.gz
│  │  │     │  ├─ 1.pack.gz
│  │  │     │  ├─ 10.pack.gz
│  │  │     │  ├─ 11.pack.gz
│  │  │     │  ├─ 12.pack.gz
│  │  │     │  ├─ 13.pack.gz
│  │  │     │  ├─ 14.pack.gz
│  │  │     │  ├─ 15.pack.gz
│  │  │     │  ├─ 16.pack.gz
│  │  │     │  ├─ 17.pack.gz
│  │  │     │  ├─ 18.pack.gz
│  │  │     │  ├─ 19.pack.gz
│  │  │     │  ├─ 2.pack.gz
│  │  │     │  ├─ 20.pack.gz
│  │  │     │  ├─ 21.pack.gz
│  │  │     │  ├─ 22.pack.gz
│  │  │     │  ├─ 23.pack.gz
│  │  │     │  ├─ 24.pack.gz
│  │  │     │  ├─ 25.pack.gz
│  │  │     │  ├─ 26.pack.gz
│  │  │     │  ├─ 27.pack.gz
│  │  │     │  ├─ 28.pack.gz
│  │  │     │  ├─ 29.pack.gz
│  │  │     │  ├─ 3.pack.gz
│  │  │     │  ├─ 30.pack.gz
│  │  │     │  ├─ 4.pack.gz
│  │  │     │  ├─ 5.pack.gz
│  │  │     │  ├─ 6.pack.gz
│  │  │     │  ├─ 7.pack.gz
│  │  │     │  ├─ 8.pack.gz
│  │  │     │  ├─ 9.pack.gz
│  │  │     │  ├─ index.pack.gz
│  │  │     │  └─ index.pack.gz.old
│  │  │     ├─ client-development-fallback
│  │  │     │  ├─ 0.pack.gz
│  │  │     │  ├─ 1.pack.gz
│  │  │     │  ├─ 2.pack.gz
│  │  │     │  ├─ index.pack.gz
│  │  │     │  └─ index.pack.gz.old
│  │  │     ├─ client-production
│  │  │     │  ├─ 0.pack
│  │  │     │  ├─ 1.pack
│  │  │     │  ├─ 2.pack
│  │  │     │  ├─ 3.pack
│  │  │     │  ├─ 4.pack
│  │  │     │  ├─ 5.pack
│  │  │     │  ├─ 6.pack
│  │  │     │  ├─ 7.pack
│  │  │     │  ├─ 8.pack
│  │  │     │  ├─ index.pack
│  │  │     │  └─ index.pack.old
│  │  │     ├─ edge-server-production
│  │  │     │  ├─ 0.pack
│  │  │     │  └─ index.pack
│  │  │     ├─ server-development
│  │  │     │  ├─ 0.pack.gz
│  │  │     │  ├─ 1.pack.gz
│  │  │     │  ├─ 10.pack.gz
│  │  │     │  ├─ 11.pack.gz
│  │  │     │  ├─ 12.pack.gz
│  │  │     │  ├─ 13.pack.gz
│  │  │     │  ├─ 14.pack.gz
│  │  │     │  ├─ 15.pack.gz
│  │  │     │  ├─ 16.pack.gz
│  │  │     │  ├─ 17.pack.gz
│  │  │     │  ├─ 18.pack.gz
│  │  │     │  ├─ 19.pack.gz
│  │  │     │  ├─ 2.pack.gz
│  │  │     │  ├─ 20.pack.gz
│  │  │     │  ├─ 21.pack.gz
│  │  │     │  ├─ 22.pack.gz
│  │  │     │  ├─ 23.pack.gz
│  │  │     │  ├─ 24.pack.gz
│  │  │     │  ├─ 25.pack.gz
│  │  │     │  ├─ 26.pack.gz
│  │  │     │  ├─ 27.pack.gz
│  │  │     │  ├─ 28.pack.gz
│  │  │     │  ├─ 29.pack.gz
│  │  │     │  ├─ 3.pack.gz
│  │  │     │  ├─ 30.pack.gz
│  │  │     │  ├─ 31.pack.gz
│  │  │     │  ├─ 32.pack.gz
│  │  │     │  ├─ 33.pack.gz
│  │  │     │  ├─ 4.pack.gz
│  │  │     │  ├─ 5.pack.gz
│  │  │     │  ├─ 6.pack.gz
│  │  │     │  ├─ 7.pack.gz
│  │  │     │  ├─ 8.pack.gz
│  │  │     │  ├─ 9.pack.gz
│  │  │     │  ├─ index.pack.gz
│  │  │     │  └─ index.pack.gz.old
│  │  │     └─ server-production
│  │  │        ├─ 0.pack
│  │  │        ├─ 1.pack
│  │  │        ├─ 2.pack
│  │  │        ├─ 3.pack
│  │  │        ├─ 4.pack
│  │  │        ├─ 5.pack
│  │  │        ├─ index.pack
│  │  │        └─ index.pack.old
│  │  ├─ fallback-build-manifest.json
│  │  ├─ package.json
│  │  ├─ react-loadable-manifest.json
│  │  ├─ server
│  │  │  ├─ _error.js
│  │  │  ├─ app
│  │  │  │  ├─ _not-found
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ api
│  │  │  │  │  └─ auth
│  │  │  │  │     └─ [...nextauth]
│  │  │  │  │        ├─ route.js
│  │  │  │  │        └─ route_client-reference-manifest.js
│  │  │  │  ├─ favicon.ico
│  │  │  │  │  └─ route.js
│  │  │  │  ├─ login
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  └─ register
│  │  │  │     ├─ page.js
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ middleware-react-loadable-manifest.js
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  ├─ _document.js
│  │  │  │  └─ _error.js
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  ├─ server-reference-manifest.json
│  │  │  ├─ vendor-chunks
│  │  │  │  ├─ @auth.js
│  │  │  │  ├─ @panva.js
│  │  │  │  ├─ @reduxjs.js
│  │  │  │  ├─ @swc.js
│  │  │  │  ├─ asynckit.js
│  │  │  │  ├─ axios.js
│  │  │  │  ├─ clsx.js
│  │  │  │  ├─ combined-stream.js
│  │  │  │  ├─ cookie.js
│  │  │  │  ├─ debug.js
│  │  │  │  ├─ delayed-stream.js
│  │  │  │  ├─ follow-redirects.js
│  │  │  │  ├─ form-data.js
│  │  │  │  ├─ has-flag.js
│  │  │  │  ├─ immer.js
│  │  │  │  ├─ jose.js
│  │  │  │  ├─ lucide-react.js
│  │  │  │  ├─ mime-db.js
│  │  │  │  ├─ mime-types.js
│  │  │  │  ├─ ms.js
│  │  │  │  ├─ next-auth.js
│  │  │  │  ├─ next.js
│  │  │  │  ├─ oauth4webapi.js
│  │  │  │  ├─ preact-render-to-string.js
│  │  │  │  ├─ preact.js
│  │  │  │  ├─ proxy-from-env.js
│  │  │  │  ├─ react-redux.js
│  │  │  │  ├─ react-toastify.js
│  │  │  │  ├─ redux-persist.js
│  │  │  │  ├─ redux-thunk.js
│  │  │  │  ├─ redux.js
│  │  │  │  ├─ reselect.js
│  │  │  │  ├─ supports-color.js
│  │  │  │  └─ use-sync-external-store.js
│  │  │  └─ webpack-runtime.js
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ _error.js
│  │  │  │  ├─ app
│  │  │  │  │  ├─ _not-found
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ auth
│  │  │  │  │  │     └─ [...nextauth]
│  │  │  │  │  │        └─ route.js
│  │  │  │  │  ├─ layout.js
│  │  │  │  │  ├─ login
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  └─ register
│  │  │  │  │     └─ page.js
│  │  │  │  ├─ app-pages-internals.js
│  │  │  │  ├─ fallback
│  │  │  │  │  ├─ amp.js
│  │  │  │  │  ├─ main.js
│  │  │  │  │  ├─ pages
│  │  │  │  │  │  ├─ _app.js
│  │  │  │  │  │  └─ _error.js
│  │  │  │  │  ├─ react-refresh.js
│  │  │  │  │  └─ webpack.js
│  │  │  │  ├─ main-app.js
│  │  │  │  ├─ main.js
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ _app.js
│  │  │  │  │  └─ _error.js
│  │  │  │  ├─ polyfills.js
│  │  │  │  ├─ react-refresh.js
│  │  │  │  └─ webpack.js
│  │  │  ├─ css
│  │  │  │  └─ app
│  │  │  │     └─ layout.css
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  ├─ media
│  │  │  │  ├─ 021bc4481ed92ece-s.woff2
│  │  │  │  ├─ 3f69592b2fe603c7-s.woff2
│  │  │  │  ├─ 4f05ba3a6752a328-s.p.woff2
│  │  │  │  ├─ 6325a8417175c41d-s.woff2
│  │  │  │  └─ 99b7f73d5af7c3e2-s.woff2
│  │  │  └─ webpack
│  │  │     ├─ 04c6a89333a50faf.webpack.hot-update.json
│  │  │     ├─ 0676db6426900e36.webpack.hot-update.json
│  │  │     ├─ 098b08203b5aad87.webpack.hot-update.json
│  │  │     ├─ 1cca2830a222edd1.webpack.hot-update.json
│  │  │     ├─ 307b1b3c9b7c6af7.webpack.hot-update.json
│  │  │     ├─ 316b89ae3632f503.webpack.hot-update.json
│  │  │     ├─ 3ca9e63de6508b2b.webpack.hot-update.json
│  │  │     ├─ 3d137c220037fbbc.webpack.hot-update.json
│  │  │     ├─ 4010d94258fb746a.webpack.hot-update.json
│  │  │     ├─ 596d156333235081.webpack.hot-update.json
│  │  │     ├─ 5a847931947915d9.webpack.hot-update.json
│  │  │     ├─ 633457081244afec._.hot-update.json
│  │  │     ├─ 65432a3c1b9f650f.webpack.hot-update.json
│  │  │     ├─ 6e37522d2a4ff5f1.webpack.hot-update.json
│  │  │     ├─ 7641b298977cd570.webpack.hot-update.json
│  │  │     ├─ 7936f40d9e9dbb02.webpack.hot-update.json
│  │  │     ├─ 7cec4b4ad6be7106.webpack.hot-update.json
│  │  │     ├─ 8f0f81530f0f7269.webpack.hot-update.json
│  │  │     ├─ 94d25798b58e4e72.webpack.hot-update.json
│  │  │     ├─ a4e868b27a7636a8.webpack.hot-update.json
│  │  │     ├─ app
│  │  │     │  ├─ layout.04c6a89333a50faf.hot-update.js
│  │  │     │  ├─ layout.0676db6426900e36.hot-update.js
│  │  │     │  ├─ layout.098b08203b5aad87.hot-update.js
│  │  │     │  ├─ layout.1cca2830a222edd1.hot-update.js
│  │  │     │  ├─ layout.307b1b3c9b7c6af7.hot-update.js
│  │  │     │  ├─ layout.316b89ae3632f503.hot-update.js
│  │  │     │  ├─ layout.3ca9e63de6508b2b.hot-update.js
│  │  │     │  ├─ layout.3d137c220037fbbc.hot-update.js
│  │  │     │  ├─ layout.596d156333235081.hot-update.js
│  │  │     │  ├─ layout.6e37522d2a4ff5f1.hot-update.js
│  │  │     │  ├─ layout.7641b298977cd570.hot-update.js
│  │  │     │  ├─ layout.7936f40d9e9dbb02.hot-update.js
│  │  │     │  ├─ layout.7cec4b4ad6be7106.hot-update.js
│  │  │     │  ├─ layout.8f0f81530f0f7269.hot-update.js
│  │  │     │  ├─ layout.94d25798b58e4e72.hot-update.js
│  │  │     │  ├─ layout.a4e868b27a7636a8.hot-update.js
│  │  │     │  ├─ layout.b293cb42eb8dcfe7.hot-update.js
│  │  │     │  ├─ layout.b663a5fca094b2fc.hot-update.js
│  │  │     │  ├─ layout.baee6830c292d879.hot-update.js
│  │  │     │  ├─ layout.c36ddb1697678371.hot-update.js
│  │  │     │  ├─ layout.c6a9dee7e0c618f6.hot-update.js
│  │  │     │  ├─ layout.d0bfe152a6353424.hot-update.js
│  │  │     │  ├─ layout.d1794cbcc2b8cc6e.hot-update.js
│  │  │     │  ├─ layout.d2e49ef4fd0e2110.hot-update.js
│  │  │     │  ├─ layout.d6b842cc8db1e1b8.hot-update.js
│  │  │     │  ├─ layout.d716d2487aeb41a0.hot-update.js
│  │  │     │  ├─ layout.db14585e70dc56fa.hot-update.js
│  │  │     │  ├─ layout.dcdf04a3bf5ac04d.hot-update.js
│  │  │     │  ├─ layout.e42da75ac6c699f9.hot-update.js
│  │  │     │  ├─ layout.e4a8a8b8ded47277.hot-update.js
│  │  │     │  ├─ layout.ea408ca812e72eb7.hot-update.js
│  │  │     │  ├─ layout.eace4e91df667f93.hot-update.js
│  │  │     │  ├─ layout.f15f7989c164de30.hot-update.js
│  │  │     │  ├─ layout.ff8dc672535c5361.hot-update.js
│  │  │     │  ├─ login
│  │  │     │  │  ├─ page.04c6a89333a50faf.hot-update.js
│  │  │     │  │  ├─ page.098b08203b5aad87.hot-update.js
│  │  │     │  │  ├─ page.1cca2830a222edd1.hot-update.js
│  │  │     │  │  ├─ page.3ca9e63de6508b2b.hot-update.js
│  │  │     │  │  ├─ page.6e37522d2a4ff5f1.hot-update.js
│  │  │     │  │  ├─ page.94d25798b58e4e72.hot-update.js
│  │  │     │  │  ├─ page.a4e868b27a7636a8.hot-update.js
│  │  │     │  │  ├─ page.baee6830c292d879.hot-update.js
│  │  │     │  │  ├─ page.c6a9dee7e0c618f6.hot-update.js
│  │  │     │  │  ├─ page.d0bfe152a6353424.hot-update.js
│  │  │     │  │  ├─ page.d6b842cc8db1e1b8.hot-update.js
│  │  │     │  │  ├─ page.db14585e70dc56fa.hot-update.js
│  │  │     │  │  ├─ page.dcdf04a3bf5ac04d.hot-update.js
│  │  │     │  │  └─ page.eace4e91df667f93.hot-update.js
│  │  │     │  └─ register
│  │  │     │     ├─ page.b663a5fca094b2fc.hot-update.js
│  │  │     │     ├─ page.d0bfe152a6353424.hot-update.js
│  │  │     │     ├─ page.ea408ca812e72eb7.hot-update.js
│  │  │     │     └─ page.ff8dc672535c5361.hot-update.js
│  │  │     ├─ b293cb42eb8dcfe7.webpack.hot-update.json
│  │  │     ├─ b663a5fca094b2fc.webpack.hot-update.json
│  │  │     ├─ baee6830c292d879.webpack.hot-update.json
│  │  │     ├─ c27c51d11278aebf.webpack.hot-update.json
│  │  │     ├─ c36ddb1697678371.webpack.hot-update.json
│  │  │     ├─ c6a9dee7e0c618f6.webpack.hot-update.json
│  │  │     ├─ cad221aead3e8447.webpack.hot-update.json
│  │  │     ├─ d0bfe152a6353424.webpack.hot-update.json
│  │  │     ├─ d1794cbcc2b8cc6e.webpack.hot-update.json
│  │  │     ├─ d2e49ef4fd0e2110.webpack.hot-update.json
│  │  │     ├─ d6b842cc8db1e1b8.webpack.hot-update.json
│  │  │     ├─ d716d2487aeb41a0.webpack.hot-update.json
│  │  │     ├─ db14585e70dc56fa.webpack.hot-update.json
│  │  │     ├─ dcdf04a3bf5ac04d.webpack.hot-update.json
│  │  │     ├─ e28041df5b7330fd.webpack.hot-update.json
│  │  │     ├─ e42da75ac6c699f9.webpack.hot-update.json
│  │  │     ├─ e4a8a8b8ded47277.webpack.hot-update.json
│  │  │     ├─ ea408ca812e72eb7.webpack.hot-update.json
│  │  │     ├─ eace4e91df667f93.webpack.hot-update.json
│  │  │     ├─ f15f7989c164de30.webpack.hot-update.json
│  │  │     ├─ ff8dc672535c5361.webpack.hot-update.json
│  │  │     ├─ webpack.04c6a89333a50faf.hot-update.js
│  │  │     ├─ webpack.0676db6426900e36.hot-update.js
│  │  │     ├─ webpack.098b08203b5aad87.hot-update.js
│  │  │     ├─ webpack.1cca2830a222edd1.hot-update.js
│  │  │     ├─ webpack.307b1b3c9b7c6af7.hot-update.js
│  │  │     ├─ webpack.316b89ae3632f503.hot-update.js
│  │  │     ├─ webpack.3ca9e63de6508b2b.hot-update.js
│  │  │     ├─ webpack.3d137c220037fbbc.hot-update.js
│  │  │     ├─ webpack.4010d94258fb746a.hot-update.js
│  │  │     ├─ webpack.596d156333235081.hot-update.js
│  │  │     ├─ webpack.5a847931947915d9.hot-update.js
│  │  │     ├─ webpack.65432a3c1b9f650f.hot-update.js
│  │  │     ├─ webpack.6e37522d2a4ff5f1.hot-update.js
│  │  │     ├─ webpack.7641b298977cd570.hot-update.js
│  │  │     ├─ webpack.7936f40d9e9dbb02.hot-update.js
│  │  │     ├─ webpack.7cec4b4ad6be7106.hot-update.js
│  │  │     ├─ webpack.8f0f81530f0f7269.hot-update.js
│  │  │     ├─ webpack.94d25798b58e4e72.hot-update.js
│  │  │     ├─ webpack.a4e868b27a7636a8.hot-update.js
│  │  │     ├─ webpack.b293cb42eb8dcfe7.hot-update.js
│  │  │     ├─ webpack.b663a5fca094b2fc.hot-update.js
│  │  │     ├─ webpack.baee6830c292d879.hot-update.js
│  │  │     ├─ webpack.c27c51d11278aebf.hot-update.js
│  │  │     ├─ webpack.c36ddb1697678371.hot-update.js
│  │  │     ├─ webpack.c6a9dee7e0c618f6.hot-update.js
│  │  │     ├─ webpack.cad221aead3e8447.hot-update.js
│  │  │     ├─ webpack.d0bfe152a6353424.hot-update.js
│  │  │     ├─ webpack.d1794cbcc2b8cc6e.hot-update.js
│  │  │     ├─ webpack.d2e49ef4fd0e2110.hot-update.js
│  │  │     ├─ webpack.d6b842cc8db1e1b8.hot-update.js
│  │  │     ├─ webpack.d716d2487aeb41a0.hot-update.js
│  │  │     ├─ webpack.db14585e70dc56fa.hot-update.js
│  │  │     ├─ webpack.dcdf04a3bf5ac04d.hot-update.js
│  │  │     ├─ webpack.e28041df5b7330fd.hot-update.js
│  │  │     ├─ webpack.e42da75ac6c699f9.hot-update.js
│  │  │     ├─ webpack.e4a8a8b8ded47277.hot-update.js
│  │  │     ├─ webpack.ea408ca812e72eb7.hot-update.js
│  │  │     ├─ webpack.eace4e91df667f93.hot-update.js
│  │  │     ├─ webpack.f15f7989c164de30.hot-update.js
│  │  │     └─ webpack.ff8dc672535c5361.hot-update.js
│  │  ├─ trace
│  │  └─ types
│  │     ├─ app
│  │     │  ├─ api
│  │     │  │  └─ auth
│  │     │  │     └─ [...nextauth]
│  │     │  │        └─ route.ts
│  │     │  ├─ layout.ts
│  │     │  ├─ login
│  │     │  │  └─ page.ts
│  │     │  └─ register
│  │     │     └─ page.ts
│  │     ├─ cache-life.d.ts
│  │     └─ package.json
│  ├─ .swc
│  │  └─ plugins
│  │     └─ v7_macos_aarch64_4.0.0
│  ├─ README.md
│  ├─ __tests__
│  ├─ jest.config.ts
│  ├─ jest.setup.js
│  ├─ next-env.d.ts
│  ├─ next.config.mjs
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ src
│  │  ├─ .DS_Store
│  │  ├─ app
│  │  │  ├─ .DS_Store
│  │  │  ├─ about
│  │  │  │  └─ page.tsx
│  │  │  ├─ actions
│  │  │  │  └─ index.js
│  │  │  ├─ api
│  │  │  │  ├─ auth
│  │  │  │  │  └─ [...nextauth]
│  │  │  │  │     └─ route.ts
│  │  │  │  ├─ follow
│  │  │  │  ├─ food-catalogue
│  │  │  │  │  ├─ [id]
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ allergens
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ course
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ cuisine
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ restaurant
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ food-items
│  │  │  │  ├─ models
│  │  │  │  │  ├─ Allergen.js
│  │  │  │  │  ├─ Course.js
│  │  │  │  │  ├─ CuisineType.js
│  │  │  │  │  ├─ FoodCatalogue.js
│  │  │  │  │  ├─ RestaurantData.js
│  │  │  │  │  ├─ User.js
│  │  │  │  │  └─ UserType.js
│  │  │  │  ├─ notifications
│  │  │  │  ├─ register
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ restaurant
│  │  │  │  │  ├─ owner
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ reviews
│  │  │  │  └─ usertype
│  │  │  │     └─ route.ts
│  │  │  ├─ contact
│  │  │  │  └─ page.tsx
│  │  │  ├─ dashboard
│  │  │  │  ├─ ai-audio
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ analytics
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ components
│  │  │  │  │  ├─ food-catalogue
│  │  │  │  │  │  ├─ Modal.tsx
│  │  │  │  │  │  └─ Table.tsx
│  │  │  │  │  └─ restaurant-profile
│  │  │  │  │     ├─ BasicInformation.tsx
│  │  │  │  │     ├─ BusinessHours.tsx
│  │  │  │  │     ├─ ContactInformation.tsx
│  │  │  │  │     ├─ Features.tsx
│  │  │  │  │     └─ Hero.tsx
│  │  │  │  ├─ customer-insight
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ food-catalogue
│  │  │  │  │  ├─ [id]
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ notifications
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ restaurant-profile
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ reviews
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ settings
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ user-management
│  │  │  │     └─ page.tsx
│  │  │  ├─ favicon.ico
│  │  │  ├─ fonts
│  │  │  │  ├─ GeistMonoVF.woff
│  │  │  │  └─ GeistVF.woff
│  │  │  ├─ globals.css
│  │  │  ├─ hooks
│  │  │  │  └─ useFetch.ts
│  │  │  ├─ layout.tsx
│  │  │  ├─ login
│  │  │  │  ├─ loading
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ onboarding
│  │  │  │  ├─ restaurant-search
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ roles
│  │  │  │     └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ register
│  │  │  │  └─ page.tsx
│  │  │  └─ services
│  │  │     └─ page.tsx
│  │  ├─ assets
│  │  │  ├─ .DS_Store
│  │  │  ├─ hero
│  │  │  │  ├─ fabrizio-magoni-boaDpmC-_Xo-unsplash 2.jpg
│  │  │  │  ├─ lum3n-cHc5H3_FKhs-unsplash.jpg
│  │  │  │  └─ mgg-vitchakorn-DDn9I5V1ubE-unsplash.jpg
│  │  │  └─ images
│  │  │     ├─ .DS_Store
│  │  │     └─ profile.png
│  │  ├─ auth.ts
│  │  ├─ components
│  │  │  ├─ Provider.tsx
│  │  │  ├─ ReduxProvider.tsx
│  │  │  ├─ atoms
│  │  │  │  ├─ buttons
│  │  │  │  │  └─ Button.tsx
│  │  │  │  └─ inputs
│  │  │  │     └─ Input.tsx
│  │  │  ├─ molecules
│  │  │  │  ├─ Navbar.tsx
│  │  │  │  └─ forms
│  │  │  │     ├─ LoginForm.tsx
│  │  │  │     ├─ RegisterForm.tsx
│  │  │  │     ├─ SocialLogin.tsx
│  │  │  │     └─ login.test.tsx
│  │  │  ├─ organisms
│  │  │  └─ ui
│  │  │     ├─ Dashboard
│  │  │     │  ├─ Modal.tsx
│  │  │     │  └─ SideNav.tsx
│  │  │     ├─ Footer.tsx
│  │  │     └─ Home
│  │  │        ├─ CallToAction.tsx
│  │  │        ├─ Features.tsx
│  │  │        ├─ Hero.tsx
│  │  │        ├─ PopularDestinations.tsx
│  │  │        ├─ Testimonies.tsx
│  │  │        └─ TopMeals.tsx
│  │  ├─ middleware
│  │  │  ├─ admin.js
│  │  │  ├─ auth.js
│  │  │  ├─ manager.js
│  │  │  ├─ root.js
│  │  │  └─ staff.js
│  │  ├─ state
│  │  │  ├─ allergen
│  │  │  │  └─ allergenSlice.ts
│  │  │  ├─ course
│  │  │  │  └─ courseSlice.ts
│  │  │  ├─ cuisine
│  │  │  │  └─ cuisineSlice.ts
│  │  │  ├─ foodCatalogueData
│  │  │  │  └─ foodCatalogueSlice.ts
│  │  │  ├─ restaurantData
│  │  │  │  └─ restaurantDataSlice.ts
│  │  │  └─ store.ts
│  │  ├─ types
│  │  │  ├─ foodCatalogue.ts
│  │  │  ├─ next-auth.d.ts
│  │  │  └─ restaurantData.ts
│  │  └─ utils
│  │     └─ db.js
│  ├─ tailwind.config.ts
│  ├─ tsconfig.json
│  └─ yarn.lock
└─ web-app
   ├─ .vite
   │  └─ deps
   │     ├─ _metadata.json
   │     ├─ chunk-6JKWCWVM.js
   │     ├─ chunk-6JKWCWVM.js.map
   │     ├─ chunk-K5LUDHM4.js
   │     ├─ chunk-K5LUDHM4.js.map
   │     ├─ package.json
   │     ├─ react-dom_client.js
   │     ├─ react-dom_client.js.map
   │     ├─ react-router-dom.js
   │     ├─ react-router-dom.js.map
   │     ├─ react.js
   │     ├─ react.js.map
   │     ├─ react_jsx-dev-runtime.js
   │     └─ react_jsx-dev-runtime.js.map
   ├─ README.md
   ├─ __tests__
   ├─ eslint.config.js
   ├─ index.html
   ├─ jest.setup.js
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ vite.svg
   ├─ src
   │  ├─ assets
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ atoms
   │  │  │  ├─ buttons
   │  │  │  │  └─ Button.tsx
   │  │  │  └─ inputs
   │  │  │     └─ Input.tsx
   │  │  ├─ molecules
   │  │  │  ├─ Navbar.tsx
   │  │  │  └─ forms
   │  │  │     ├─ LoginForm.tsx
   │  │  │     ├─ RegisterForm.tsx
   │  │  │     ├─ SocialLogin.tsx
   │  │  │     └─ login.test.tsx
   │  │  └─ pages
   │  │     ├─ About
   │  │     └─ Home
   │  │        ├─ Home
   │  │        │  ├─ CallToAction.tsx
   │  │        │  ├─ Features.tsx
   │  │        │  ├─ Hero.tsx
   │  │        │  ├─ PopularDestinations.tsx
   │  │        │  ├─ Testimonies.tsx
   │  │        │  └─ TopMeals.tsx
   │  │        └─ index.tsx
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ state
   │  │  ├─ allergen
   │  │  │  └─ allergenSlice.ts
   │  │  ├─ course
   │  │  │  └─ courseSlice.ts
   │  │  ├─ cuisine
   │  │  │  └─ cuisineSlice.ts
   │  │  ├─ foodCatalogueData
   │  │  │  └─ foodCatalogueSlice.ts
   │  │  ├─ restaurantData
   │  │  │  └─ restaurantDataSlice.ts
   │  │  └─ store.ts
   │  ├─ types
   │  │  ├─ foodCatalogue.ts
   │  │  ├─ next-auth.d.ts
   │  │  └─ restaurantData.ts
   │  └─ vite-env.d.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts

```