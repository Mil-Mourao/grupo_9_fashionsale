body ('productimage').custom((value, { req })=>{

    let file = req.file;
    let extensiones = ['.jpg', '.png', '.gif', '.jpeg'];
      
    if (!file) {
        throw new Error('Tenés que subir una imagen.');
    } else {
        let fileExtension = path.extname(file.originalname)
        if (!extensiones.includes(fileExtension)) {
          throw new Error(
            `Las extensiones permitidas son: ${extensiones.join(',')}`,
          )
        }
      }
      return true
    })