FROM hayd/deno:alpine-1.9.0

WORKDIR /app

EXPOSE 8080

RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts

COPY . .

CMD [ "vr", "dev" ]