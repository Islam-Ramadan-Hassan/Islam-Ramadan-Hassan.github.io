import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function run() {
  console.log("Removing background...");
  try {
    const url = "https://lh3.googleusercontent.com/d/1YvTqAc7Eqx5-tPLZovhOuhJbOdkLnQzO";
    const blob = await removeBackground(url);
    const buffer = Buffer.from(await blob.arrayBuffer());
    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }
    fs.writeFileSync("./public/photo-nobg.png", buffer);
    console.log("Success! Saved to /public/photo-nobg.png");
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
