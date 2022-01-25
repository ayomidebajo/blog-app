//Todo add endpoint for updating profile
const dotenv = require("dotenv");
dotenv.config();
const pool = require("../../db/db");
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const { patch } = require("../routes/post");
const { resolve } = require("path");

const cloudSpace = new AWS.Endpoint(`${process.env.CLOUD_SPACE}`);

const s3 = new AWS.S3({
  endpoint: cloudSpace,
  accessKeyId: `${process.env.CLOUD_SPACE_ACCESS_ID}`,
  secretAccessKey: `${process.env.CLOUD_SPACE_SECRET_ACCESS_KEY}`,
  region: "us-east-1",
});

let pathName = path.normalize("client/src/assets/idea-bulb.jpeg");
let fileStream = fs.createReadStream(pathName);
console.log(path.basename(pathName), "path for it!");

let readFile = path.basename(pathName);

let dataImg = fs.readFile(
  pathName,
  { encoding: "base64" },
  function (err, data) {
    if (err) console.log(err, "Err");
  }
);

const viewProfile = async (req, res, next) => {
  try {
    let errors = [];
    let username = req.body;
    if (!username) {
      errors.push({
        message: "You don't have access, please login",
      });
    }

    if (errors.length > 0) {
      res.status(404).json({
        message: errors.message,
      });
    }
    console.log(req.params, "not alone");
    await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [req.params.id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rowCount.length > 0) {
          res.status(200).json({
            data: results.rows,
          });
        }
      }
    );
  } catch (error) {
    throw next(error);
  }
};

const editUsername = async (req, res, next) => {
  try {
    let errors = [];
    let { username, user_id } = req.body;
    if (!username) {
      errors.push({
        message: "You don't have access, please login",
      });
    }
    console.log(req.params, "not alone");
    await pool.query(
      `UPDATE profile SET user_name = $1 WHERE user_id = $2`,
      [username, user_id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rowCount.length > 0) {
          errors.push({ message: "Not found" });
          res.status(403).json(errors);
        } else {
          res.json({
            data: "Username updated successfully!",
          });
        }
      }
    );
  } catch (error) {
    throw next(error);
  }
};

const getBuffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", (err) => reject(err));
  });
};

const uploadProfilePicture = async (req, res, next) => {
  try {
    // let errors = [];
    // let { profile } = req.body;

    let responseJson = {
      message: "success!!!",
    };

    let data = await getBuffer(req);

    let params = {
      Bucket: "aycloud",
      Key: `/test/stuff`,
      Body: `${data}`,
      ACL: "private",
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log("err");
      } else {
        console.log(data, "data");
      }
      res.status(200).send(responseJson);
    });

    // await req.on("end", function () {
    //   console.log(data, "hey");

    // });
  } catch (error) {
    throw next(error);
  }
};

module.exports = { viewProfile, editUsername, uploadProfilePicture };
