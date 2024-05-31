FROM node:22

# Set npm mirror
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm@9.1.3

COPY . /app
WORKDIR /app

RUN COREPACK_ENABLE_STRICT=0 pnpm install
RUN COREPACK_ENABLE_STRICT=0 pnpm build

RUN apt install -y apt-transport-https curl
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
RUN apt update
RUN apt install caddy

CMD ["caddy", "run", "--config", "Caddyfile"]
