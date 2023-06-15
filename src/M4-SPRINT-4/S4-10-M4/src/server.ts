import app from "./app";
import startDatabase from "./database/connection";

const PORT: number = parseInt(process.env.PORT!) || 3000;

app.listen(PORT, async () => {
  await startDatabase();
  console.log(`App running on port ${PORT}`);
});
