FROM node:lts-hydrogen

RUN echo 'STARTING WEB DOCKERFILE'

# Install PNPM
RUN corepack enable
RUN corepack prepare pnpm@8.2.0 --activate

# Set the working directory
WORKDIR /home/carsly
ARG VITE_BACKEND_URL                       
# ENV VITE_BACKEND_URL $VITE_BACKEND_URL 

# Copy lockfile, NVM and NPM configuration to the working directory
COPY pnpm-lock.yaml ./

# Fetch packages from lockfile (https://pnpm.io/cli/fetch#usage-scenario)
RUN pnpm fetch

# Add everything to the working directory
ADD . ./

# Install packages from virtual store
RUN pnpm install -r --offline

# Build backend
RUN echo $VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN pnpm --filter web build


RUN echo 'ENDING WEB DOCKERFILE'

CMD ["pnpm","--filter","web","dev"]