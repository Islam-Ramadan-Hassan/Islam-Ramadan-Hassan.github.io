import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function run() {
  console.log("Removing background...");
  try {
    const url = "file://" + process.cwd() + "/src/assets/new_photo.jpg";
    const blob = await removeBackground(url);
    const buffer = Buffer.from(await blob.arrayBuffer());
    if (!fs.existsSync("./src/assets")) {
      fs.mkdirSync("./src/assets", { recursive: true });
    }
    fs.writeFileSync("./src/assets/photo-nobg.png", buffer);
    console.log("Success! Saved to /src/assets/photo-nobg.png");
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
