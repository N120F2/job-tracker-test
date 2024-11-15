import mongoose from "mongoose";

export abstract class Connection {
  private static url: string;
  public static connected: boolean = false;
  static {
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT || 27017;
    const dbName = process.env.DB_NAME;
    const url = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;
    Connection.url = url;
  }
  static async connect() {
    await mongoose.connect(Connection.url);
    Connection.connected = true;
  }
  static async disconnect() {
    await mongoose.disconnect();
    Connection.connected = false;
  }
}
