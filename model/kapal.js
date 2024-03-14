const connection = require("../config/database");

class ModelAlatTangkap {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT alat_tangkap.*, kapal.nama_kapal 
         FROM alat_tangkap 
         LEFT JOIN kapal ON alat_tangkap.id_kapal = kapal.id_kapal 
         ORDER BY alat_tangkap.id_alat_tangkap DESC`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async store(data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO alat_tangkap SET ?",
        data,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM alat_tangkap WHERE id_alat_tangkap = ?",
        id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = ModelAlatTangkap;
