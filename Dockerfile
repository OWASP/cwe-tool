# ARG ID
# ARG PARENT_ID
# ARG INDIRECT
# ARG SEARCH
# ARG SHOW_MEMBERSHIP

FROM node:14-slim as builder


WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production

FROM node:14-slim 

RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
USER nodejs
ENTRYPOINT ["node", "bin/cwe-tool.js", "--experimental-enable-pointer-compression", "--unhandled-rejections=strict"]
