**INOVASI ONLINE WITH NUXT.JS FRONTEND + PRISMA ORM + POSTGRESQL DATABASE**

**Clone Nuxt.Js Project**
1. git clone https://github.com/riosst100/inovasionline-nuxtjs.git / git clone git@github.com:riosst100/inovasionline-nuxtjs.git
2. cd inovasionline-nuxtjs
3. npm install

**Setup ENV and Database**
1. cp sample.env .env
2. Change Database credentials on .env
3. Update database -> npx prisma migrate dev --name init
4. Add sample data -> npx prisma db seed (optional)

**Setup PM2**
1. npm run build
2. pm2 start .output/server/index.mjs --name **inovasionline**
3. pm2 save
4. pm2 startup
