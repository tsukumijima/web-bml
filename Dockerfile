FROM node:16-buster AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-buster AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV production
RUN yarn run build
RUN node -e "require('./build/font').downloadFonts()"

FROM node:16-buster AS runner
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 23234

ENV HOST 0.0.0.0

CMD ["node", "build/server/index.js"]
