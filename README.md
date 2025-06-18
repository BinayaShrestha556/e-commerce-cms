# **E-commerce CMS**

## Folder structure:

E-COMMERCE  
├── .next/  
├── actions/  
│ ├── get-graph-revenue.ts  
│ ├── get-sales-count.ts  
│ ├── get-stock-count.ts  
│ └── get-total-revenue.ts  
├── app/  
│ ├── (dashboard)/[storeId]/  
│ │ ├── (routes)/  
│ │ │ ├── api/  
│ │ │ │ └── page.tsx  
│ │ │ ├── billboards/  
│ │ │ ├── categories/  
│ │ │ ├── colors/  
│ │ │ ├── orders/  
│ │ │ ├── products/  
│ │ │ ├── settings/  
│ │ │ └── sizes/  
│ │ │ └── page.tsx  
│ │ ├── billboards/  
│ │ │ ├── [billboardId]/  
│ │ │ │ ├── components/  
│ │ │ │ └── page.tsx  
│ │ │ └── page.tsx  
│ │ ├── categories/  
│ │ ├── colors/  
│ │ ├── orders/  
│ │ ├── products/  
│ │ ├── settings/  
│ │ ├── sizes/  
│ │ ├── loading.tsx  
│ │ ├── layout.tsx  
│ │ └── page.tsx  
│ ├── (root)/  
│ │ ├── (routes)/  
│ │ │ ├── page.tsx  
│ │ │ └── layout.tsx  
│ │ └── page.tsx  
│ ├── api/  
│ │ └── [storeId]/  
│ │ ├── billboards/  
│ │ ├── categories/  
│ │ ├── colors/  
│ │ ├── orders/  
│ │ ├── products/  
│ │ ├── sizes/  
│ │ ├── auth/  
│ │ └── stores/  
│ ├── auth/  
│ │ ├── change-password/  
│ │ ├── error/  
│ │ ├── login/  
│ │ ├── new-verification/  
│ │ ├── register/  
│ │ ├── users/  
│ │ └── layout.tsx  
│ ├── components/  
│ │ ├── auth/  
│ │ │ └── login/  
│ │ │ ├── login-form.tsx  
│ │ │ ├── register-form.tsx  
│ │ │ ├── socials.tsx  
│ │ │ ├── error-card.tsx  
│ │ │ ├── logout-button.tsx  
│ │ │ ├── new-verification.tsx  
│ │ │ ├── password-reset-form.tsx  
│ │ │ └── set-password.tsx  
│ │ ├── modals/  
│ │ └── ui/  
│ │ ├── contact-form.tsx  
│ │ ├── footer.tsx  
│ │ ├── mainNav.tsx  
│ │ ├── navbar.tsx  
│ │ ├── overview.tsx  
│ │ ├── sidebar.tsx  
│ │ ├── storeSwitcher.tsx  
│ │ ├── theme-toggle.tsx  
│ │ └── user-options.tsx  
│ ├── data/  
│ │ ├── password-reset-token.ts  
│ │ ├── user.ts  
│ │ └── verification-token.ts  
│ ├── fonts/  
│ │ ├── GeistMonoVF.woff  
│ │ └── GeistMonoVF.woff  
│ ├── hooks/  
│ │ ├── use-client-user.ts  
│ │ ├── use-origin.ts  
│ │ ├── use-server-user.ts  
│ │ └── use-store-modal.tsx  
│ ├── lib/  
│ │ ├── mail.ts  
│ │ ├── prismadb.ts  
│ │ ├── tokens.ts  
│ │ └── utils.ts  
│ ├── providers/  
│ │ ├── modal-provider.tsx  
│ │ ├── theme-provider.tsx  
│ │ └── toast-provider.tsx  
│ ├── schemas/  
│ │ └── index.ts  
│ ├── server-actions/  
│ │ ├── contact.ts  
│ │ ├── login.ts  
│ │ ├── new-verification.ts  
│ │ ├── password-reset.ts  
│ │ ├── register.ts  
│ │ └── set-password.ts  
│ ├── favicon.ico  
│ ├── globals.css  
│ └── layout.tsx  
├── certificates/  
├── node_modules/  
├── prisma/  
│ └── schema.prisma  
├── .env  
├── .env.local  
├── .eslintrc.json  
├── .gitignore  
├── auth.config.ts  
├── auth.ts  
├── components.json  
├── middleware.ts  
├── next-auth.d.ts  
├── next-env.d.ts  
├── next.config.mjs  
├── package-lock.json  
├── package.json  
├── postcss.config.mjs  
├── README.md  
├── routes.ts  
├── tailwind.config.ts  
└── tsconfig.json

## To try it yourself

```
    git clone https://github.com/BinayaShrestha556/e-commerce-cms.git
    cd e-commerce-cms
    npm i
    npm run dev

```

## Live Demo

```
    https://storecms.vercel.app

```

## Apis

You can use APIs from the api section of the site. Integrate the api in your fronted and enjoy the magic of cms.
