const tagsModel = require("../models/tags.model")

async function run() {
   const tags = [
      {
         tag: "webdev",
         color: "#562765"
      },
      {
         tag: "javascript",
         color: "#f7df1e"
      },
      {
         tag: "react",
         color: "#f7df1e"
      },
      {
         tag: "programming",
         color: "#890606"
      },
      {
         tag: "beginners",
         color: "#008335"
      },
      {
         tag: "development",
         color: "#3b49df"
      },
      {
         tag: "docker",
         color: "#1D63ED"
      },
      {
         tag: "node",
         color: "#3d8836"
      },
      {
         tag: "express",
         color: "#3b49df"
      },
      {
         tag: "showdev",
         color: "#091b47"
      },
      {
         tag: "startup",
         color: "#E6FFFB"
      },
      {
         tag: "community",
         color: "#f79600"
      },
      {
         tag: "product",
         color: "#3b49df"
      },
      {
         tag: "csharp",
         color: "#07CD00"
      },
      {
         tag: "git",
         color: "#F54D27"
      },
      {
         tag: "github",
         color: "#000000"
      }
   ]
   
   const tagPromises = tags.map(async element => {
      const tagFound = await tagsModel.findOne({ tag: element.tag });
      
      if (!tagFound) {
         await tagsModel.create(element);
         console.log("insert", element);
      }
   });
   
   await Promise.all(tagPromises);
}

module.exports = { run }
