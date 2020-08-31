const gtm = {
  prod: {
    script: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P2G234S');
    `,
    iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-P2G234S`,
  },
  staging: {
    script: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=Zq_NAD141q3VSV26YQOh7w&gtm_preview=env-16&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P2G234S')
     `,
    iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-P2G234S&gtm_auth=Zq_NAD141q3VSV26YQOh7w&gtm_preview=env-16&gtm_cookies_win=x`,
  },
  dev: {
    script: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=Xz5UA8orz4YRoShA06tdcg&gtm_preview=env-15&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P2G234S');
    `,
    iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-P2G234S&gtm_auth=Xz5UA8orz4YRoShA06tdcg&gtm_preview=env-15&gtm_cookies_win=x`,
  },
}

const ENV = process.env.STOREFRONT_ENV

export const gtmScript =
  ENV === 'production' ? gtm.prod : ENV === 'staging' ? gtm.staging : gtm.dev
