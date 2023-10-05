FROM node:18

RUN echo 'STARTING BACKEND DOCKERFILE'

# Install PNPM
RUN corepack enable
RUN corepack prepare pnpm@8.2.0 --activate

# Set the working directory
WORKDIR /home/carsly

# Copy lockfile, NVM and NPM configuration to the working directory
COPY pnpm-lock.yaml ./

# Fetch packages from lockfile (https://pnpm.io/cli/fetch#usage-scenario)
RUN pnpm fetch

# Add everything to the working directory
COPY . ./

# Install packages from virtual store
RUN pnpm install -r --offline

# Build backend
RUN pnpm --filter backend db:gen
RUN pnpm --filter backend build

RUN echo 'ENDING BACKEND DOCKERFILE'

CMD ["pnpm","--filter","backend","start:dev"]