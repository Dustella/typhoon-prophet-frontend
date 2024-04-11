FROM node:21-alpine

# Set npm mirror
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

COPY . /app
WORKDIR /app

RUN pnpm install
RUN pnpm build

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update
RUN apk add --no-cache caddy

CMD ["caddy", "run", "--config", "Caddyfile"]