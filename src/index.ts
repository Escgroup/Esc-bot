import { Client } from 'ecstar';
import http from "http"

const client = new Client({
  prefix: ',',
  config: {
    channel: {
      main: '522689755654258689',
      messageLog: '625989592369332236',
      readme: '638280071999913994',
      welcome: '494423151183134730',
      memberLog: '494050319508963328',
    },
    server: '443320971609374721',
    roleId: '483849517071073284',
  },
});

client.login(process.env.TOKEN);

http.createServer((_, res) => {
  res.write("online");
  res.end();
}).listen(8080);
