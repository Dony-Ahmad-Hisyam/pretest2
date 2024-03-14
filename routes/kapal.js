const express = require("express");
const router = express.Router();
const ModelKapal = require("../model/kapal.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelKapal.getAll();
    res.render("kapal/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kapal");
  }
});

router.get("/create", function (req, res, next) {
  res.render("kapal/create", {
    nama_kapal: "",
    id_pemilik: "",
    id_dpi: "",
    id_alat_tangkap: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    let data = {
      nama_kapal: nama_kapal,
      id_pemilik: id_pemilik,
      id_dpi: id_dpi,
      id_alat_tangkap: id_alat_tangkap,
    };
    await ModelKapal.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kapal");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kapal");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelKapal.getById(id);
    res.render("kapal/edit", {
      id: rows[0].id_kapal,
      nama_kapal: rows[0].nama_kapal,
      id_pemilik: rows[0].id_pemilik,
      id_dpi: rows[0].id_dpi,
      id_alat_tangkap: rows[0].id_alat_tangkap,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kapal");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    let data = {
      nama_kapal: nama_kapal,
      id_pemilik: id_pemilik,
      id_dpi: id_dpi,
      id_alat_tangkap: id_alat_tangkap,
    };
    await ModelKapal.update(id, data);
    req.flash("success", "Berhasil memperbarui data");
    res.redirect("/kapal");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kapal");
  }
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await ModelKapal.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/kapal");
});

module.exports = router;
