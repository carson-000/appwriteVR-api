import * as sdk from 'node-appwrite';

const { Client, TablesDB, Permission, Role } = sdk;

export default async ({ req, res, log, error }) => {
  const client = new sdk.Client()
          .setEndpoint(process.env.ENDPOINT)
          .setProject(process.env.PROJECTID)
          .setKey(process.env.APIKEY)
  const users = new sdk.Users(client);
  const body = req.body;
  const userid = body.userid;
  const username = body.username;
  const db = new sdk.TablesDB(client);

  try {
    const result = await users.get({
        userId: userid
    });
  }
  catch {
    log("User doesnt exist.");

    const result = await users.create({
        userId: userid,
        name: username
    });

    await db.createRow({
        databaseId: process.env.DATABASEID,
        tableId: 'users',
        rowId: userid,
        data: {
            currency: 250,
            username: username
        }
    });
    }

  const token = await users.createToken({userId: userid});
  await users.deleteSessions({userId:userid});

  return res.json(token.secret, 200);
};