import * as core from "@actions/core";
import { exec } from "@actions/exec";

async function run() {
  try {
    const image = core.getInput("image");
    const baseImage = core.getInput("image") || image;

    const majorVersion = core.getInput("major-version");
    const minorVersion = core.getInput("minor-version");
    const patchVersion = core.getInput("patch-version");
    const latestTag = core.getInput("latest-tag");

    const tags = [
      `${majorVersion}`,
      `${majorVersion}.${minorVersion}`,
      `${majorVersion}.${minorVersion}.${patchVersion}`
    ];

    if (latestTag) {
      tags.push("latest");
    }

    const workingDir = core.getInput("working-dir");

    tags.forEach(async tag => {
      const imageTag = `${image}:${tag}`;
      core.startGroup(`publishing: ${imageTag}`);

      const tagArgs = ["tag", baseImage, `${imageTag}`];
      console.log(`executing: docker ${tagArgs.join(" ")}`);
      let tagOutput = "";
      let tagError = "";
      await exec("docker", tagArgs, {
        cwd: workingDir,
        listeners: {}
      });
      console.log(`stdout: ${tagOutput}`);
      console.log(`stderr: ${tagError}`);

      // if (tagChild.status !== 0) {
      //   core.setFailed('Failed')
      //   return
      // }

      const pushArgs = ["push", `${imageTag}`];
      console.log(`executing: docker ${pushArgs.join(" ")}`);
      let pushOutput = "";
      let pushError = "";
      await exec("docker", pushArgs, {
        cwd: workingDir,
        listeners: {
          stdout: (data: Buffer) => {
            pushOutput += data.toString();
          },
          stderr: (data: Buffer) => {
            pushError += data.toString();
          }
        }
      });
      console.log(`stdout: ${pushOutput}`);
      console.log(`stderr: ${pushError}`);

      core.endGroup();
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
