import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function run() {
  const url = "https://lh3.googleusercontent.com/d/1YvTqAc7Eqx5-tPLZovhOuhJbOdkLnQzO";
  const blob = await removeBackground(url);
  const arr = new Uint8Array(await blob.arrayBuffer());
  const buffer = Buffer.from(arr);
  fs.writeFileSync("./public/photo-nobg.png", buffer);
  console.log("Header:", buffer.slice(0, 16));
}
run();
