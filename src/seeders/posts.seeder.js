const postsModel = require("../models/posts.model");
const tagsModel = require("../models/tags.model");

async function run() {
   
   const posts = [
      {
         title: "title",
         image: null,
         body: "Body",
         user: "667108242851600485280bae",
         tags: ["webdev","javascript"]
      },
      {
         title: "6 Essential Websites You'll Love As A Developers",
         image: null,
         body: "Software development keeps changing. The right tools make a big difference. These websites are essential tools for developers, offering a range of resources from coding environments and documentation tools to educational roadmaps and community support. Explore these platforms to enhance your development workflow and expand your knowledge base.",
         user: "6667bea6c351b0fb10191a0f",
         tags: ["webdev", "beginners", "development"]
      },
      {
         title: "Docker for Node.js Developers: A DevOps Guide to Efficient Deployment",
         image: null,
         body: "We're working on Docker for Node.js Developers: A DevOps Guide to Efficient Deployment. We'll explore how to master containerization with Docker and transform our Node.js application deployment. We'll learn to optimize workflows, manage dependencies, and deploy to cloud platforms, reducing errors and increasing efficiency. We'll get our application to market faster with Docker.",
         user: "667106f0b325f9880a85def1",
         tags: ["webdev", "javascript", "beginners", "programming"]
      },
      {
         title: "I’m 18, and I just launched azigy, an app to host live trivia at your events!",
         image: null,
         body: "In my freshman year of high school, I built a simple, multiplayer buzzer website with hundreds of thousands of users. That site ended up growing tremendously, and has since been used by hundreds of thousands of people.",
         user: "667108242851600485280bae",
         tags: ["showdev", "webdev", "startup", "javascript"]
      },
      {
         title: "Navigating Common Git Errors: A Guide for Developers ",
         image: null,
         body: "As developers, we often encounter various errors when using Git. One such error involves attempting to fetch all branches or create a new branch in a directory that is not a Git repository. In this article, we will explore a common scenario and provide a step-by-step guide on how to resolve it",
         user: "6667bea6c351b0fb10191a0f",
         tags: ["showdev", "webdev", "startup", "javascript"]
      }
   ]
   
   const postPromise = posts.map(async element => {
      const postFound = await postsModel.findOne({ title: element.title })

      const tagIds = await Promise.all(
         element.tags.map(async tag => {
            const tagFind = await tagsModel.findOne({ tag })
            return tagFind ? tagFind._id : null
         })
      );

      element.tags = tagIds.filter(id => id !== null)

      if (!postFound) {
         await postsModel.create(element)
         console.log("insert", element);
      }
   });
   
   await Promise.all(postPromise)
}

module.exports = { run }
