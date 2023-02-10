const { exec } = require("child_process");

const classpath = process.env.CLASSPATH;
const username= process.env.USERNAME;
const password= process.env.PASSWORD;

module.exports = {

    async generateAuthHeader() {
        const promise = new Promise((resolve, reject) => {
            exec(`java -cp ${classpath} TokenEncryption ${username} ${password}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error.message);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(stderr);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                const lines = stdout.split("\n");
                const tokenText = lines[3].split("=")[1].trim();
                console.log();
                resolve(tokenText);
            });
        })
        return promise;
    }
}
