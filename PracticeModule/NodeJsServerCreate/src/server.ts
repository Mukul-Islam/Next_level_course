import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    
    // console.log(res);
    routeHandler(req,res);
  },
);

server.listen(4000, () => {
  console.log("server is running");
});
