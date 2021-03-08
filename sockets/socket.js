const { validateJWT } = require("../helpers/jwt");
const { io } = require("../index");
const {
  userConnected,
  userDisconnected,
  saveMessage,
} = require("../controllers/socket");

io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [isValid, uid] = validateJWT(client.handshake.headers["x-token"]);

  if (!isValid) return client.disconnect();

  userConnected(uid);

  client.join(uid);

  client.on("private-message", async (payload) => {
    console.log(payload);
    await saveMessage(payload);
    io.to(payload.to).emit("private-message", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDisconnected(uid);
  });

  // client.on("mensaje", (payload) => {
  //   console.log("mensaje", payload);
  //   io.emit("mensaje", { admin: "Nuevo mensaje" });
  // });
});
