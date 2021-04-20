import { Application, Router } from "oak";
import { ObsidianRouter, gql } from "obsidian";

const PORT = 8080;

const app = new Application();

const types = (gql as any)`
  type Query{
    hello:String
  }
`;

const resolvers = {
  Query: {
    hello(parent: any, args: any, context: any, info: any) {
      return `Hello ${args.name}`;
    },
  },
  Mutation: {},
};

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
});

const router = new Router();
router.get("/", handlePage);

function handlePage(ctx: any) {
  ctx.response.body = "Hello!";
}
app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

await app.listen({ port: PORT });
