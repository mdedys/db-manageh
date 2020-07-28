import { Client, ClientConfig } from "pg"

async function connect(config: ClientConfig): Promise<Client> {
  const client = new Client(config)
  await client.connect()
  return client
}

export default connect
