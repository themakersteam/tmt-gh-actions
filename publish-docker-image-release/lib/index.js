"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
            tags.forEach((tag) => __awaiter(this, void 0, void 0, function* () {
                const imageTag = `${image}:${tag}`;
                core.startGroup(`publishing: ${imageTag}`);
                const tagArgs = ["tag", baseImage, `${imageTag}`];
                console.log(`executing: docker ${tagArgs.join(" ")}`);
                let tagOutput = "";
                let tagError = "";
                yield exec_1.exec("docker", tagArgs, {
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
                yield exec_1.exec("docker", pushArgs, {
                    cwd: workingDir,
                    listeners: {
                        stdout: (data) => {
                            pushOutput += data.toString();
                        },
                        stderr: (data) => {
                            pushError += data.toString();
                        }
                    }
                });
                console.log(`stdout: ${pushOutput}`);
                console.log(`stderr: ${pushError}`);
                core.endGroup();
            }));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
