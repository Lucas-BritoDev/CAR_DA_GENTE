const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "src/components");

const files = fs.readdirSync(dir).filter(f => f.endsWith(".tsx"));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), "utf-8");
  
  // Remove Gov.br header block from child pages
  const startStr = "{/* Gov.br header */}";
  const startIndex = content.indexOf(startStr);
  if (startIndex !== -1) {
    const endStr = "      </div>\n";
    // Find the end of this block by looking for the closing div with 6 spaces indentation
    let endIndex = content.indexOf(endStr, startIndex);
    if (endIndex !== -1) {
      endIndex += endStr.length;
      content = content.substring(0, startIndex) + content.substring(endIndex);
      // clean up any leading spaces
      content = content.replace(/^[ \t]+$/gm, "");
      fs.writeFileSync(path.join(dir, file), content);
      console.log(`Updated ${file}`);
    }
  }
  
  // Remove Header Gov.br Official style from Home.tsx
  const homeStartStr = "{/* Header Gov.br Official style */}";
  const homeStartIndex = content.indexOf(homeStartStr);
  if (homeStartIndex !== -1) {
    // In Home.tsx, we want to remove just the top part of the header? No, wait. 
    // If I remove the top part, the gray bar is part of the <header>. 
    // Let us manually handle Home.tsx next.
    console.log("Home.tsx needs manual update");
  }
}

